import { Game, User } from '@/types';

/** 游戏控制器 */
class GameController {
  // 用户列表
  public userList: User[];
  // 游戏信息
  public game: Game;
  // 单例
  static gameController: GameController = new GameController();

  constructor() {
    this.userList = [];
    this.game = {
      players: [],
      round: 1,
      record: [],
      status: 'ready',
      betCount: 0,
    };
  }

  // 重置游戏
  reset() {
    this.game = {
      players: [],
      record: [],
      round: 1,
      status: 'ready',
      betCount: 0,
    };
  }
}

export const gameController = GameController.gameController;
