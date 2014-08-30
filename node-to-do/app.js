var handler = {
	'get' : [],
	'post' : [],
	'delete': [],
	'put' :[]
};

function findHandler(method, url){
	return handler[method] ? handler[method][url] : undefined;
}

function addGetHandler(url, callback){
	addHandler(url, callback, 'get');
}

function addPostHandler(url, callback){
	addHandler(url, callback, 'post');
}

function addPutHandler(url, callback){
	addHandler(url, callback, 'put');
}

function addDeleteHandler(url, callback){
	addHandler(url, callback, 'delete');
}

function addHandler(url, callback, method){
	handler[method][url] = callback;
}

exports.get = addGetHandler;
exports.post = addPostHandler;
exports.put = addPutHandler;
exports.delete = addDeleteHandler;

exports.find = findHandler;