$(function(){
	var socket = io();

	$('#chat').focus();

	$('#chatForm').submit(function(){
		var msg = {
			'sendTime': parseDateTime(Date.now()),
			'content': $('#chat').val()
		};
		console.log(msg);
		socket.emit("chat message", msg);
		$('#chat').val('');
		return false;
	});

	socket.on('chat message', function(msg){
		$('.chatArea').append(createMsgBlock(msg));
		$(".chatArea").scrollTop($(".chatArea")[0].scrollHeight);
		$('li:even').css("background-color", "#eee");
	});

	function createMsgBlock(msg){
		var $datetime = $('<div>').text(msg.sendTime);
		var $content = $('<div>').text(msg.content);
		return $('<li>').append($datetime).append($content);
	}

	function parseDateTime(millisec){
		var datetime = new Date(millisec);
		var year = 1900 + datetime.getYear();
		var month = 1 + datetime.getMonth();
		var day = datetime.getDate();
		var hour = datetime.getHours();
		var min = datetime.getMinutes();
		var sec = datetime.getSeconds();
		return year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;
	}
});

