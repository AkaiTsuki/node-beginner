var app = require('./app');

// Business logic temporary goes here
app.get('/', function(req, res){
	console.log('Handle get request on url /');
});

app.get('/events', function(req, res){
	console.log('Handle get request on url /events');
});

app.post('/', function(req, res){
	console.log('Handle post request on url /');
});

app.put('/', function(req, res){
	console.log('Handle put request on url /');
});

app.delete('/', function(req, res){
	console.log('Handle delete request on url /');
});