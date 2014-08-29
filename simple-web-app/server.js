var http = require('http');
var url = require('url');
var colors = require('colors');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
  text: 'white'
});

function startServer(route, handler){
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;

		if(pathname != '/favicon.ico'){
			console.log(constructInfo(pathname));
			route(handler, pathname, request, response);
		}
	}
	http.createServer(onRequest).listen(3000);
	console.log("Server Started!".info);
}

function constructInfo(pathname){
	var info = "Request received:\n".info;
	info += "Path Name: ".info+pathname;
	info += "\n";
	return info;
}

exports.start = startServer;
