"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";

let socket: any;

export default function ChatPage() {
  const [realm, setRealm] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [pseudonym, setPseudonym] = useState<string | null>(null);

  useEffect(() => {
    const pseudonym = localStorage.getItem("pseudonym");
    socket = io("http://localhost:8000");
    socket.emit("setPseudonym", pseudonym); // Send pseudonym to the server

    socket.on("message", (data: string) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoinRealmRoom = () => {
    const roomData = { realm, room };
    socket.emit("joinRealmRoom", roomData); // Emitting joinRealmRoom event to server
  };

  const handleLeaveRoom = () => {
    socket.emit("leaveRealmRoom", { realm, room }); // Send both realm and room
    setMessages((prevMessages) => [...prevMessages]);
    setRoom("");
    setRealm("");
  };

  const handleSendMessage = () => {
    const roomData = { realm, room, message };
    socket.emit("messageToRealmRoom", roomData); // Sending message within specific room and realm
    setMessage("");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Chat dans le Room: {room} (Realm: {realm})
      </Typography>

      <TextField
        label="Enter realm"
        value={realm}
        onChange={(e) => setRealm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Enter room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        onClick={handleJoinRealmRoom}
        variant="contained"
        color="primary"
        disabled={!realm || !room}
      >
        Joindre Realm and Room
      </Button>
      <Button
        onClick={handleLeaveRoom}
        variant="outlined"
        color="secondary"
        disabled={!room}
      >
        Quitter Room
      </Button>

      <TextField
        label="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        onClick={handleSendMessage}
        variant="contained"
        color="primary"
        disabled={!message || !room}
      >
        Envoyer
      </Button>

      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>{msg}</ListItem>
        ))}
      </List>
    </Container>
  );
}
