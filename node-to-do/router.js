/* 
* router find the handler from app based on request method and url pathname.
*/

function handle(app, pathname, method, req, res){
	var callback = app.find(method.toLowerCase(), pathname);
	if(typeof callback === 'function'){
		callback(req, res);
	}else{
		pageNotFound(req, res);
	}
}

function pageNotFound(req, res){
	res.writeHeader(404, {'Content-Type': 'text/plain'});
	res.write("URL: "+req.url+"\n");
	res.end("404 Page Not Found!");
}

exports.handle = handle;
