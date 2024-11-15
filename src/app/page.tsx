"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
});

const Title = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "2rem",
  textAlign: "center",
  color: "#3f51b5",
});

const Subtitle = styled(Typography)({
  fontSize: "1.2rem",
  marginBottom: "1.5rem",
  textAlign: "center",
  color: "#616161",
});

const StyledTextField = styled(TextField)({
  marginBottom: "1.5rem",
  width: "100%",
  maxWidth: "400px",
});

const StyledButton = styled(Button)({
  width: "100%",
  maxWidth: "400px",
  backgroundColor: "#3f51b5",
  "&:hover": {
    backgroundColor: "#303f9f",
  },
});

export default function Home() {
  const [pseudonym, setPseudonym] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (pseudonym) {
      localStorage.setItem("pseudonym", pseudonym); // Store pseudonym locally
      router.push("/chat"); // Redirect to chat page
    }
  };

  return (
    <StyledContainer>
      <Box textAlign="center" mb={4}>
        <Title>
          Bienvenue dans{" "}
          <span style={{ color: "#ff4081" }}>Next-Nest-Chat Websockets</span>{" "}
          Chat
        </Title>
        <Subtitle>Entrer votre Pseudo pour le chat</Subtitle>
      </Box>
      <StyledTextField
        label="Pseudonym"
        variant="outlined"
        value={pseudonym}
        onChange={(e) => setPseudonym(e.target.value)}
      />
      <StyledButton
        onClick={handleSubmit}
        variant="contained"
        size="large"
        disabled={!pseudonym}
      >
        Join Chat
      </StyledButton>
    </StyledContainer>
  );
}
