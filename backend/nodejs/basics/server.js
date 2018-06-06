var http = require('http');
var http = require('mysql');

function onRequest(request, response){
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.write();
    response.end();
}
http.createServer(onRequest).listen(8000);