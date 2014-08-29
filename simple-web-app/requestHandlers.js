var jade = require('jade');
var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start(response, request){
	console.log("Request Handler: start");

	var html = jade.renderFile("./start.jade");

	response.writeHeader(200, {'Content-Type':'text/html'});
	response.write(html);
	response.end();
}

function upload(response, request){
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files){
		fs.rename(files.upload.path, "./tmp/test.png", function(error){
			if(error){
				fs.unlink("./tmp/test.png");
				fs.rename(files.upload.path, "./tmp/test.png");
			}
		});

		response.writeHeader(200, {'Content-Type':'text/html'});
		response.write("received image <br />");
		response.write("uploader: " + fields.firstname+"<br />");
		response.write("description: " + fields.text +"<br />");
		response.write("<img src='/show'>");
		response.end();
	});
}

function show(response, request){
	fs.readFile('./tmp/test.png', 'binary', function(error, file){
		if(error){
			response.writeHeader(500, {'Content-Type':'text/plain'});
			response.write(error + "\n");
			response.end();
		}else{
			response.writeHeader(200, {'Content-Type':'image/png'});
			response.write(file,'binary');
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;