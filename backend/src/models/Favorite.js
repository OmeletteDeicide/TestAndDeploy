import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pokemonId: {
    type: String,
    required: true
  }
});

export default mongoose.model('Favorite', FavoriteSchema);