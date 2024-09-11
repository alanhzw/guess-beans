<template>
  <div class="game-page">
    <div class="top">
      <VNav></VNav>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <GameRule class="show-GameRule"></GameRule>
        <UserList></UserList>
      </div>
      <GameCore class="show-GameCore"></GameCore>
      <VChat></VChat>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameCore from './GameCore.vue';
import VChat from './VChat.vue';
import VNav from './VNav.vue';
import GameRule from './GameRule.vue';
import UserList from './UserList.vue';
</script>

<style lang="scss" scoped>
.game-page {
  display: flex;
  flex-direction: column;
  gap: 0.16rem;
  padding: 0.16rem 0.32rem 0.32rem 0.32rem;
  .bottom {
    flex: 1;
    gap: 0.16rem;
    display: flex;
    .bottom-left {
      display: flex;
      flex-direction: column;
      gap: 0.16rem;
    }
  }
}
</style>
