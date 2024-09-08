<template>
  <!-- 登录页面 -->
  <VLogin v-if="!userInfoStore.isLogin"></VLogin>
  <!-- 游戏页面 -->
  <GamePage v-else></GamePage>
</template>

<script setup lang="ts">
import VLogin from './components/VLogin.vue';
import GamePage from './components/GamePage.vue';
import { useUserInfoStore } from '@/stores/user';
const userInfoStore = useUserInfoStore();
</script>
