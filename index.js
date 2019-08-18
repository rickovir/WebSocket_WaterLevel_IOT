/* db connection */
const db = require('./model.js');
var con = db.connection();
// start connection
con.connect();

/* server */
const express = require('express');
const app = express();
const socket = require('socket.io');
// notification
var notif = require('./notification.js');

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
		io.sockets.emit('monitor',data);

		var sql = "select id,sebar,status from notifikasi where id='"+ data.id +"'";

		con.query(sql, (error, results, fields)=> {
				if(error)
				{
					console.log("selecting data error, at : " + error);
				}
				// console.log(results);
				// client.emit('login_kurir_feedback', {total : results.length, jenis: results[0].jenis });
				// client.emit('login_kurir_feedback', sql);
				client.emit('status',results[0]);
				console.log(data);
				if(results[0].status != data.status)
				{
					var sebelum = parseInt(results[0].status);
					var sesudah = parseInt(data.status);
					var id = results[0].id;
					var sql = "update notifikasi set status ='"+data.status+"' where id='"+id+"'";
					con.query(sql, (error, results, fields)=> {
						if(error)
						{
							console.log("selecting data error, at : " + error);
						}
						// client.emit('monitor',{ubah:"notifikasi"});
						var message = "";
						var heading = "";
						var pemantau = "";
						if(id == '1'){
							pemantau = "Katulampa";
						}else{
							pemantau = "Manggarai";
						}
						// client.emit('status',pemantau);

						if(sebelum > sesudah){
							client.emit('status',{message:"Status siaga naik menjadi siaga "+sesudah});
							heading="Peringatan status siaga naik "+pemantau;
							message="Status siaga "+pemantau+" naik menjadi siaga "+sesudah;
						}
						else
						{
							client.emit('status',{message:"Status siaga turun menjadi siaga "+sesudah});
							heading="Informasi status siaga turun "+pemantau;
							message="Status siaga "+pemantau+" turun menjadi siaga "+sesudah;
						}
						var message = notif.message(message, heading);
						client.emit('status',message);
						
						notif.sendNotification(message);
					});
				}



			});
	});
    
});