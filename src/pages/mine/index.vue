<template>
  <view class="contact-container">
    <view class="img-container">
      <scroll-view scroll-y style="height: 100%">
        <image class="img" src="@/static/images/mine.jpg" mode="widthFix" />
      </scroll-view>
    </view>
    <CustomTab />
  </view>
</template>

<script setup lang="ts">
import CustomTab from "@/components/CustomTab/index.vue";
</script>

<style scoped lang="scss">
.contact-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
}
.img-container {
  flex: 1;
  display: flex;
  overflow: auto;
  .img {
    flex: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
