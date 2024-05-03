import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPokemonByName } from '../../app/services/pokemonApi';
import typeColors from '../../app/styles/typeColors';
import styles from '../../app/styles/PokemonDetails.module.css';

export default function PokemonDetails() {
    const router = useRouter();
    const { name } = router.query;
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        if (name) {
            getPokemonByName(name)
                .then(data => {
                setPokemon(data);
            })
            .catch(error => console.error('Erreur lors de la récupération du Pokémon:', error));
        }
    }, [name]);

    if (!pokemon) return <p>Loading...</p>;

    return (
        <div className={styles.pokemonDetails}>
            <div className={styles.hp}>HP: {pokemon.stats.find(stat => stat.name === 'hp').base_stat}</div>
            <h2 className={styles.pokemonName}>{pokemon.name}</h2>
            <div className={styles.type} style={{ backgroundColor: typeColors[pokemon.types[0]] }}>
                {pokemon.types[0]}
            </div>
            <div className={styles.statsContainer}>
                {pokemon.stats.filter(stat => stat.name !== 'hp').map((stat, index) => (
                    <div key={index} className={styles.statItem}>
                        {stat.name.replace('-', ' ')}: {stat.base_stat}
                    </div>
                ))}
            </div>
        </div>
    );
}
