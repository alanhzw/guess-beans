<template>
  <div class="login">
    <label>输入昵称</label>
    <input v-model="username" type="text" />
    <button>进入</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 昵称
const username = ref('');
</script>

<style lang="scss" scoped>
.login {
  text-align: center;
}
</style>
