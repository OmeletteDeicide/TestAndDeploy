import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import * as mongoose from "mongoose";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import { verifyPassword, hashPassword } from "../../../utils/auth";

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
        await dbConnect(); // Assurez-vous que la connexion à la base de données est établie
        let user = await User.findOne({ email: credentials.email }); // Recherche de l'utilisateur par email
    
        if (user) {
          const isValid = await verifyPassword(credentials.password, user.password); // Vérification du mot de passe
          if (isValid) {
            return user; // Retourner l'objet utilisateur en cas de succès
          } else {
            throw new Error("Invalid email or password"); // Lancer une erreur si la validation du mot de passe échoue
          }
        } else {
          // Créer un nouvel utilisateur si aucun n'est trouvé
          const hashedPassword = await hashPassword(credentials.password); // Assurez-vous d'implémenter cette fonction
          user = await User.create({ email: credentials.email, password: hashedPassword });
          return user; // Retourner le nouvel utilisateur
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
