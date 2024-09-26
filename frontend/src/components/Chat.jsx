// ChatRoom.js (React Component)
import React, { useState, useEffect, useRef } from 'react';

function ChatRoom({ roomName }) {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const socketRef = useRef(null);

    // Establish WebSocket connection
    useEffect(() => {
        const token = localStorage.getItem('access');
        const ws = new WebSocket(`ws://192.168.1.57:8000/ws/chat/${roomName}/?token=${token}`);
        // const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socketRef.current = ws;

        // Cleanup on component unmount
        return () => {
            ws.close();
        };
    }, [roomName]);

    const handleSendMessage = () => {
        const messageData = {
            message: messageInput,
        };

        socketRef.current.send(JSON.stringify(messageData));
        setMessageInput('');
    };

    return (
        <div>
            <h2>Room: {roomName}</h2>
            <div>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send Message</button>
        </div>
    );
}

export default ChatRoom;
