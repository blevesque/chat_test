var socket = io.connect('http://localhost:8080');

// ask pseudo
var pseudo = prompt('Welcome ! What is your pseudo ?');

// send to server
socket.emit('new_client', pseudo);

// new message incomin, insert it in channel
socket.on('message', function(data) {
    insertNewMessage(data.pseudo, data.message)
});

// new client, display his pseudo
socket.on('new_client', function(pseudo) {
    $('#chat-msgs').append('<p class="center"><b>' + pseudo + ' joined the channel !</b></p>');
    // insertMessage(pseudo, ' joined the channel'); 
});

// press enter after typing a message
$("#message-to-send").keyup(function(event){
    if(event.keyCode == 13){
        sendMessage();
    }
});

// send message in text input
function sendMessage(){
    var message = $('#message-to-send').val();
    socket.emit('message', message); // send message to server
    insertOwnMessage(pseudo, message); // display message in client's browser
    $('#message-to-send').val('').focus(); // clean text input and re-focus it
}

// insert his own messaage in channel
function insertOwnMessage(pseudo, message) {
    $("#chat-msgs").append("<div class='msg-div'><div class='msg-text own-msg'><span>" + message + "</span></div></div>");
}

function insertNewMessage(pseudo, message) {
    $("#chat-msgs").append("<div class='msg-div'><div class='msg-text other-msg'><span> <strong>" + pseudo + "</strong> : " + message + "</span></div></div>");
}