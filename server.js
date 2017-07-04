var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    connections = [];

app.use('/assets', express.static('assets'));

server.listen(process.env.PORT || 3000);
console.log('Server started...')


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {

    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    socket.emit('join');
    if(connections.length === 2) {
        socket.emit('start');
        connections[0].emit('start');
    }

    socket.on('changeDirection', function (data) {
        console.log(data);
        if(socket == connections[0]) {
            connections[1].emit('changeDirection', data);
        } else {
            connections[0].emit('changeDirection', data);
        }
    });

    socket.on('disconnect', function(socket) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });
});
