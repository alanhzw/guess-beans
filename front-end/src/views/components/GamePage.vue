<template>
  <div class="game-page">
    <UserList class="show-UserList"></UserList>
    <GameCore class="show-GameCore"></GameCore>
    <GameRule class="show-GameRule"></GameRule>
  </div>
</template>

<script setup lang="ts">
import GameCore from './GameCore.vue';
import GameRule from './GameRule.vue';
import UserList from './UserList.vue';
</script>

<style lang="scss" scoped>
.game-page {
  display: flex;
}
@media screen and (max-width: 768px) {
  .game-page {
    display: block;
  }
  .show-UserList {
    display: none;
  }
  .show-GameRule {
    display: none;
  }
}
</style>
