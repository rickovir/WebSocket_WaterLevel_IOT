// make connection
var socket = io.connect('http://34.87.1.138:3000');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');

// emit events or


function level(val)
{
	if(val == "3")
	{
		$('#status-ketinggian').removeClass('btn-info');
		$('#status-ketinggian').removeClass('btn-warning');
		$('#status-ketinggian').addClass('btn-danger');
		$('#status-ketinggian').text("Siaga 3");
	}
	else if(val == "2")
	{
		$('#status-ketinggian').removeClass('btn-danger');
		$('#status-ketinggian').removeClass('btn-info');
		$('#status-ketinggian').addClass('btn-warning');
		$('#status-ketinggian').text("Siaga 2");
	}
	if(val == "1")
	{
		$('#status-ketinggian').removeClass('btn-danger');
		$('#status-ketinggian').removeClass('btn-warning');
		$('#status-ketinggian').addClass('btn-info');
		$('#status-ketinggian').text("Siaga 1");
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
	level(data.status);
	$('#ukuran-ketinggian').html(data.distance + "<small class='text-muted'> cm</small>");
	console.log(data);
});

