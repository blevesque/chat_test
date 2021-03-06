// npm modules
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var ent = require('ent');
var fs = require('fs');

// Static routes 
app.use('/', express.static('../frontend'));

// Dynamic routes
// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '../frontend/chat.html');
// });

io.sockets.on('connection', function (socket, nickname) {
    // As soon as we receive a nickname, stock it in a var and send it to other users (new user joined channel)
    socket.on('new_client', function(nickname) {
        nickname = ent.encode(nickname);
        socket.nickname = nickname;
        socket.broadcast.emit('new_client', nickname);
    });

    // As soon as we receive a message, we broadcast it to every users
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {nickname: socket.nickname, message: message});
    }); 
});

// Server startup 
var port = 8080;
server.listen(port); // Localhost
console.log('Server started on port ' + port + '.');
