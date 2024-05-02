import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Importez useRouter de next/router
import { getPokemonByName } from '../../app/services/pokemonApi';

export default function PokemonDetails() {
    const router = useRouter(); // Utilisez useRouter au lieu de useParams
    const { name } = router.query; // Accédez aux paramètres de l'URL avec router.query
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        if (name) { // Ajoutez une vérification pour s'assurer que le nom est défini avant de faire la requête
            getPokemonByName(name)
                .then(data => setPokemon(data))
                .catch(error => console.error('Erreur lors de la récupération du Pokémon:', error));
        }
    }, [name]);

    return (
        <div>
            {pokemon && (
                <div>
                    <h2>{pokemon.name}</h2>
                    {pokemon.stats.map((stat, index) => (
                        <p key={index}>{stat.name}: {stat.base_stat}</p>
                    ))}
                    <p>Types: {pokemon.types.join(', ')}</p>
                </div>
            )}
        </div>
    );
}