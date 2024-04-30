import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/:name', async (req, res) => {
    const pokemonName = req.params.name;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des données de l\'API Pokémon.' });
    }
});

router.get('/all/limit=:limit/offset=:offset', async (req, res) => {
    try {
        const limit = Number(req.params.limit) || 20;
        const offset = Number(req.params.offset) || 0;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        res.json(response.data.results);
    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'API Pokémon:', error.message);
        console.error(error.stack);
        res.status(500).json({ message: 'Erreur lors de la récupération des données de l\'API Pokémon.' });
    }
});

router.get('/search/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1118');
        const pokemons = response.data.results;
        const matchingPokemons = pokemons.filter(pokemon => pokemon.name.includes(name));
        res.json(matchingPokemons);
    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'API Pokémon:', error.message);
        console.error(error.stack);
        res.status(500).json({ message: 'Erreur lors de la récupération des données de l\'API Pokémon.' });
    }
});

export default router;