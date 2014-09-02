var userlist = [];

function addNewUser(user){
	userlist.push(user);
	console.log('%j', userlist);
}

function removeUser(socketId){
	userlist.forEach(function(user, index, array){
		if(user['socketId'] == socketId){
			array.splice(index, 1);
		}
	});
	console.log('%j', userlist);
}

function getOnlineUsers(){
	return userlist;
}

exports.addUser = addNewUser;
exports.removeUser = removeUser;
exports.getOnlineUsers = getOnlineUsers;