var parse = require('url').parse;

/**
* A route object is like the following:
*
* var routes = {
*	'GET' : {
*		'/users' : findUsers,
*		'/users/:id' : findUserWithId
*	},
*	'DELETE' : {
*		'/users/:id' : deleteUser
*	}
* };
*
*/

function router(routes){
	return function(req, res, next){
		if(!routes[req.method]){
			next();
			return;
		}

		var pathFnPair = routes[req.method];
		var url = parse(req.url);
		var paths = Object.keys(pathFnPair);

		for(var i=0; i<paths.length; i++){
			var path = paths[i];
			var fn = pathFnPair[path];
			path = path.replace(/\//g, '\\/').replace(/:(\w+)/g, '([^\\/]+)');
			var re = new RegExp('^'+path+'$');
			var matches = url.pathname.match(re);
			if(matches){
				var args = [req, res].concat(matches.slice(1));
				fn.apply(null, args);
				return;
			}
		}
		next();
	};
}

module.exports = router;