import dbConnect from '../../utils/dbConnect';


export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const favorites = await Favorite.find({ userId: req.query.userId }); // find favorites by user id
        res.status(200).json({ success: true, data: favorites });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

export const addPokemonToFavorites = async (userId, pokemonId) => {
    const response = await fetch(`/api/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, pokemonId }),
    });
  
    if (!response.ok) {
      throw new Error(`Erreur lors de l'ajout du Pokémon aux favoris: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  };

export const getFavorites = async (userId) => {
    const response = await fetch(`/api/favorites/${userId}`);

    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des favoris: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};

export const removeFavorite = async (favoriteId) => {
    const response = await fetch(`/api/favorites/${favoriteId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Erreur lors de la suppression du favori: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};