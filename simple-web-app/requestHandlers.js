var jade = require('jade');
var querystring = require('querystring');

function start(response, postData){
	console.log("Request Handler: start");

	var html = jade.renderFile("./start.jade");

	response.writeHeader(200, {'Content-Type':'text/html'});
	response.write(html);
	response.end();
}

function upload(response, postData){
	console.log("Request Handler: upload");
	response.writeHeader(200, {'Content-Type':'text-plain'});
	var data = querystring.parse(postData);
	response.write(data.text);
	response.write(data.firstname);
	response.end();
}

exports.start = start;
exports.upload = upload;