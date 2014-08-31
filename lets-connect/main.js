var connect = require('connect');
var logger = require('./middleware/logger');
var router = require('./middleware/router');

var app = connect();

var routes = {
	'GET' : {
		'/users' : findUsers,
		'/users/:id' : findUser
	},
	'DELETE' : {
		'/users/:id' : deleteUser
	}
};

function findUsers(req, res){
	res.writeHeader(200, {'Content-Type':'text/plain'});
	res.end("John Jacky");
}

function findUser(req, res, id){
	res.writeHeader(200, {'Content-Type':'text/plain'});
	res.end("user "+ id);
}

function deleteUser(req, res, id){
	res.writeHeader(200, {'Content-Type':'text/plain'});
	res.end("Delete User "+ id);
}

app.use(logger(':method :url'))
	.use(router(routes))
	.listen(3000);