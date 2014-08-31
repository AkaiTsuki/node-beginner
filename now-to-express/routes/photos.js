var express = require('express');
var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var resolve = path.resolve;
var join = path.join;

var router = express.Router();

router.get('/', function(req, res) {
	Photo.find({},function(err, photos){
		if(err) return next(err);
		res.render('photo',{
			'title': 'Photo Wall',
			'photos': photos
		});
	});
});

router.get('/upload', function(req, res){
	res.render('upload', {
		title: 'Upload Photo'
	});
});

router.post('/upload', function(req, res, next){
	var form = new formidable.IncomingForm();
	form.parse(req, function(error, fields, files){
		console.log(fields);
		console.log(files);
		var name = fields.photoName;
		var currentTime = new Date().getTime();

		var path = resolve(__dirname,'../','public/photos', currentTime+'.png');
		console.log(path);

		fs.rename(files.photoImage.path, path, function(error){
			if(error){
				return next(error);
			}

			Photo.create({
				'name': name,
				'path': '/photos/'+ currentTime + '.png'
			}, function(err){
				if(err) return next(err);
				res.redirect('/photos');
			});
		});
	});
});

router.get('/:id/download', function(req, res, next){
	var id = req.params.id;
	Photo.findById(id, function(err, photo){
		if(err) return next(err);
		var dir = join(__dirname,'../','public',photo.path);
		console.log(photo.path);
		console.log(__dirname);
		console.log(dir);
		res.sendfile(dir);
	});

});

module.exports = router;