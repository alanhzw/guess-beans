import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

// 开发环境的服务端 URL
const DEV_URL = 'http://localhost:3001';

// 生产环境的服务端 URL
const PROD_URL = 'http://82.156.231.91:3001';

// 获取 socket 实例
function getSocket() {
  // undefined  意味着 URL 将从 window.location 对象计算
  if (import.meta.env.PROD) return io(PROD_URL);
  return io(DEV_URL);
}

// 定义 socket 实例
const socket: Socket = getSocket();

export default socket;
