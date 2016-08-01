var userCounter = require('./userCounter');

exports = module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.join('Lobby');
    socket.on('chat mounted', function(user) {
      // TODO: Does the server need to know the user?
      socket.emit('receive socket', socket.id)
    })
    socket.on('leave_program', function(programid) {
      console.log("socket.on programid channel : " + programid);
      socket.leave(programid)
      socket.joinedProgramId = null;
      userCounter[programid]--;
    })
    socket.on('join_program', function(programid) {
      socket.join(programid)
      console.log("socket.on join programid : " + programid);
      if (userCounter[programid]) {
        userCounter[programid]++;
      } else {
        userCounter[programid] = 1;
      }
      socket.joinedProgramId = programid;
      console.log("join and userCounter : " + userCounter[programid] );
    })
    socket.on('new message', function(msg) {
      socket.broadcast.to(msg.channelID).emit('new bc message', msg);
    });
    socket.on('new channel', function(channel) {
      socket.broadcast.emit('new channel', channel)
    });
    socket.on('typing', function (data) {
      socket.broadcast.to(data.channel).emit('typing bc', data.user);
    });
    socket.on('stop typing', function (data) {
      socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
    });
    socket.on('new private channel', function(socketID, channel) {
      socket.broadcast.to(socketID).emit('receive private channel', channel);
    });
    socket.on('disconnect', function() {
      // If socket is disconnected and socket owner is in the program chat room,
      // it decreases the numberof users(userCounter) in the room.
      if (socket.joinedProgramId) {
        userCounter[socket.joinedProgramId]--;
      }
    });
  });
}
