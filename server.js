var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [],
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

    users.push('Player ' + users.length);
    socket.user = {
        id: 1
    }
    socket.emit('joined', { numPlayer: users.length });

    socket.on('move', function (data) {
        console.log(data);
    });

    socket.on('disconnect', function(socket) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });
});
