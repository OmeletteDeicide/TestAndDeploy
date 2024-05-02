import { useEffect, useState } from 'react';
import { getPokemons } from '../app/services/pokemonApi';
import styles from '../app/styles/AllPokemons.module.css';
import Link from 'next/link';

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
                    <Link href={`/pokemon/${pokemon.name}`} key={index}> {/* Utilisez le composant Link ici */}
                        <a>
                            <div className={styles.pokemonCard}>
                                <h2>{pokemon.name}</h2>
                                {hpStat && <p>HP de base: {hpStat.base_stat}</p>}
                                <p>Types: {pokemon.types.map(type => type.type.name).join(', ')}</p>
                            </div>
                        </a>
                    </Link>
                );
            })}
        </div>
    );
}