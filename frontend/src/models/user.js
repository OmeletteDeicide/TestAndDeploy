import * as mongoose from "mongoose";

// Définir le schéma de l'utilisateur avec un champ password
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, default: null }, // Champ password pour les utilisateurs inscrits via votre formulaire
  name: { type: String, default: null },
  image: { type: String, default: null },
  googleId: { type: String, default: null }, // Champ pour stocker l'ID Google
});



const User = mongoose.models.User || mongoose.model('User', userSchema);


export default User;
