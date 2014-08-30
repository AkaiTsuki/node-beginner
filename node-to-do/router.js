

function handle(app, pathname, method, req, res){
	var callback = app.find(method.toLowerCase(), pathname);
	if(typeof callback === 'function'){
		callback(req, res);
	}else{
		pageNotFound(res);
	}
}

function pageNotFound(res){
	res.writeHeader(404, {'Content-Type': 'text/plain'});
	res.end("404 Page Not Found!");
}

exports.handle = handle;
