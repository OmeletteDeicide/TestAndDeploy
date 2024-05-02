import React from "react";
import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dbConnect from "@/utils/dbConnect";
import { verifyPassword, hashPassword } from "@/utils/auth";


const RegistrationForm = () => {
    const handleRegistration = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
    
        const result = await signIn('credentials', {
          redirect: false,  // Ne pas rediriger automatiquement
          email: email,
          password: password,
          callbackUrl: `/login` // Page de redirection après la connexion
        });
    
        if (result.error) {
          // Handle errors here, such as displaying a notification
          console.error("Registration or login failed:", result.error);
        } else {
          // Redirect on success
          if (result.url) router.push(result.url);
        }
      };
  const handleGoogleRegistration = async () => {
    // L'inscription avec Google se fait en fait par la connexion via Google
    // Après la connexion, si l'utilisateur n'existe pas dans votre base de données, vous pouvez l'enregistrer

    // Utilisation de la même fonction signIn pour l'inscription via Google
    await signIn("google");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      component="form"
      onSubmit={handleRegistration}
      noValidate
    >
      <Typography variant="h4" gutterBottom>
        Register with email
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
        autoComplete="new-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Register
      </Button>
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Or register with Google
      </Typography>
      <Button
        onClick={handleGoogleRegistration}
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Register with Google
      </Button>
    </Box>
  );
};

export default RegistrationForm;
