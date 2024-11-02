const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for 'chatMessage' events
    socket.on('chatMessage', (msg) => {
        console.log("Message received:", msg);

        // Broadcast message to all connected clients
        io.emit('chatMessage', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(9000, () => {
    console.log('Listening on *:9000');
});
