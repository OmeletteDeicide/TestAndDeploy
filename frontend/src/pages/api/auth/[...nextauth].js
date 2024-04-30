import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
        await dbConnect();
      if (account.provider === "google") {
        user.email = profile.email;
        user.name = profile.name;
        user.image = profile.picture;
        user.googleId = profile.sub; // 'sub' is the Google ID for the profile
      }

      // Vérifiez si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        // Mettez à jour l'utilisateur si nécessaire
        return true;
      } else {
        // Créez un nouvel utilisateur si non trouvé
        const newUser = await User.create(user);
        return newUser ? true : false;
      }
    },
    async session({ session, user }) {
      // Ajoutez des informations personnalisées à la session
      session.user.id = user.id;
      session.user.googleId = user.googleId;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
