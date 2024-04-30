import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
 providers: [
  GoogleProvider({
   clientId: process.env.GOOGLE_ID,
   clientSecret: process.env.GOOGLE_SECRET,
   scope: 'https://www.googleapis.com/auth/userinfo.profile', // Ajoutez le scope ici
  }),
 ],
 session: {
  strategy: 'jwt',
 },
};
export default NextAuth(authOptions);