<template>
  <view class="capsule-container">
    <view class="wrapper">
      <image src="../../static/capsule.png"></image>
      <view class="click-area" @click="handleClick"></view>
    </view>
  </view>
</template>

<script setup>
import { useNavigate } from "@/hooks/useTabbar";
import commonStore from "@/store/commonStore";
import { onMounted, computed } from "vue";
const { navigateHandler } = useNavigate();
const useCommonStore = commonStore();
const handleClick = () => {
  navigateHandler("/pages/group/index");
};
const topHeight = computed(() => {
  return useCommonStore.statusBarHeight + "px";
});
</script>

<style lang="scss" scoped>
.capsule-container {
  position: absolute;
  right: 0;
  top: v-bind(topHeight);
  z-index: 1000;

  .wrapper {
    width: 174rpx;
    height: 64rpx;
    background: #cccccc;
    border-radius: 37rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12rpx;
    margin-right: 12rpx;
    overflow: hidden;
    .click-area {
      position: absolute;
      right: 0;
      bottom: 0;
      border-radius: 0 37rpx 37rpx 0;
      height: calc(100% - 10rpx);
      width: 50%;
    }

    image {
      width: 100%;
      height: 100%;
    }

    .dot,
    .dot-2 {
      flex: 1;
    }
  }
}
</style>
