const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));


io.on('connection', (socket) => {
  console.log('Novo usuário conectado');


  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Usuário entrou na sala: ${room}`);
  });


  socket.on('leaveRoom', (room) => {
    socket.leave(room);
    console.log(`Usuário saiu da sala: ${room}`);
  });


  socket.on('chatMessage', ({ room, message }) => {
    io.to(room).emit('message', message);
  });


  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
