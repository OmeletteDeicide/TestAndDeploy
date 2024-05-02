import React from "react";
import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User"; // Assurez-vous que le chemin d'importation est correct

const RegistrationForm = () => {
  const handleRegistration = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        await dbConnect();
      // Créer un nouvel utilisateur avec Mongoose
      const newUser = new User({ email, password }); // Créez un nouvel utilisateur avec les données du formulaire

      // Enregistrer le nouvel utilisateur dans la base de données
      await newUser.save();

      console.log("User registered:", newUser);

      // Redirection vers la page de connexion
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      // Gérer les erreurs d'enregistrement, par exemple afficher un message d'erreur à l'utilisateur
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
