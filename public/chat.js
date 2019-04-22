// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM elements
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var sendButton = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
//create date object

var date = new Date().toDateString();
var dateHandle = document.getElementById('date-handle')
// Emit events
sendButton.addEventListener('click', function(){
  //make sure user does not send an empty message which is annoying and spammy
   if(message.value.length >0){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
}
  message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})



// Listen for events
socket.on('chat', function(data){
   feedback.innerHTML = '';
  output.innerHTML += '<p>'+ '<span id="date">' + date  + "  " + '</span>' + '<span id="style-handle">' + data.handle + '  :   ' + '</span>'  + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
