import type { Server, Socket } from 'socket.io';

/** 用户 */
export interface User {
  /** 唯一标识ID */
  id: string;
  /** 用户名称 */
  name: string;
}

export interface SocketOnParams {
  io: Server;
  socket: Socket;
}

export interface SocketResTemplete {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

/** 游戏记录 */
export interface GameRecord {
  /** 信息列表 */
  messages: string[];
  /** 上一轮输家所投入的豆子数量 */
  lastLoserBeans: number;
}

/** 游戏 */
export interface Game {
  /** 是否开始 */
  status: 'ready' | 'running' | 'end';
  /** 玩家列表 */
  players: Player[];
  /** 记录 */
  record: GameRecord[];
}

/** 玩家 */
export interface Player {
  /** 唯一标识ID */
  id: string;
  /** 是否开始 */
  status: 'ready' | 'running' | 'hanging';
  /** 剩余豆子数量 */
  restBeans: number;
  /** 得分 */
  score: number;
}
