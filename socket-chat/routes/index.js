var express = require('express');
var router = express.Router();
var chat = require('../services/chat');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Chat - Express with Socket.io', userlist: chat.getOnlineUsers()});
});

router.get('/userlist', function(req, res){
	res.end(JSON.stringify(chat.getOnlineUsers()));
});

module.exports = router;
