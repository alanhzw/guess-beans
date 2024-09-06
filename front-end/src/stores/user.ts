import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types';
import socket from '@/socket';

/**
 * @description: 用户信息
 */
export const useUserInfoStore = defineStore('userInfo', () => {
  // 用户信息
  const userInfo = ref<User>({
    id: null,
    name: '',
  });

  // 绑定 socket 事件
  const bindEvents = () => {
    // 用户登录
    socket.on('user:login', () => {});
    // 用户退出
    socket.on('user:logout', () => {});
  };

  return { userInfo, bindEvents };
});
