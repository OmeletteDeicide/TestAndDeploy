
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: String,
  image: String,
  googleId: String,
});

export default mongoose.models.User || mongoose.model('User', userSchema);