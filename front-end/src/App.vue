<script setup lang="ts">
import { useConnectionStore } from '@/stores/connection';
import { useUserListStore } from '@/stores/userList';
import { useUserInfoStore } from '@/stores/user';
import { useGameStore } from '@/stores/game';
import socket from '@/socket';

const connectionStore = useConnectionStore();
const userListStore = useUserListStore();
const userInfoStore = useUserInfoStore();
const gameStore = useGameStore();

// 删除任何现有监听器
socket.off();

// 绑定事件
connectionStore.bindEvents();
userListStore.bindEvents();
userInfoStore.bindEvents();
gameStore.bindEvents();

// 连接 socket
socket.connect();
</script>

<template>
  <RouterView />
</template>

<style>
html,
body,
#app,
.game-page {
  width: 100vw;
  height: 100vh;
  background-color: #1e1e2f;
  color: #ffffff;
}
</style>
