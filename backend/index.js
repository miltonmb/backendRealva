var mysql = require('mysql');
var http = require('http');

var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 500));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
	 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});



app.get('/', function(request, response) {
    response.send('Hello World!')
    console.log('entre');


   })

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
   })