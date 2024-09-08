<template>
  <div class="user-list">
    <div>人员列表</div>
    <div>
      <div v-for="user in userListStore.userList" :key="user.id!" class="user-item">
        <div class="name">{{ user.name }}</div>
        <div class="id">{{ user.id }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserListStore } from '@/stores/userList';
const userListStore = useUserListStore();
</script>

<style lang="scss" scoped>
.user-list {
  width: 400px;
  border-right: 5px solid #ccc;
  padding: 16px;
  .user-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 4px;
    background: linear-gradient(135deg, #0ea5e9, #ec5990 140%);
    margin: 8px 0;
    padding: 8px;
    .name {
      font-weight: bold;
      font-size: 16px;
    }
    .id {
      color: #ccc;
      font-size: 14px;
    }
  }
}
</style>
