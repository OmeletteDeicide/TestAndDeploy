import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.js';
import pokemonRouter from './routes/pokemon.js';
import favoritesRouter from './routes/favorites.js';

dotenv.config({ path: '../.env' });

// Créer une instance de l'application Express
const app = express();

// Ajouter le middleware CORS
app.use(cors({
  origin: 'http://localhost:3000' // Remplacez par l'URL de votre frontend
}));

// Middleware pour parser le corps des requêtes au format JSON
app.use(express.json());

// Middleware pour gérer les erreurs de validation du schéma Mongoose
app.use((err, req, res, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json({ message: err.message });
    }
    next(err);
});

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connexion à la base de données MongoDB réussie.");
})
.catch((error) => {
  console.error("Erreur de connexion à la base de données MongoDB :", error);
  process.exit(1); // Arrêter l'application en cas d'échec de la connexion à la base de données
});

// Monter les routes de l'application
app.use('/auth', authRouter); // Montage des routes d'authentification sous le préfixe /auth
app.use('/pokemon', pokemonRouter); // Montage des routes Pokémon sous le préfixe /pokemon
app.use('/favorites', favoritesRouter); // Montage des routes de favoris sous le préfixe /favorites

// Démarrer le serveur HTTP
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}.`);
});

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API Pokémon !');
});

export default app;