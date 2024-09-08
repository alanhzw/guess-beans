<template>
  <div class="game-core">
    <!-- 标题 -->
    <div class="game-title">游戏面板</div>
    <!-- 战绩 -->
    <div class="game-record">
      <div class="game-ready-tip" v-if="gameStore.game.status === 'ready'">
        <div>等待玩家加入 ~</div>
        <el-button type="primary" @click="handleJoinGame" v-if="!isjoinGame">加入游戏</el-button>
      </div>
    </div>
    <!-- 下注 -->
    <div class="game-bet">
      <div class="game-ready-tip" v-if="gameStore.game.status === 'ready'">等待玩家加入 ~</div>
      <div v-else>
        <el-input
          v-model="betBeans"
          placeholder="请输入你本回合要投入的豆子数量"
          style="width: 300px; margin-right: 16px"
        />
        <el-button type="primary" @click="handleBetBeans">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useGameStore } from '@/stores/game';
import { useUserInfoStore } from '@/stores/user';
import type { Player } from '@/types';

const gameStore = useGameStore();
const userInfoStore = useUserInfoStore();

// 投入的豆子数量
const betBeans = ref('');
// 点击投入按钮
const handleBetBeans = () => {
  console.log('投入的豆子数量', betBeans.value);
};

// 点击加入游戏按钮
const handleJoinGame = () => {
  gameStore.joinGame();
};

// 本人是否已加入游戏
const isjoinGame = computed(() => {
  return gameStore.game.players.find((player: Player) => player.id === userInfoStore.userInfo.id);
});
</script>

<style lang="scss" scoped>
.game-core {
  flex: 1;
  display: flex;
  flex-direction: column;
  .game-title {
    padding: 16px;
  }
  .game-record {
    flex: 1;
    padding: 16px;
  }
  .game-ready-tip {
    font-size: 20px;
    color: #ccc;
  }
  .game-bet {
    width: 100%;
    height: 200px;
    padding: 16px;
    border-top: 5px solid #ccc;
  }
}
</style>
