var colors = require('colors');

function route(handler, pathname, response, postData){
	if(typeof handler[pathname] === 'function'){
		return handler[pathname](response, postData);
	}else if(pathname != '/favicon.ico'){
		var error = "Could not find handler on "+ pathname;
		console.log(error.red);
		return "404 Not Found";
	}
}

exports.route = route;