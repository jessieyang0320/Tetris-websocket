var app = require('http').createServer();
var io = require('socket.io')(app)

var PORT = 3000;

// count clients
var clientCount = 0;

//  store client socket
var socketMap = {};

app.listen(PORT);

io.on('connection', function(socket){

	clientCount = clientCount + 1;
	socket.clientNum = clientCount;
	socketMap[clientCount] = socket;

	if(clientCount % 2 == 1){
		socket.emit('waiting', 'waiting for another person' )
	} else {
		socket.emit('start');
		socketMap[(clientCount - 1)].emit('start');
	}

	socket.on('disconnect', function(){

	})
})

console.log('websocket listening on port' + PORT)