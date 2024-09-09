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

/** 玩家投注数 */
export interface PlayerBeans {
  /** 玩家ID */
  id: string;
  /** 玩家投注数 */
  betBeans: number;
}

/** 游戏记录 */
export interface GameRecord {
  /** 回合数 */
  round: number;
  /** 玩家下注数 */
  playerBeans: PlayerBeans[];
  /** 本回合输家所投入的豆子数量 */
  loserBeans: number;
}

/** 游戏 */
export interface Game {
  /** 游戏状态 */
  status: 'ready' | 'running' | 'end';
  /** 玩家列表 */
  players: Player[];
  /** 记录 */
  record: GameRecord[];
  /** 当前回合数 */
  round: number;
  /** 下注人数 */
  betCount: number;
  /**获胜方 */
  winner?: Player;
  /** 输方 */
  loser?: Player;
}

/** 玩家 */
export interface Player {
  /** 唯一标识ID */
  id: string;
  /** 用户名称 */
  name: string;
  /** 玩家状态 */
  status: 'ready' | 'running' | 'hanging';
  /** 剩余豆子数量 */
  restBeans: number;
  /** 得分 */
  score: number;
}
