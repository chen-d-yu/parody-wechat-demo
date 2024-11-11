<template>
  <view class="tabbar-box" v-if="showComp" :style="customStyle">
    <view class="tabbar">
      <view
        v-for="item in tabList"
        :key="item.pagePath"
        :class="[
          currentPage === item.pagePath && 'tabbar-item-active',
          'tabbar-item',
        ]"
        @click="changeRoute(item)"
      >
        <image
          class="tabbar-item__icon"
          v-if="currentPage === item.pagePath"
          :src="item.selectedIconPath"
        />
        <image v-else class="tabbar-item__icon" :src="item.iconPath" />
        <text> {{ item.text }}</text>
      </view>
    </view>
  </view>
  <view class="tabbar-placeholder"></view>
</template>
<script setup lang="ts">
import { useTabbar, useNavigate, TabbarItem } from "@/hooks/useTabbar";

defineProps({
  customStyle: {
    type: [Object, String],
    default: "",
  },
});

const { tabList, showComp, currentPage } = useTabbar();
const { navigateHandler } = useNavigate();

const changeRoute = (item: TabbarItem) =>
  uni.$u.debounce(toJumpPath(item), 500, false);

const toJumpPath = (item: TabbarItem) => {
  console.log("item", item);

  if (item.pagePath && currentPage === item.pagePath) {
    return;
  }
  navigateHandler("/" + item.pagePath);
};
</script>
<style lang="scss" scoped>
.tabbar-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border: 1rpx solid #f0f1f5;
  background-color: #fff;
  z-index: 1000;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .tabbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 108rpx;
    width: 100%;
    padding: 0 24rpx;
    z-index: 100;

    .tabbar-item-active {
      color: #19be6b;
    }

    &-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      &__icon {
        width: 50rpx;
        height: 50rpx;
      }

      & > text {
        font-size: 22rpx;
        margin-top: 4rpx;
      }
    }
  }
}
</style>
