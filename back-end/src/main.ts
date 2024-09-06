import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { addUser, removeUser } from './user';

// 开发环境的客户端 URL
const DEV_FRONT_END_URL = 'http://localhost:5173';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  // 跨域
  cors: {
    origin: DEV_FRONT_END_URL,
  },
});

io.on('connection', (socket) => {
  console.log('✅✅✅ ~ socket 已成功连接 ~ ✅✅✅');
  socket.on('user:login', addUser({ io, socket }));
  socket.on('user:logout', removeUser({ io, socket }));
});

httpServer.listen(3000, () => {
  console.log('✅✅✅ ~ 服务器已启动, 端口: 3000 ~ ✅✅✅');
});
