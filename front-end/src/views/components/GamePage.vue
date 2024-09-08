<template>
  <div class="game-page">
    <UserList></UserList>
    <GameCore></GameCore>
    <GameRule></GameRule>
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
</style>
