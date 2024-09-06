<script setup lang="ts">
import { useConnectionStore } from '@/stores/connection';
import { usUserListStore } from '@/stores/userList';
import socket from '@/socket';

const connectionStore = useConnectionStore();
const userListStore = usUserListStore();

// 删除任何现有监听器
socket.off();

connectionStore.bindEvents();
userListStore.bindEvents();

// 连接 socket
socket.connect();
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
