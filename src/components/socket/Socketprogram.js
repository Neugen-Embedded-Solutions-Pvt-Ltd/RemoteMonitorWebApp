import React, {  useEffect } from "react";

import { io } from "socket.io-client";

// const socket = io("https://localhost:3001/");

// socket.on("connect", () => {
//   console.log("Connected");
// });

const Socketprogram = () => {
  useEffect(() => {
    const socket = io("http://localhost:3001/custom-socket-path", {
        // transports: ["websocket", "polling"],
        secure: false,
      });

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    setInterval(() => {
      const temperatureData = {
        device_id: 1,
        temperature: Math.floor(Math.random() * 100),
      };
      socket.emit("device temperature", temperatureData);
    }, 5000);
    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array to run only on mount
  return (
    <>
      <h1>Hello Socket</h1>
    </>
  );
};

export default Socketprogram;
