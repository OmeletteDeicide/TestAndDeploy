// SessionManager.js

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const SessionManager = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
  }, []);

  return (
    <>
      {session ? (
        // L'utilisateur est connecté, afficher le contenu de l'application
        children
      ) : (
        // L'utilisateur n'est pas connecté, afficher un message de connexion ou rediriger vers la page de connexion
        <p>Veuillez vous connecter pour accéder à cette page.</p>
        // Vous pouvez également utiliser useRouter de Next.js pour rediriger l'utilisateur vers la page de connexion :
        // import { useRouter } from 'next/router';
        // const router = useRouter();
        // useEffect(() => {
        //   router.push('/login');
        // }, []);
      )}
    </>
  );
};

export default SessionManager;
    