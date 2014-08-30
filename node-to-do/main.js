var server = require('./server');
var router = require('./router');
var app = require('./app');

var todo = require('./todo');

server.start(router.handle, app);