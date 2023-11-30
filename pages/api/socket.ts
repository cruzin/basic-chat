import { Server } from 'socket.io';
import { messagesRepo } from "@/db/consts";


// @ts-ignore
function SocketHandler(req, res){
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('input-change', msg => {
        const name = msg.user;
        const message = msg.message;
        const time = new Date().getTime();
        const chatId = 1; //TODO more than 1 chat is beyond the scope of this challenge, but I want to add that later
        messagesRepo.create(name,message, time, chatId);
        socket.broadcast.emit('update-input', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler