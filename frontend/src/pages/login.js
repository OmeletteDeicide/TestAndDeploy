import React from "react";
import LoginForm from "../components/LoginForm";
import Container from "@mui/material/Container";

export default function Login() {
  return (
    <Container component="main" maxWidth="xs">
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '90vh', justifyContent: "center", }}>
        <LoginForm />
      </div>
    </Container>
  );
}
