var socket = io();

socket.on('connect', function() {
  console.log('connected to server');

  socket.emit('createdMessage', {
    from: 'tomas',
    message: "here is the client's message"
  });
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

socket.emit('createMessage', {
  from: 'tomas',
  text: 'some more text'
}, function(serverData){
  console.log('got it', serverData);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  });
});
