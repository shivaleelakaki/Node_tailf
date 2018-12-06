var app = require('express')();
var fs = require("fs");
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 

app.get('/', function(req,res,next) {  
        res.sendFile(__dirname + '/index.html');
});
function fileData(){
    fs.readFile("input.txt", function (err, data) {
        if (err) throw err;
        theFile = data.toString().split("\n");
        res1 = theFile.slice(Math.max(theFile.length - 10, 0))
        res = res1.join("<br />");
        io.emit('updateInfo', res)
    });
}
io.on('connection', function(client) { 
    fileData(); 
    fs.watchFile("input.txt", (curr, prev) => {
        fileData();
    });
});
server.listen(3000, function listening() {
    console.log('Listening on %d', server.address().port);
});