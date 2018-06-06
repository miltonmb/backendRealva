var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: " 	id6064648_admin",
  password: "root123",
  database: "id6064648_realva"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});