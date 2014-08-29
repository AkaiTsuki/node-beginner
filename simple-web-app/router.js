var colors = require('colors');

function route(handler, pathname, response, request){
	if(typeof handler[pathname] === 'function'){
		return handler[pathname](response, request);
	}else if(pathname != '/favicon.ico'){
		response.writeHeader(404, {'Content-Type':'text/plain'});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;