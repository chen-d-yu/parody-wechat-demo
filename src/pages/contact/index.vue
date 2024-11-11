<template>
  <view class="contact-container">
    <view class="navbar">
      <Navbar title="微信" />
    </view>

    <view class="img-container">
      <scroll-view scroll-y style="height: 100%">
        <image
          class="img"
          src="@/static/images/concact.jpg"
          mode="widthFix"
        ></image>
      </scroll-view>
    </view>
    <CustomTab />
  </view>
</template>

<script setup lang="ts">
import CustomTab from "@/components/CustomTab/index.vue";
import Navbar from "@/components/Navbar/index.vue";
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
