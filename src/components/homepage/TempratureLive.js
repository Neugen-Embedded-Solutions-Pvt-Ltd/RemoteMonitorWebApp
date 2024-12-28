import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const TempratureLive = () => {
    // State variables for status and temperature
    const [status, setStatus] = useState('Connecting...');
    const [temperature, setTemperature] = useState('Waiting for temperature data...');

    useEffect(() => {
        // Initialize socket connection
        const socket = io('https://localhost:3001/');

        // Connection established
        socket.on('connect', () => {
            console.log('Connected to server with ID:', socket.id);
            setStatus('Connected to server!');
        });

        // Listen for temperature updates
        socket.on('temperature to client', (data) => {
            console.log('Temperature received:', data);
            setTemperature(`Temperature: ${data.temperature}°`);
        });

        // Error handling
        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            setStatus('Connection error! Check if server is running.');
        });

        socket.on('disconnect', (reason) => {
            console.log('Disconnected from server:', reason);
            setStatus('Disconnected from server');
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="p-4 bg-white v-full text-center">
            <div className="text-lg font-bold">{status}</div>
            <div className="text-xl">{temperature}</div>
        </div>
    );
};

export default TempratureLive;