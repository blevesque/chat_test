var socket = io.connect();

// ask nickname
var nickname = prompt('Welcome ! What is your nickname ?', "default");
if (nickname === "") {
    nickname = "userWithoutID";
} else if (nickname) {
    nickname = nickname;
} else {
    nickname = "userCanceledPromptHeIsABadGuy"; //If I had a real connection before this site, I should manage this error
}

// send to server
socket.emit('new_client', nickname);

// new message incomin, insert it in channel
socket.on('message', function(data) {
    insertNewMessage(data.nickname, data.message)
});

// new client, display his nickname
socket.on('new_client', function(nickname) {
    $('#chat-msgs').append('<p class="center"><b>' + nickname + ' joined the channel !</b></p>');
    // insertMessage(nickname, ' joined the channel'); 
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
    if (!message)
	return;
    socket.emit('message', message); // send message to server
    insertOwnMessage(nickname, message); // display message in client's browser
    $('#message-to-send').val('').focus(); // clean text input and re-focus it
}

// insert his own messaage in channel
function insertOwnMessage(nickname, message) {
    $("#chat-msgs").append("<div class='msg-div'><div class='msg-text own-msg'><span>" + message + "</span></div></div>");
    scrollChannelToBot();
}

function insertNewMessage(nickname, message) {
    $("#chat-msgs").append("<div class='msg-div'><div class='msg-text other-msg'><span> <strong>" + nickname + "</strong> : " + message + "</span></div></div>");
    scrollChannelToBot();
}

function scrollChannelToBot(){
    // scroll to bottom
    $("#chat-msgs").animate({ scrollTop: $("#chat-msgs")[0].scrollHeight }, "fast");
}
