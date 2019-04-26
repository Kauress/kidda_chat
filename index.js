var express = require('express');
var socket = require('socket.io')
var clients = 0;
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

  socket.emit("message", {
  greeting: "Hi there! Remember, choose your handle! "
  });
clients++;
 socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'});
 socket.emit('newclientconnect',{ description: clients + ' clients connected!'});

 socket.on('disconnect', function () {
    clients--;
    socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'});

 });



//socket.on('disconnect', function() {
	 //io.sockets.emit("left",{
    // message: " User has left"
  // })
//});
  //listen for the message sent from the client
  socket.on("chat",function(data){
    //when we receive the message we want the server to send it out to all the different clients
    io.sockets.emit("chat",data)
    //console.log(data);
  });

  // Handle typing event
  socket.on('typing', function(data){
      socket.broadcast.emit('typing', data);
});

});//main
