var http = require('http');
var colors = require('colors');
var url = require('url');

function startServer(handle, app){
	console.log("Server starting...".green);
	http.createServer(function(req, res){

		var pathname = url.parse(req.url).pathname;
		var method = req.method;
		handle(app, pathname, method, req, res);

		res.writeHeader(200, {
			'Content-Type':'text/plain'
		});
		res.end("Hello World");
	}).listen(3000);
	console.log("Sever started!".green);
}

exports.start = startServer;