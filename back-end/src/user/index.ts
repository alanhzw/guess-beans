import { Player, SocketOnParams, User } from '@/types';
import res from '../middleware/res';
import { gameController } from '../gameController';

// 添加用户
export const addUser = ({ io, socket }: SocketOnParams) => {
  return async (payload: Record<string, unknown>, callback: (...args: any[]) => void) => {
    // 接受到用户名
    const { userName } = payload;
    // 生成id, 构造用户信息
    const userInfo = {
      id: socket.id,
      name: userName as string,
    };
    // 判断用户列表是否已经存在该用户
    if (gameController.userList.some((user: User) => user.name === userName)) {
      callback(res(userInfo, false, '用户名已存在'));
      return;
    }
    // 用户列表添加当前用户
    gameController.userList.push(userInfo);
    // 把生成 id 后的用户信息返回给客户端
    callback(
      res({
        userInfo,
        game: gameController.game,
      }),
    );
    // 广播给所有人
    io.emit('userList:update', res({ userList: gameController.userList }));
  };
};

// 删除用户
export const removeUser = ({ io, socket }: SocketOnParams) => {
  return async () => {
    // 找到断开连接的用户
    const disconnectedUser = gameController.userList.find((user: User) => user.id === socket.id)!;
    // 用户列表删除断开连接的用户
    gameController.userList = gameController.userList.filter((user: User) => user.id !== socket.id);

    // 广播给所有人
    io.emit('userList:update', res({ userList: gameController.userList }));
    // 判断断开连接的人是不是在玩家列表中
    if (gameController.game.players.some((player: Player) => player.id === socket.id)) {
      // 玩家列表也删除断开连接的用户
      gameController.game.players = gameController.game.players.filter(
        (player: Player) => player.id !== socket.id,
      );
      // 判断断开连接的人是不是在游戏中
      if (gameController.game.status === 'running') {
        // 重置游戏
        gameController.reset();
      }
      // 广播给所有人有人退出了游戏
      io.emit(
        'game:update',
        res(
          { game: gameController.game },
          true,
          `游戏结束，【${disconnectedUser.name}】这个大傻逼已断开连接`,
        ),
      );
    }
  };
};
