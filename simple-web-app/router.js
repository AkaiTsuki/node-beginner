var colors = require('colors');

function route(handler, pathname, request, response){
	if(typeof handler[pathname] === 'function'){
		return handler[pathname](request, response);
	}else if(pathname != '/favicon.ico'){
		var error = "Could not find handler on "+ pathname;
		console.log(error.red);
		return "404 Not Found";
	}
}

exports.route = route;