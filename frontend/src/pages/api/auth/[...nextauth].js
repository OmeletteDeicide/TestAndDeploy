import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import * as mongoose from "mongoose";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" }
      },
      authorize: async (credentials) => {
        await dbConnect(); // Make sure database connection is established
        const user = await User.findOne({ email: credentials.email }); // Find user by email

        // Log the email of the user attempting to log in
        console.log('Login attempt:', credentials.email);

        if (user) {
            const isValid = await verifyPassword(credentials.password, user.password); // Verify password
            console.log('Password validation result for', credentials.email, ':', isValid); // Log the result of password validation

            if (isValid) {
                return user; // Return user object on success
            } else {
                throw new Error("Invalid email or password"); // Throw error if password validation fails
            }
        } else {
            throw new Error("No user found with this email"); // Throw error if no user is found
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      if (account.provider === "google") {
        user.email = profile.email;
        user.name = profile.name;
        user.image = profile.picture;
        user.googleId = profile.sub;
      }

      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        return true;
      } else {
        const newUser = await User.create(user);
        return newUser ? true : false;
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id ?? session.user.id;
        session.user.googleId = token.googleId ?? session.user.googleId;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.googleId = user.googleId;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
};

export default NextAuth(authOptions);
