import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" passHref>
          <Button color="inherit">Home</Button>
        </Link>
        {session && status === "authenticated" ? (
          <>
            <Button color="inherit" onClick={() => signOut({ callbackUrl: '/login' })}>
              Disconnect
            </Button>
            <p style={{ marginLeft: '20px', color: 'white' }}>Email: {session.user.email}</p>
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/register" passHref>
              <Button color="inherit">Register</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
