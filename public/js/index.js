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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
  // var li = $('<li></li>');
  // var a = $('<a target="_blank">My current location</a>');
  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // $('#messages').append(li);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });
  $('#messages').append(html);
});

// socket.emit('createMessage', {
//   from: 'tomas',
//   text: 'some more text'
// }, function(serverData){
//   console.log('got it', serverData);
// });

$('#message-form').on('submit', function(e) {
  e.preventDefault();

// $('#send-location').on('submit', function(e) {
//   e.
// });

var messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {

  if(!navigator.geolocation)
    return alert('Geolocation not available');

  locationButton.attr('disabled', 'disabled').text('Sending location ...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('unable to fetch location');
  });
});
