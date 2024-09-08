import { ref } from 'vue';
import { defineStore } from 'pinia';
import socket from '@/socket';

/**
 * @description: socket 连接
 */
export const useConnectionStore = defineStore('connection', () => {
  // socket 是否已连接
  const isConnected = ref(false);

  // 绑定 socket 事件
  const bindEvents = () => {
    // 监听 socket 连接事件
    socket.on('connect', () => {
      console.log('🚀🚀 ~ socket.on ~ socket:', socket);
      isConnected.value = true;
      console.log('✅✅✅ ~ socket 已成功连接 ~ ✅✅✅');
    });
    // 监听 socket 断开事件
    socket.on('disconnect', () => {
      isConnected.value = false;
      console.log('⚠️⚠️⚠️ ~ socket 已断开连接 ~ ⚠️⚠️⚠️');
    });
  };

  return { isConnected, bindEvents };
});
