import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types';
import socket from '@/socket';

/**
 * @description: 用户列表
 */
export const useUserListStore = defineStore('userList', () => {
  // 用户列表
  const userList = ref<User[]>([]);

  // 绑定 socket 事件
  const bindEvents = () => {
    // 用户列表更新
    socket.on('userList:update', ({ data }) => {
      userList.value = data.userList;
    });
  };

  return { userList, bindEvents };
});
