import mongoose from 'mongoose';

// Définir le schéma de l'utilisateur avec un champ password
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, default: null },
  name: { type: String, default: null },
  image: { type: String, default: null },
  googleId: { type: String, default: null },
}, { collection: 'users' });  // Spécifiez ici le nom de la collection

function getModel() {
  if (mongoose.models.User) {
    return mongoose.model('User');
  } else {
    return mongoose.model('User', userSchema);
  }
}

const User = getModel();

export default User;

