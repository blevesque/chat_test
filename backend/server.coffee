# npm modules
require('coffee-script');
express = require('express')
app = express()
server = require('http').createServer(app)
io = require('socket.io').listen(server)
ent = require('ent')
fs = require('fs')

# Static routes 
app.use '/', express.static('../frontend')

# Dynamic routes
# app.get('/', function (req, res) {
#   res.sendfile(__dirname + '../frontend/chat.html');
# });

io.sockets.on 'connection', (socket, nickname) ->
  # As soon as we receive a nickname, stock it in a var and send it to other users (new user joined channel)
  socket.on 'new_client', (nickname) ->
    nickname = ent.encode(nickname)
    socket.nickname = nickname
    socket.broadcast.emit 'new_client', nickname
    return
  # As soon as we receive a message, we broadcast it to every users
  socket.on 'message', (message) ->
    message = ent.encode(message)
    socket.broadcast.emit 'message',
      nickname: socket.nickname
      message: message
    return
  return

# Server startup 
port = 80
server.listen port, '0.0.0.0'
console.log 'Server started on port ' + port + '.'
