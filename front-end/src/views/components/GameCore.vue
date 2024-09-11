<template>
  <div class="game-core">
    <!-- 标题 -->
    <div class="game-title">游戏面板</div>
    <!-- 游戏状态为准备时显示 -->
    <div class="game-ready-tip" v-if="gameStore.game.status !== 'running'">
      <div class="tip-text">等待玩家加入 ~</div>
      <el-button
        type="primary"
        style="margin-top: 16px"
        @click="handleJoinGameAgain"
        v-if="!seleInfo"
        >加入游戏</el-button
      >
      <el-button
        type="primary"
        style="margin-top: 16px"
        @click="handleJoinGame"
        v-if="seleInfo && gameStore.game.status === 'end'"
        >再来一把</el-button
      >
    </div>
    <!-- 游戏面板 -->
    <div class="game-record">
      <!-- 游戏状态为运行时显示 -->
      <div v-if="gameStore.game.status === 'running'" class="game-running">
        <template v-for="(record, recordIndex) in gameStore.game.record" :key="record.round">
          <div class="record-item" v-if="recordIndex !== gameStore.game.record.length - 1">
            <div class="round">第 {{ record.round }} 回合</div>
            <div
              class="loser-beans"
              v-if="record.playerBeans[0].betBeans === record.playerBeans[1].betBeans"
            >
              本回合平局
            </div>
            <div class="loser-beans" v-else>
              上一回合输家所投入的豆子数量为：【 {{ record.loserBeans }} 】
            </div>
          </div>
        </template>
      </div>
      <!-- 游戏状态为结束时显示 -->
      <div v-if="gameStore.game.status === 'end'" class="game-end">
        <template v-for="(record, recordIndex) in gameStore.game.record" :key="record.round">
          <div class="record-item" v-if="recordIndex !== gameStore.game.record.length">
            <div class="round">第 {{ record.round }} 回合</div>
            <div class="bet-beans" v-for="(bet, betIndex) in record.playerBeans" :key="betIndex">
              【 {{ getPlayerName(bet) }} 】 投入的豆子数量为：【 {{ bet.betBeans }} 】
            </div>
          </div>
        </template>
        <div v-if="gameStore.game.winner">
          游戏结束，获胜方为：{{ gameStore.game.winner?.name }}
        </div>
        <div v-else>游戏结束，本轮游戏平局</div>
      </div>
    </div>
    <!-- 下注 只有加入游戏并且游戏状态为运行时才显示 -->
    <div class="game-bet" v-if="seleInfo && gameStore.game.status === 'running'">
      <div>
        <div>你剩余的豆子数量：{{ seleInfo.restBeans }}</div>
      </div>
      <div class="bet-wrapper" style="display: flex; gap: 16px">
        <div>本回合投入的豆子数量：</div>
        <el-input-number
          v-model="betBeans"
          :min="0"
          :max="20"
          :disabled="seleInfo.status === 'hanging'"
          placeholder="请输入你本回合要投入的豆子数量"
          style="width: 150px"
        />
        <el-button type="primary" @click="handleBetBeans" :disabled="seleInfo.status === 'hanging'">
          确定
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useGameStore } from '@/stores/game';
import { useUserInfoStore } from '@/stores/user';
import type { Player } from '@/types';
import { ElMessage } from 'element-plus';

const gameStore = useGameStore();
const userInfoStore = useUserInfoStore();

// 投入的豆子数量
const betBeans = ref(0);
// 点击投入按钮
const handleBetBeans = () => {
  if (betBeans.value === null) {
    ElMessage.warning('请输入投入的豆子数量，不要瞎填哦 ~');
    return;
  }
  if (seleInfo.value && betBeans.value > seleInfo.value.restBeans) {
    ElMessage.warning('你没有那么多豆子，不要瞎填哦 ~');
    return;
  }
  // 触发投注事件
  gameStore.bet(betBeans.value);
};

// 点击加入游戏按钮
const handleJoinGame = () => {
  gameStore.joinGame();
};

// 点击再来一把按钮
const handleJoinGameAgain = () => {
  betBeans.value = 0;
  handleJoinGame();
};

// 本人是否已加入游戏
const seleInfo = computed(() => {
  return gameStore.game.players.find((player: Player) => player.id === userInfoStore.userInfo.id);
});

// 获取玩家名字
const getPlayerName = (bet: { id: string; betBeans: number }) => {
  const player = gameStore.game.players.find((player: Player) => player.id === bet.id);
  return player?.name;
};
</script>

<style lang="scss" scoped>
.game-core {
  flex: 1;
  display: flex;
  background: #27293d;
  border: 0;
  border-radius: 0.04rem;
  justify-content: flex-start;
  gap: 0.16rem;
  padding: 16px;
  flex-direction: column;

  .game-title {
    padding: 0 0 16px 0;
    border-bottom: 1px solid #1d8cf8;
    font-weight: bold;
  }
  .tip-text {
    font-size: 0.15rem;
    color: #ffffed;
  }
  .game-record {
    flex: 1;
    position: relative;
    .game-running,
    .game-end {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: auto;
    }
    .record-item {
      padding: 16px;
      width: 100%;
      border: 1px solid #e14eca;
      color: #e14eca;
      margin: 16px 0;
      .round,
      .bet-beans {
        padding: 0.08rem 0;
      }
    }
  }
  .game-ready-tip {
    font-size: 20px;
    color: #ffffff;
  }
  .game-bet {
    width: 100%;
    height: 150px;
    padding: 16px 0;
    border-top: 1px solid #1d8cf8;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;
    align-items: flex-start;
  }
}
</style>
