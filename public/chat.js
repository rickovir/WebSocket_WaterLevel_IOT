// make connection
var socket = io.connect('http://192.168.3.4:3000');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');

// emit events


function level(val)
{
	if(val > 100)
	{
		$('#status-ketinggian').removeClass('btn-success');
		$('#status-ketinggian').addClass('btn-danger');
		$('#status-ketinggian').text("Bahaya");
	}
	else
	{
		$('#status-ketinggian').removeClass('btn-danger');
		$('#status-ketinggian').addClass('btn-success');
		$('#status-ketinggian').text("Aman");
	}
}

// btn.addEventListener("click", function(){
// 	socket.emit('chat',{
// 		message: message.value,
// 		handle:handle.value
// 	});
// 	socket.emit('monitor',{
// 		message: message.value,
// 		handle:handle.value
// 	});

// });


//listen for events
socket.on('chat', function(data){
	output.innerHTML += '<p><strong>'+data.handle+'</strong> : ' + data.message + '</p>';
});
// connecting
socket.on('connect', function(data) {
    socket.emit('show_paket_barang',null);
    // socket.emit('show_list_pengiriman');
});

socket.on('monitor', function(data){
	// output.innerHTML += '<p><strong>Tinggi</strong> : ' + data.distance + '</p>';
	level(data.distance);
	$('#ukuran-ketinggian').html(data.distance + "<small class='text-muted'> cm</small>");
	console.log(data);
});

