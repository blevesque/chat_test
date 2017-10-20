// npm modules
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var ent = require('ent');
var fs = require('fs');

// Dynamic routes
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/chat.html');
});

io.sockets.on('connection', function (socket, pseudo) {
    // As soon as we receive a pseudo, stock it in a var and send it to other users (new user joined channel)
    socket.on('new_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('new_client', pseudo);
    });

    // As soon as we receive a message, we broadcast it to every users
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    }); 
});

// Server startup 
var port = 8080;
server.listen(port); // Localhost
console.log('Server started on port ' + port + '.');