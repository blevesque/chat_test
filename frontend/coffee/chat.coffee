
socket = io.connect()

# ask nickname
nickname = prompt('Welcome ! What is your nickname ?')

# send message in text input
sendMessage = ->
  message = $('#message-to-send').val()
  if !message
    return
  socket.emit 'message', message
  # send message to server
  insertOwnMessage nickname, message
  # display message in client's browser
  $('#message-to-send').val('').focus()
  # clean text input and re-focus it
  return

# insert his own messaage in channel
insertOwnMessage = (nickname, message) ->
  $('#chat-msgs').append '<div class=\'msg-div\'><div class=\'msg-text own-msg\'><span>' + message + '</span></div></div>'
  $('#chat-msgs').animate { scrollTop: $(document).height() }, 'slow'
  return

# new message incomin, insert it in channel
insertNewMessage = (nickname, message) ->
  $('#chat-msgs').append '<div class=\'msg-div\'><div class=\'msg-text other-msg\'><span> <strong>' + nickname + '</strong> : ' + message + '</span></div></div>'
  $('#chat-msgs').animate { scrollTop: $(document).height() }, 'slow'
  return

socket.emit 'new_client', nickname

socket.on 'message', (data) ->
  insertNewMessage data.nickname, data.message
  return

# new client, display his nickname
socket.on 'new_client', (nickname) ->
  $('#chat-msgs').append '<p class="center"><b>' + nickname + ' joined the channel !</b></p>'
  # insertMessage(nickname, ' joined the channel'); 
  return

# press enter after typing a message
$('#message-to-send').keyup (event) ->
  if event.keyCode == 13
    sendMessage()
  return
