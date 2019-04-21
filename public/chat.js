// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM elements
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var sendButton = document.getElementById('send');
var output = document.getElementById('output');

// Emit events
sendButton.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  //message.value = "";
});

// Listen for events
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
