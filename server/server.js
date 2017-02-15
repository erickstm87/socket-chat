const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  socket.emit('newEmail', {
    from: 'tommy@example.com',
    text: 'this is the text of the email',
    createdAt: 123
  });

  socket.emit('newMessage', {
    from: 'someone',
    message: 'someone created a message',
    createdAt: 12312
  });

  socket.on('message', (message) => {
    console.log('the client\'s message was emitted', message);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  })
});

server.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
