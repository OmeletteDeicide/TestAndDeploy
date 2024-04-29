import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// Route de connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Vérifier si le mot de passe est correct
        if (password !== user.password) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        // Générer un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        // Envoyer le token au client
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la connexion." });
    }
});

// Route protégée nécessitant une authentification
router.get('/profile', verifyToken, async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à partir du token JWT
        const userId = req.userId;

        // Récupérer les informations de l'utilisateur à partir de la base de données
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Envoyer les informations de l'utilisateur au client
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération du profil de l'utilisateur." });
    }
});

export default router;
