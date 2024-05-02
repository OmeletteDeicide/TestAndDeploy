import axios from 'axios';

const backendUrl = 'http://localhost:8080'; // Remplacez par l'URL de votre backend

export async function getPokemonByName(name) {
    try {
        const response = await axios.get(`${backendUrl}/pokemon/${name}`);
        const data = response.data;

        // Récupérer le nom, les statistiques et le type
        const pokemonName = data.name;
        const stats = data.stats.map(stat => ({
            name: stat.stat.name,
            base_stat: stat.base_stat
        }));
        const types = data.types.map(type => type.type.name);

        return { name: pokemonName, stats, types };
    } catch (error) {
        console.error('Erreur lors de la récupération du Pokémon:', error);
    }
}

export async function getPokemonById(id) {
    try {
        const response = await axios.get(`${backendUrl}/pokemon/${id}`);
        const data = response.data;

        // Récupérer le nom, les statistiques et le type
        const pokemonName = data.name;
        const stats = data.stats.map(stat => ({
            name: stat.stat.name,
            base_stat: stat.base_stat
        }));
        const types = data.types.map(type => type.type.name);

        return { name: pokemonName, stats, types };
    } catch (error) {
        console.error('Erreur lors de la récupération du Pokémon:', error);
    }
}

export async function getPokemons(limit = 20, offset = 0) {
    try {
        const response = await axios.get(`${backendUrl}/pokemon/all/limit=${limit}/offset=${offset}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des Pokémons:', error);
    }
}

export async function searchPokemons(name) {
    try {
        const response = await axios.get(`${backendUrl}/pokemon/search/${name}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la recherche de Pokémons:', error);
    }
}