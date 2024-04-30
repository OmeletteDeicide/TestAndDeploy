import React from 'react';
import { signIn } from 'next-auth/react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LoginForm = () => {
    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        // Ici, vous pouvez appeler signIn avec des identifiants, ou adapter selon votre méthode d'auth
        await signIn('credentials', {
            redirect: false,
            email,
            password
        });
    };

    const handleGoogleSignIn = async () => {
        await signIn('google', { callbackUrl: 'URL_DE_RETOUR' });
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
