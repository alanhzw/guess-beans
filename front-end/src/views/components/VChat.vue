<template>
  <div class="chat-container">
    <div class="chat-title">聊天室</div>
    <div class="chat-content">
      <div class="chat-wrapper">
        <div class="tip-text">暂未开放 ~</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.chat-container {
  width: 5rem;
  padding: 16px;
  background: #27293d;
  border: 0;
  border-radius: 0.04rem;
  display: flex;
  flex-direction: column;
  .chat-title {
    padding: 0 0 16px 0;
    border-bottom: 1px solid #1d8cf8;
    font-weight: bold;
  }
  .chat-content {
    flex: 1;
    position: relative;
    margin: 16px 0;
    .chat-wrapper {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: auto;
    }
  }
  .tip-text {
    font-size: 0.15rem;
    color: #ffffed;
  }
}
</style>
