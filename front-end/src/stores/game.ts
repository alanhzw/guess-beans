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
    round: 0,
    betCount: 0,
  });
  // 绑定 socket 事件
  const bindEvents = () => {
    // 游戏有更新
    socket.on('game:update', ({ data, message }) => {
      game.value = data.game;
      if (message) ElMessage.success(message);
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

  // 点击下注按钮
  const bet = async (betBeans: number) => {
    const { success, message } = await socket.emitWithAck('game:bet', {
      id: userInfoStore.userInfo.id,
      betBeans,
    });
    if (success) ElMessage.warning(message);
  };

  return { game, joinGame, bindEvents, bet };
});
