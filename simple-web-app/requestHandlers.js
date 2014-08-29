var jade = require('jade');

function start(request, response){
	console.log("Request Handler: start");

	var html = jade.renderFile("./start.jade");

	response.writeHeader(200, {'Content-Type':'text/html'});
	response.write(html);
	response.end();
}

function upload(request, response){
	console.log("Request Handler: upload");
	response.writeHeader(200, {'Content-Type':'text-plain'});
	response.write("Upload called");
	response.end();
}

exports.start = start;
exports.upload = upload;