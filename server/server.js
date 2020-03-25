const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New User Connection');
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New Join',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('create Message', message);

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
        io.emit('newMessage', {
                from: message.from,
                text: message.text,
                createAt: new Date().getTime()
        })
    });
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
})
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})
