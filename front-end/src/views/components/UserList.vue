<template>
  <div class="user-list">
    <div class="list-title">人员列表</div>
    <div class="list-wrapper">
      <div class="list-content">
        <div v-for="user in userListStore.userList" :key="user.id!" class="user-item">
          <div class="info">
            <div class="name">{{ user.name }}</div>
            <div class="id">{{ user.id }}</div>
          </div>
          <div class="status">{{ getStatus(user) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserListStore } from '@/stores/userList';
import { useGameStore } from '@/stores/game';
import type { Player, User } from '@/types';
const userListStore = useUserListStore();
const gameStore = useGameStore();

// 获取用户状态
const getStatus = (user: User) => {
  const isPlayer = gameStore.game.players.find((player: Player) => player.id === user.id);
  if (isPlayer && gameStore.game.status === 'running') {
    return '游戏中';
  }
  if (isPlayer && gameStore.game.status === 'ready') {
    return '准备中';
  }
  return '';
};
</script>

<style lang="scss" scoped>
.user-list {
  flex: 1;
  width: 100%;
  border-right: 5px solid #ffffff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: #27293d;
  border: 0;
  border-radius: 0.04rem;
  .list-title {
    padding: 0 0 16px 0;
    border-bottom: 1px solid #1d8cf8;
    font-weight: bold;
  }
  .list-wrapper {
    flex: 1;
    position: relative;
    .list-content {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: auto;
    }
  }
  .user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    background: linear-gradient(135deg, #0ea5e9, #ec5990 140%);
    margin: 16px 0;
    padding: 8px;
    .info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .name {
        font-weight: bold;
        font-size: 16px;
      }
      .id {
        color: #ffffff;
        font-size: 14px;
      }
    }
  }
}
</style>
