var socket = require('socket.io');

function setup(server){
	return socket.listen(server);
}

exports.socket = setup;