import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    // Récupérer le token d'authentification depuis les en-têtes de la requête
    const token = req.headers.authorization;

    // Vérifier si le token est présent
    if (!token) {
        return res.status(401).json({ message: "Token manquant." });
    }

    try {
        // Vérifier la validité du token en le décodant avec la clé secrète
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Stocker l'ID de l'utilisateur extrait du token dans l'objet de requête pour une utilisation ultérieure
        req.userId = decoded.userId;
        
        // Passer au middleware suivant dans la chaîne de traitement des requêtes
        next();
    } catch (error) {
        // Si une erreur se produit lors de la vérification du token (par exemple, token invalide ou expiré), renvoyer une réponse d'erreur
        return res.status(401).json({ message: "Token invalide." });
    }
};

export default verifyToken;
