var mysql      = require('mysql');

module.exports = {
	connection:function(){
		return mysql.createConnection({
		  host     : '34.87.1.138',
		  user     : 'monitor',
		  password : 'monitor',
		  database : 'monitor'
		});
	}
};