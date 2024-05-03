import { useEffect, useState } from 'react';
import styles from '../styles/FavoritePokemons.module.css';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { getPokemonById } from '../app/services/pokemonApi';

export default function FavoritePokemons() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const localStorageFavorites = localStorage.getItem('favorites') 
            ? JSON.parse(localStorage.getItem('favorites')) 
            : [];
    
        Promise.all(localStorageFavorites.map(id => getPokemonById(id)))
            .then(data => setFavorites(data)) // Utilisez setFavorites, pas setPokemons
            .catch(error => console.error('Erreur lors de la récupération des Pokémons:', error));
    }, []);

    return (
        <div className={styles.container}>
            {favorites && favorites.map((pokemon, index) => {
                console.log('Rendu du Pokémon:', pokemon);
                const hpStat = pokemon.stats.find(stat => stat.name === 'hp');
                return (
                    <Link href={`/pokemon/${pokemon.name}`} key={index}>
                        <div className={styles.pokemonCard}>
                            <h2>{pokemon.name}</h2>
                            {hpStat && <p>HP de base: {hpStat.base_stat}</p>}
                            {pokemon.types && <p>Types: {pokemon.types.map(type => type.type && type.type.name).join(', ')}</p>}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}