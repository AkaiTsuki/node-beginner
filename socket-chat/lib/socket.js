var socket = require('socket.io');
var chat = require('../services/chat.js');

function setup(server){
	var io = socket.listen(server);

	// Socket IO
	io.on('connection',function(socket){
		console.log('a user connected');

		socket.on('disconnect', function(){
			console.log('user disconnect '+ socket.id);
			chat.removeUser(socket.id);
		});

		socket.on('new message', function(msg){
			io.emit('new message', msg);
		});

		socket.on('new user', function(nickname){
			chat.addUser({
				'nickname': nickname,
				'socketId': socket.id
			});
			io.emit('new user', chat.getOnlineUsers());
		});
	});

	return io;
}

exports.socket = setup;