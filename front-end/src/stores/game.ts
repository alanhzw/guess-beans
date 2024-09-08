import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Game } from '@/types';
import socket from '@/socket';
import { ElMessage } from 'element-plus';
import { useUserInfoStore } from './user';

/**
 * @description: 游戏控制器
 */
export const useGameStore = defineStore('game', () => {
  const userInfoStore = useUserInfoStore();
  const game = ref<Game>({
    players: [],
    record: [],
    status: 'ready',
  });
  // 绑定 socket 事件
  const bindEvents = () => {
    // 游戏开始事件
    socket.on('game:start', ({ data, message }) => {
      game.value = data.game;
      ElMessage.success(message);
    });
    // 有人断开连接
    socket.on('game:exit', ({ data, message }) => {
      game.value = data.game;
      ElMessage.success(message);
    });
  };

  // 点击加入游戏按钮
  const joinGame = async () => {
    const { data, success, message } = await socket.emitWithAck('game:ready', {
      id: userInfoStore.userInfo.id,
    });
    if (!success) {
      ElMessage.warning(message);
      return;
    }
    game.value = data.game;
  };
  return { game, joinGame, bindEvents };
});
