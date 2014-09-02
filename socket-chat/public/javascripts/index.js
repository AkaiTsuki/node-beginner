$(function(){
	var socket = io();

	$('#chat').focus();
	$('.chat').hide();

	$('#nicknameSetBtn').click(function(){
		var nickname = $('#nickname').val();
		if(nickname !== ''){
			socket.emit('new user', nickname);
		}
		$(this).hide();
		$("#nickname").prop('disabled', true);
		$('.chat').show();
	});

	$('#chatForm').submit(function(){
		var msg = {
			'sendTime': parseDateTime(Date.now()),
			'content': $('#chat').val(),
			'from': $('#nickname').val()
		};
		console.log(msg);
		socket.emit("new message", msg);
		$('#chat').val('');
		return false;
	});

	socket.on('new message', function(msg){
		$('.chatArea').append(createMsgBlock(msg));
		$(".chatArea").scrollTop($(".chatArea")[0].scrollHeight);
		$('.chatArea li:even').css("background-color", "#eee");
	});

	socket.on('new user', function(userlist){
		refresh(userlist);
	});

	function createMsgBlock(msg){
		var $datetime = $('<div>').text(msg.from+"   "+msg.sendTime);
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

	function refresh(userlist){
		$('#userlist').html('');
		userlist.forEach(function(u,index){
			$('#userlist').append($('<li>').text(u.nickname));
		});
	}
});

