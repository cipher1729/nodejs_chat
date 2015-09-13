var http= require('http');
var express= require('express');
var jade = require('jade');

app= express();
app.set('views',__dirname+'/views');
app.set('view engine','jade');
app.set('view options',{layout:false});
app.use(express.static(__dirname+'/public'));
app.get('/', function(req,res){
res.render('home.jade');
});

var server= http.createServer(app);
server.listen(3000);


var io= require('socket.io').listen(server);

io.sockets.on('connection', function (socket){
	socket.on('setPseudo', function(data){
		socket.pseudo= data;
	});

	socket.on('message', function(message){
					var data ={'message':message, pseudo:socket.pseudo};
					socket.broadcast.emit('message',data);
				console.log("user "+ socket.pseudo +" send this: " + message);
});

});