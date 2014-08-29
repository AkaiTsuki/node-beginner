var server = require("./server");
var router = require('./router');
var requestHandlers = require('./requestHandlers');

handlers = {
	'/' : requestHandlers.start,
	'/start' : requestHandlers.start,
	'/upload' : requestHandlers.upload
};

server.start(router.route, handlers);