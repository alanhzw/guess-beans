import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types';
import socket from '@/socket';
import { ElMessage } from 'element-plus';

/**
 * @description: 用户信息
 */
export const useUserInfoStore = defineStore('userInfo', () => {
  // 用户信息
  const userInfo = ref<User>({
    id: null,
    name: '',
  });
  // 是否登录
  const isLogin = ref(false);

  // 绑定 socket 事件
  const bindEvents = () => {};

  // 用户点击登录按钮
  const handleClickLogin = async (userName: string) => {
    // 派发用户登录
    const { data, success, message } = await socket.emitWithAck('user:login', { userName });
    if (!success) {
      ElMessage.warning(message);
      return;
    }
    isLogin.value = true;
    userInfo.value = data;
  };

  return { userInfo, isLogin, bindEvents, handleClickLogin };
});
