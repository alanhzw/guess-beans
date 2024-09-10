<template>
  <div class="login-page">
    <GameRule></GameRule>
    <div class="login">
      <el-input
        v-model="username"
        type="text"
        style="width: 200px"
        placeholder="请输入昵称"
        maxlength="20"
      />
      <el-button @click="login" type="primary">进入</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserInfoStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import GameRule from './GameRule.vue';
const userInfoStore = useUserInfoStore();

// 昵称
const username = ref('');

// 用户登录
const login = () => {
  if (!username.value) {
    ElMessage.warning('请输入昵称');
    return;
  }
  userInfoStore.handleClickLogin(username.value);
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
</style>
