var socket = io();

$('#chatForm').submit(function(){
	socket.emit("chat message", $('#chat').val());
	$('#chat').val('');
	return false;
});

socket.on('chat message', function(msg){
	$('.chatArea').append($('<li>').text(msg));
	$(".chatArea").scrollTop($(".chatArea")[0].scrollHeight);
});