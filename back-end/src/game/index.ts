import { Game, Player, SocketOnParams } from '@/types';
import { gameController } from '../gameController';
import res from '../middleware/res';

const getMessage = (type: string, key: string) => {
  switch (type) {
    case 'error':
      return `你投入了${key}个豆子`;
    case 'string':
      return `上一轮输的人投入了${key}个豆子`;
    default:
      return '';
  }
};

// 玩家准备
export const handleGameReady = ({ io, socket }: SocketOnParams) => {
  return async (payload: Record<string, unknown>, callback: (...args: any[]) => void) => {
    // 判断游戏是否已经开始
    if (gameController.game.players.length === 2) {
      return callback(res({}, false, '游戏已经开始啦 ~'));
    }
    // 获取用户 ID
    const { id } = payload;
    // 根据 ID 在用户列表中查找用户
    const readyPlayer = gameController.userList.find((user) => user.id === id)!;
    // 构建 player 对象
    const player: Player = {
      ...readyPlayer,
      restBeans: 20,
      score: 0,
      status: 'ready',
    };
    // 往游戏的玩家中添加用户
    gameController.game.players.push(player);
    // 通知客户端修改玩家状态为已准备
    callback(res({ game: gameController.game }));
    // 如果游戏玩家数量为 2，则开始游戏
    if (gameController.game.players.length === 2) {
      gameController.game.status = 'running';
      gameController.game.players.forEach((player) => {
        player.status = 'running';
      });
      // 广播游戏开始
      io.emit('game:start', res({ game: gameController.game }, true, '游戏开始'));
    }
  };
};
