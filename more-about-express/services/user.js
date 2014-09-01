var User = require('../models/User');
var bcrypt = require('bcrypt');

function createUser(username, password, confirmPassword, fn){
	if(password != confirmPassword){
		return fn(new Error("Password and confirm password is not same!"));
	}

	bcrypt.genSalt(12, function(err, salt){
		if(err) return fn(err);
		bcrypt.hash(password, salt, function(err, hash){
			if(err) fn(err);
			User.create({
				'name': username,
				'password': hash
			}, function(err){
				if(err) return fn(err);
			});
		});
	});
	fn();
}

function findUser(username, password, fn){
	User.find({'name': username}, function(err, users){
		if(err) return fn(err);

		if(users.length === 0){
			return fn(new Error("Username and password do not match!"));
		}

		users.forEach(function(user){
			bcrypt.compare(password, user.password, function(err, res){
				if(err) return fn(err);

				if(res){
					return fn(err, user);
				}else{
					return fn(new Error("Username and password do not match!"));
				}
			});
		});
		
		
	});
}

exports.createUser = createUser;
exports.findUser = findUser;