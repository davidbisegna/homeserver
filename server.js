var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();

//Internal Modules
UtilsModule = require('./includes/utils'); UtilsModule = new UtilsModule();
ConfigModule = require('./includes/config'); ConfigModule = new ConfigModule();

//Configure Express

app.set('views','./views');
app.set('view engine','pug');

app.use(UtilsModule.commonMiddleware);

app.use('/public', express.static('./public'));

app.get('/', function(req,res){
	res.redirect('/home')
})

app.get('/home', function(req,res){
	fs.readdir('./public/videos', function (err, files){
		console.log(err);
		console.log(files);
		res.render('home',{
			video_list:files,
			tab:[1,'coucou',3.25],
			pagetitle:'Accueil'
		});
	});
});
var server = http.createServer(app);
server.listen(ConfigModule.serverPort,function () {
	console.log('Server listening on server' + ConfigModule.serverPort);
});