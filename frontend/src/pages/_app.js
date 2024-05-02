import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession, SessionProvider } from 'next-auth/react';
import Navbar from '@/components/NavBar';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession(); // Récupérer la session côté client
      if (!session && !['/login', '/register'].includes(router.pathname)) {
        router.push('/login');
      }
    };

    securePage();
  }, [router]);

  return (
    <SessionProvider session={pageProps.session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
