import { useEffect, useState } from 'react';
import { getPokemons } from '../app/services/pokemonApi';
import styles from '../app/styles/AllPokemons.module.css';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function AllPokemons() {
    const [pokemons, setPokemons] = useState([]);
    const cookieFavorites = Cookies.get('favorites') ? JSON.parse(Cookies.get('favorites')) : [];
    const [favorites, setFavorites] = useState(cookieFavorites);

    useEffect(() => {
        getPokemons(1024, 0)
            .then(data => setPokemons(data))
            .catch(error => console.error('Erreur lors de la récupération des Pokémons:', error));
    }, []);

    function addToFavorites(pokemon) {
        if (!favorites.find(fav => fav.id === pokemon.id)) {
            console.log('Ajout du Pokémon aux favoris:', pokemon);
            setFavorites(prevFavorites => {
                const newFavorites = [...prevFavorites, pokemon.id]; // Ajoutez l'ID du Pokémon, pas l'objet entier
                localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Utilisez localStorage au lieu de Cookies
                console.log('Favoris enregistrés dans le localStorage:', newFavorites);
                return newFavorites;
            });
        }
    }

    return (
        <div className={styles.container}>
            {pokemons && pokemons.map((pokemon, index) => {
                const hpStat = pokemon.stats.find(stat => stat.name === 'hp');
                return (
                    <Link href={`/pokemon/${pokemon.name}`} key={index}>
                        <div className={styles.pokemonCard}>
                            <h2>{pokemon.name}</h2>
                            {hpStat && <p>HP de base: {hpStat.base_stat}</p>}
                            <p>Types: {pokemon.types.map(type => type.type.name).join(', ')}</p>
                            <button onClick={(e) => {e.preventDefault(); addToFavorites(pokemon);}}>Ajouter aux favoris</button>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}