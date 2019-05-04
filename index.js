const express = require('express');
const socket = require('socket.io')
let clients = 0;
let username;
// App setup
const app = express();
const port=process.env.PORT || 3000
const server = app.listen(port, function(){
    console.log('listening for requests on port 3000,');
});

// Static files
app.use(express.static('public'));
//app.use(express.static('public' + '/public/lib'));
//Socket setup

const io= socket(server);

io.on('connection', function(socket){
console.log(socket.connected);
console.log(socket.id);
console.log(socket.disconnected);



socket.emit("message", {
greeting: "Hi there! Remember, choose your handle!"
  });
clients++;
 socket.broadcast.emit('newClientConnect',{ description: clients + ' clients connected!'});
 socket.emit('newClientConnect',{ description: clients + ' clients connected!'});

 socket.on('disconnect', function (data) {
    clients--;
    socket.broadcast.emit('newClientConnect',{ description: clients + ' clients connected!'});
 });



  //listen for the message sent from the client
  socket.on("chat",function(data){
    //when we receive the message we want the server to send it out to all the different clients
    io.sockets.emit("chat",data)
    //console.log(data);
  });

  // Handle typing event
   socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
    socket.emit('typing', data);

 });

});//main
