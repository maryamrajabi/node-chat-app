var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
    socket.emit('createMessage', {
        from: 'maryam',
        text: 'Hey, its work'
    })
});

socket.on('disconnect', function () {
    console.log('User disconnect from server')
});

socket.on('newMessage', function (message) {
    console.log('New Message ', message)
});
