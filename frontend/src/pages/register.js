import React from "react";
import LoginForm from "../components/LoginForm";
import Container from "@mui/material/Container";
import RegistrationForm from "@/components/RegistrationForm";

export default function Register() {
  return (
    <Container component="main" maxWidth="xs">
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '90vh', justifyContent: "center", }}>
        <RegistrationForm />
      </div>
    </Container>
  );
}
