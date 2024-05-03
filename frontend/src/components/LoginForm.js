import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/router';


const LoginForm = () => {
    const [error, setError] = useState('');
    const router = useRouter();
    const { data: session } = useSession();
    useEffect(() => {
        if (session) router.push('/')
    }, [session, router]);

    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        // Appeler signIn et gérer la réponse
        const result = await signIn('credentials', {
            redirect: false, // Ne pas rediriger automatiquement
            email,
            password,
            callbackUrl: '/',
        });

        // Gérer les erreurs ou la réussite de la connexion
        if (result.error) {
            setError(result.error);
        }
    };

    const handleGoogleSignIn = async () => {
        // La redirection est gérée automatiquement par NextAuth pour Google
        await signIn('google');
    };

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
        >
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            {error && (
                <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                    {error} {/* Affichage des erreurs */}
                </Alert>
            )}
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            <Button
                onClick={handleGoogleSignIn}
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 1, mb: 2 }}
            >
                Sign in with Google
            </Button>
        </Box>
    );
};

export default LoginForm;
