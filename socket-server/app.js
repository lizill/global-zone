const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio.listen(server);

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

app.use(cors({
  origin: ['http://localhost:3000', 'https://global.pakudong.com'],
  credentials: true,
}));
const PORT = process.env.PORT || 8080;

let users = {};
let socketToRoom = {};
const maximum = process.env.MAXIMUM || 5;

io.on('connection', socket => {
    socket.on('join_room', data => {
        if (users[data.room]) {
            const length = users[data.room].length;
            if (length === maximum) {
                socket.to(socket.id).emit('room_full');
                return;
            }
            users[data.room].push({id: socket.id, userName: data.userName});
        } else {
            users[data.room] = [{id: socket.id, userName: data.userName}];
        }
        socketToRoom[socket.id] = data.room;

        socket.join(data.room);
        console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`);

        const usersInThisRoom = users[data.room].filter(user => user.id !== socket.id);

        console.log(usersInThisRoom);

        io.sockets.to(socket.id).emit('all_users', usersInThisRoom);
    });

    socket.on('offer', data => {
        //console.log(data.sdp);
        socket.to(data.offerReceiveID).emit('getOffer', {sdp: data.sdp, offerSendID: data.offerSendID, offerSendEmail: data.offerSendEmail});
    });

    socket.on('answer', data => {
        //console.log(data.sdp);
        socket.to(data.answerReceiveID).emit('getAnswer', {sdp: data.sdp, answerSendID: data.answerSendID});
    });

    socket.on('candidate', data => {
        //console.log(data.candidate);
        socket.to(data.candidateReceiveID).emit('getCandidate', {candidate: data.candidate, candidateSendID: data.candidateSendID});
    });

    socket.on('message', data => {
        const roomID = socketToRoom[socket.id];

        console.log(data);
        socket.to(roomID).emit('newmessage', {name: data.name, contents: data.contents});
    });

    socket.on('disconnect', () => {
        console.log(`[${socketToRoom[socket.id]}]: ${socket.id} exit`);
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(user => user.id !== socket.id);
            users[roomID] = room;
            if (room.length === 0) {
                delete users[roomID];
                return;
            }
        }
        socket.to(roomID).emit('user_exit', {id: socket.id});
        console.log(users);
    })
});

server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
