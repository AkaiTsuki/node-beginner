var express = require('express');
var userService = require('../services/user');

var router = express.Router();

/* GET user register page. */
router.get('/register', function(req, res) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res, next){
	userService.createUser(req.body.username, req.body.password, req.body.confirmPassword, function(err){
		if(err) return next(err);
		else res.redirect('/');
	});
});

router.post('/login', function(req, res, next){
	console.log(req.body.username +" "+ req.body.password);
	userService.findUser(req.body.username, req.body.password, function(err, user){
		if(err) return next(err);

		res.render('home', {title: 'Shoutbox', username: user.name});
	});
});

module.exports = router;
