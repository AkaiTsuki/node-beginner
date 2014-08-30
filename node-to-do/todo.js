var app = require('./app');
var jade =  require('jade');
var qs = require('querystring');

var items = [{'id' : 1, 'text' : 'item1'}, {'id' : 2, 'text' : 'item2'}];

app.get('/', function(req, res){
	console.log('Handle get request on url /');
	compileAndShowIndexPage(res);
});

app.get('/items', function(req, res){
	outputJson(res, items);
});

app.post('/', function(req, res){
	var id = items.length + 1;
	var postData = '';
	req.setEncoding('utf8');
	req.on('data', function(chunk){
		postData += chunk;
	});
	req.on('end', function(){
		items.push({'id' : id, 'text': qs.parse(postData).item});
		compileAndShowIndexPage(res);
	});
});

app.put('/', function(req, res){
	console.log('Handle put request on url /');
});

app.delete('/', function(req, res){
	console.log('Handle delete request on url /');
});

function compileAndShowIndexPage(res){
	var fn = jade.compileFile('./index.jade',{'pretty': true});
	var html = fn({'items' : items});
	res.writeHeader(200, {
		'Content-Type' : 'text/html',
		'Content-Length' : Buffer.byteLength(html)
	});
	res.write(html);
	res.end();
}

function outputJson(res, obj){
	res.writeHeader(200, {'Content-Type':'application-json'});
	res.end(JSON.stringify(obj));
}