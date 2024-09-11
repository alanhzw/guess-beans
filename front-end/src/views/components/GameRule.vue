<template>
  <div class="game-rule">
    <div class="rule-title">游戏规则</div>
    <div>
      <p class="rule-item">双方玩家初始各自拥有 <span class="high-light">20</span> 个豆子</p>
      <p class="rule-item">每一回合开始时，可投入任意数量的豆子，也可不投</p>
      <p class="rule-item">等待双方都投入后，投入豆子数量多的一方胜出</p>
      <p class="rule-item">当回合结束后，公开输的一方所投入的豆子数量，赢的一方不公开</p>
      <p class="rule-item">胜利条件：率先赢下两个回合的为本局游戏的赢家</p>
      <p class="rule-item">如出现平局，不计输赢，不返还豆子，游戏继续</p>
    </div>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.game-rule {
  width: 5.5rem;
  background: #27293d;
  border: 0;
  border-radius: 0.04rem;
  padding: 16px;
  .rule-title {
    padding: 0 0 16px 0;
    border-bottom: 1px solid #1d8cf8;
    font-weight: bold;
  }
  .rule-item {
    &::before {
      content: '';
      display: inline-block;
      margin-right: 8px;
      background-color: #00f2c3;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      vertical-align: middle;
    }
  }
  .high-light {
    color: #00f2c3;
    font-weight: bold;
  }
}
</style>
