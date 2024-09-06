import type { Server, Socket } from 'socket.io';

export interface User {
  id: number;
  name: string;
}

export interface SocketOnParams {
  io: Server;
  socket: Socket;
}
