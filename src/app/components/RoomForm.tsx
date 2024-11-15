"use client";

import { TextField, Button } from "@mui/material";
import { useState } from "react";

type RoomFormProps = {
  onJoin: (room: string) => void;
};

export default function RoomForm({ onJoin }: RoomFormProps) {
  const [room, setRoom] = useState("");

  const handleSubmit = () => {
    onJoin(room);
  };

  return (
    <div>
      <TextField
        label="Enter Room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <Button onClick={handleSubmit}>Join</Button>
    </div>
  );
}
