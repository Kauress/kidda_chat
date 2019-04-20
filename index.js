var express = require('express');
var socket = require('socket.io')
// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));
//app.use(express.static('public' + '/public/lib'));
//Socket setup

var io= socket(server);
io.on('connection', function(socket){
  console.log('made socket connection now', socket.id);
  //listen for the message sent from the client
  socket.on("chat",function(data){
    //when we receive the message we want the server to send it out to all the different clients
    io.sockets.emit("chat",data)
    console.log(data);
  });
});
