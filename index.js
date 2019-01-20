/* server */
const express = require('express');
const app = express();
const socket = require('socket.io')

app.use(express.json());


app.use(express.static('public'));

const port = process.env.PORT || 3000;

var server = app.listen(port, () => console.log(`listening on port ${port}..`));

var io = socket(server);

io.on('connection', function(client){
	console.log('made socket connection ', client.id)

	client.on('chat', function(data){
		io.sockets.emit('chat',data)
	});

	client.on('monitor', function(data){
		io.sockets.emit('monitor',data)
	});
    
});