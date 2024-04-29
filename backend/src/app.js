import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// Créer une instance de l'application Express
const app = express();

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
import authRouter from './routes/auth.js';
app.use('/auth', authRouter); // Montage des routes d'authentification sous le préfixe /auth

// Démarrer le serveur HTTP
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}.`);
});
