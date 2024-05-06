import express from 'express';
import Favorite from '../models/Favorite.js';

const router = express.Router();

router.post('/user', async (req, res) => {
  const favorite = new Favorite({
    userId: req.body.userId,
    pokemonId: req.body.pokemonId
  });

  try {
    const newFavorite = await favorite.save();
    res.status(201).json(newFavorite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/user/:id', getFavorite, async (req, res) => {
  try {
    await res.favorite.remove();
    res.json({ message: 'Deleted Favorite' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/user', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.query.userId });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/user/:userId', async (req, res) => {
    try {
      const favorites = await Favorite.find({ userId: req.params.userId });
      res.json(favorites);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

async function getFavorite(req, res, next) {
  let favorite;

  try {
    favorite = await Favorite.findById(req.params.id);
    if (favorite == null) {
      return res.status(404).json({ message: 'Cannot find favorite' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.favorite = favorite;
  next();
}

export default router;