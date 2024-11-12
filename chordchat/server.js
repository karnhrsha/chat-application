const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const bodyparser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./app/routes/userRoutes');  // Import user routes
const feedbackRoute = require('./app/routes/feedbackRoute');
const courseRoutes = require('./app/routes/courseRoutes');

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());
app.use(bodyparser.json());

// Use the user routes
app.use('/api', userRoutes);
//feedback routes
app.use('/api', feedbackRoute);
app.use('/api', courseRoutes); 

//Content-type : application/json

app.use(bodyparser.urlencoded({extended:true}));


require('./app/routes/customer.routes')(app);


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = '<i class="fa fa-comments"></i> ChordChat Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChordChat!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

app.listen(8080,()=>{
  console.log('Server is running on port 8080');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
