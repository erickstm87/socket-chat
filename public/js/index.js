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

socket.on('newLocationMessage', function(message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

socket.emit('createMessage', {
  from: 'tomas',
  text: 'some more text'
}, function(serverData){
  console.log('got it', serverData);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

// $('#send-location').on('submit', function(e) {
//   e.
// });

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {

  if(!navigator.geolocation)
    return alert('Geolocation not available');

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('unable to fetch location');
  })
});
