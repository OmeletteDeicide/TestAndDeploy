import { useEffect, useState } from 'react';
import { getPokemons } from '../app/services/pokemonApi';
import styles from '../app/styles/AllPokemons.module.css';
import Link from 'next/link';
import typeColors from '../app/styles/typeColors'; 

export default function AllPokemons() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getPokemons(1024, 0)
            .then(data => setPokemons(data))
            .catch(error => console.error('Erreur lors de la récupération des Pokémons:', error));
    }, []);

    return (
        <div className={styles.container}>
            {pokemons && pokemons.map((pokemon, index) => {
                const hpStat = pokemon.stats.find(stat => stat.name === 'hp');
                return (
                    <Link href={`/pokemon/${pokemon.name}`} key={index} legacyBehavior>
                        <a className={styles.pokemonCard}>
                            <h2>{pokemon.name}</h2>
                            {hpStat && <p>HP: {hpStat.base_stat}</p>}
                            <div className={styles.typesContainer}>
                                {pokemon.types.map((type, idx) => (
                                    <span key={idx} style={{ backgroundColor: typeColors[type.type.name], color: 'white' }} className={styles.type}>
                                        {type.type.name}
                                    </span>
                                ))}
                            </div>
                        </a>
                    </Link>
                );
            })}
        </div>
    );
}
