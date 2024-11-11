<template>
  <view class="img-container">
    <image class="img" src="@/static/images/im-chat.jpg" mode="widthFix" />
    <view class="brank-click" @click="back"></view>
  </view>
</template>

<script setup lang="ts">
const back = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.img-container {
  height: 100%;
  width: 100%;
  position: relative;

  .img {
    width: 100%;
    height: 100%;
  }

  .brank-click {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 50px;
  }
}
</style>
