var socket = io();

socket.on('connect', function() {
  console.log('connected to server');

  socket.emit('message', {
    from: 'tomas',
    message: "here is the client's message"
  });
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('newMessage',message);
})
