import { Game, User } from '@/types';

class GameController {
  public userList: User[];
  public game: Game;
  static gameController: GameController = new GameController();

  constructor() {
    this.userList = [];
    this.game = {
      players: [],
      record: [],
      status: 'ready',
    };
  }

  reset() {
    this.game = {
      players: [],
      record: [],
      status: 'ready',
    };
  }
}

export const gameController = GameController.gameController;
