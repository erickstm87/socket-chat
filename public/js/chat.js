var socket = io();

function scrollToBottom(){
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if(err){
      alert(err);
      window.location.href = '/';
    }
    else
      console.log('no error');
  });
  socket.emit('createdMessage', {
    from: 'tomas',
    message: "here is the client's message"
  });
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('updateUserList', function(users){
  console.log('Users list', users);
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user){
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
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
  scrollToBottom();
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
  scrollToBottom();
});

// socket.emit('createMessage', {
//   from: 'tomas',
//   text: 'some more text'
// }, function(serverData){
//   console.log('got it', serverData);
// });

$('#message-form').on('submit', function(e) {
  e.preventDefault();


var messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
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
