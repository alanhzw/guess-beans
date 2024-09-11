import { Game, Player, SocketOnParams } from '@/types';
import { gameController } from '../gameController';
import res from '../middleware/res';

// 玩家准备
export const handleGameReady = ({ io, socket }: SocketOnParams) => {
  return async (payload: Record<string, unknown>, callback: (...args: any[]) => void) => {
    // 判断游戏是否已经开始
    if (gameController.game.status === 'end') {
      // 重置游戏
      gameController.reset();
    }
    // 判断游戏是否已经开始
    if (gameController.game.status === 'running') {
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
      // 初始化第一回合的游戏记录
      gameController.game.record.push({
        round: gameController.game.round,
        playerBeans: [],
        loserBeans: 0,
      });
      // 广播游戏开始
      io.emit('game:update', res({ game: gameController.game }, true, '游戏开始'));
    }
    // 否则提示客户端有玩家加入了游戏
    else {
      io.emit(
        'game:update',
        res({ game: gameController.game }, true, `${readyPlayer.name} 加入了游戏`),
      );
    }
  };
};

// 玩家下注
export const handleGameBet = ({ io, socket }: SocketOnParams) => {
  return async (payload: Record<string, unknown>, callback: (...args: any[]) => void) => {
    // 获取玩家 ID，玩家投注的豆子数量
    const { id, betBeans } = payload;
    // 根据 ID 在玩家列表中查找用户
    const player = gameController.game.players.find((user) => user.id === id)!;
    // 下注完的玩家状态挂起，本回合不能再下注
    player.status = 'hanging';
    // 更新玩家剩余豆子数量
    player.restBeans -= betBeans as number;
    // 当前回合
    const currentRound = gameController.game.record[gameController.game.round - 1];
    // 更新游戏记录
    currentRound.playerBeans.push({
      id: id as string,
      betBeans: betBeans as number,
    });
    gameController.game.betCount += 1;
    // 如果下注人数为 2，则开启下一轮
    if (gameController.game.betCount === 2) {
      // 计算本回合的输赢情况
      const { winner } = determineWinnerAndLoser();
      // 给赢得人加分
      if (winner) winner.score += 1;
      // 记录本回合输的人所投入的豆子数量
      currentRound.loserBeans = currentRound.playerBeans.sort(
        (a, b) => a.betBeans - b.betBeans,
      )[0].betBeans;
      // 计算游戏是否结束
      if (gameController.game.players.some((player) => player.score === 2)) {
        gameController.game.status = 'end';
        // 获取赢家
        const finalWinner = gameController.game.players.find((player) => player.score === 2)!;
        gameController.game.winner = finalWinner;
        io.emit('game:update', res({ game: gameController.game }, true, '游戏结束'));
        return;
      }
      // 是否平局
      if (
        gameController.game.players.every((player) => player.restBeans === 0) &&
        gameController.game.players.every((player) => player.score < 2)
      ) {
        gameController.game.status = 'end';
        // 获取赢家
        gameController.game.winner = undefined;
        io.emit('game:update', res({ game: gameController.game }, true, '游戏结束'));
        return;
      }
      // 所有玩家状态重置为游戏中
      gameController.game.players.forEach((player) => {
        player.status = 'running';
      });
      // 重置下注人数
      gameController.game.betCount = 0;
      // 提升回合数
      gameController.game.round += 1;
      // 初始化下一回合的游戏记录
      gameController.game.record.push({
        round: gameController.game.round,
        playerBeans: [],
        loserBeans: 0,
      });
    }
    callback(res({}, true, '投入成功，请等待本回合结果'));
    // 广播给所有玩家
    io.emit('game:update', res({ game: gameController.game }));
  };
};

// 获取本轮游戏结果的赢家和输家
function determineWinnerAndLoser(): {
  winner: Player | undefined;
  loser: Player | undefined;
} {
  // 获取当前回合的游戏记录
  const currentRoundRecord = gameController.game.record.find(
    (record) => record.round === gameController.game.round,
  );
  // 如果当前回合没有游戏记录则直接返回
  if (!currentRoundRecord) {
    return { winner: undefined, loser: undefined };
  }
  // 如果当前回合投入分数一样的话，则平局
  if (currentRoundRecord.playerBeans[0].betBeans === currentRoundRecord.playerBeans[1].betBeans) {
    return { winner: undefined, loser: undefined };
  }
  // 比较 betBeans 来确定赢家和输家
  const sortedPlayers = currentRoundRecord.playerBeans.sort((a, b) => b.betBeans - a.betBeans);
  // 获取第一个和第二个玩家的 ID
  const winnerId = sortedPlayers[0].id;
  const loserId = sortedPlayers[1].id;
  // 找到对应的赢家和输家
  const winner = gameController.game.players.find((player) => player.id === winnerId);
  const loser = gameController.game.players.find((player) => player.id === loserId);

  return { winner, loser };
}
