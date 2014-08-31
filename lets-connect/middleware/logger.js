function setup(pattern){
	var regexp = /:(\w+)/g;
	return function logger(req, res, next){
		var str = pattern.replace(regexp, function(match, property){
			return req[property];
		});
		console.log(str);
		next();
	};
}

module.exports = setup;