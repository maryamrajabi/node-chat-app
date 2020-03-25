const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
var {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New User Connection');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the '));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New Join'));

    socket.on('createMessage', (message) => {
        console.log('create Message', message);

        io.emit('newMessage', generateMessage(message.from, message.text))
    });
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
