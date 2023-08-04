let express = require("express");
const connectDB = require("./db")
let http = require("http");
let app = express();
let cors = require("cors");
let server = http.createServer(app);
let socketio = require("socket.io");
let io = socketio.listen(server,{path:"/room/socket.io"});
const Chat = require("./model/chat");

app.use(cors());
const PORT = 3478;
connectDB();
let users = {};

let socketToRoom = {};
let chatLog = {};
const maximum = 2;

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    if (users[data.room]) {
      const length = users[data.room].length;
      if (length === maximum) {
        socket.to(socket.id).emit("room_full");
        return;
      }
      users[data.room].push({ id: socket.id });
    } else {
      users[data.room] = [{ id: socket.id }];
    }
    socketToRoom[socket.id] = data.room;

    socket.join(data.room);
    console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`);

    const usersInThisRoom = users[data.room].filter(
      (user) => user.id !== socket.id
    );

    console.log(usersInThisRoom);

    io.sockets.to(socket.id).emit("all_users", usersInThisRoom);
  });
  socket.on("message",async (sdp)=>{
    console.log("message: " + socket.id);
    // const chat = new Chat(sdp);
    // await chat.save();
    if(!(socket.id in chatLog)){
      chatLog[socket.id]=[];
    }
    chatLog[socket.id].push(sdp);
    socket.broadcast.emit("message", sdp);
  })
  socket.on("offer", (sdp) => {
    console.log("offer: " + socket.id);
    socket.broadcast.emit("getOffer", sdp);
  });

  socket.on("answer", (sdp) => {
    console.log("answer: " + socket.id);
    socket.broadcast.emit("getAnswer", sdp);
  });

  socket.on("candidate", (candidate) => {
    console.log("candidate: " + socket.id);
    socket.broadcast.emit("getCandidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log(`[${socketToRoom[socket.id]}]: ${socket.id} exit`);
    const roomID = socketToRoom[socket.id];
    chatLog[socket.id].forEach(e=>await (new Chat(e)).save());
    chatLog[socket.id]=[];
    let room = users[roomID];
    if (room) {
      room = room.filter((user) => user.id !== socket.id);
      users[roomID] = room;
      if (room.length === 0) {
        delete users[roomID];
        return;
      }
    }
    socket.broadcast.to(room).emit("user_exit", { id: socket.id });
    console.log(users);
  });
});

server.listen(`${PORT}`, () => {
  console.log(`server running on ${PORT}`);
});

app.get('/room/check/:roomId', (req, res) => {
  //DO : roomId에 있는 사람 수 반환
  if(req.params.roomId in users){//사람이 있는 경우
    res.json(users[req.params.roomId].length);
  }else{//사람이 없는 경우
    res.json(0);
  }
})

app.get('/room/chat/:roomId', async (req,res) =>{
  //DO : 채팅내역 반환
  try{
    const chats = await Chat.find({"helpId":req.params.roomId});
    return res.json(chats);
  }catch(e){
    return res.status(500).send({error:e.message});
  }
});