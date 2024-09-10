import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { addUser, removeUser } from './user';
import { handleGameReady, handleGameBet } from './game/index';

// 开发环境的客户端 URL
const DEV_FRONT_END_URL = 'http://localhost:5173';
// 生产环境的客户端 URL
const PROD_FRONT_END_URL = 'http://82.156.231.91:5473';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  // 跨域
  cors: {
    origin: DEV_FRONT_END_URL,
  },
});

io.on('connection', (socket) => {
  console.log('✅✅✅ ~ socket 已成功连接 ~ ✅✅✅', socket.id);
  // 监听用户登录
  socket.on('user:login', addUser({ io, socket }));
  // 监听用户主动退出登录
  socket.on('user:logout', removeUser({ io, socket }));
  // 监听用户断开连接
  socket.on('disconnect', removeUser({ io, socket }));
  // 监听游戏准备
  socket.on('game:ready', handleGameReady({ io, socket }));
  // 监听用户下注
  socket.on('game:bet', handleGameBet({ io, socket }));
});

httpServer.listen(3001, () => {
  console.log('✅✅✅ ~ 服务器已启动, 端口: 3001 ~ ✅✅✅');
});
