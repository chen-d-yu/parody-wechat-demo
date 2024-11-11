<template>
  <view class="contact-container">
    <view class="navbar">
      <Navbar title="发现" />
    </view>

    <view class="container">
      <scroll-view scroll-y style="height: 100%">
        <view class="item-container">
          <view class="item" v-for="(item, index) in list">
            <view
              class="sub-item"
              v-for="(subItem, subIndex) in item"
              @click="index === list.length - 1 && subIndex === item.length - 1 && toMiniProgram()"
            >
              <view class="sub-item-icon">
                <image :src="subItem.icon"></image>
              </view>
              <view class="sub-item-title">{{ subItem.title }}</view>
              <view class="sub-item-arrow"><up-icon name="arrow-right" color="#181818" size="24" /></view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <CustomTab />
  </view>
</template>

<script setup lang="ts">
import CustomTab from "@/components/CustomTab/index.vue";
import Navbar from "@/components/Navbar/index.vue";
import find1 from "@/static/find-icons/01.png";
import find2 from "@/static/find-icons/02.png";
import find3 from "@/static/find-icons/03.png";
import find4 from "@/static/find-icons/04.png";
import find5 from "@/static/find-icons/05.png";
import find6 from "@/static/find-icons/06.png";
import find7 from "@/static/find-icons/07.png";
import find8 from "@/static/find-icons/08.png";
import find9 from "@/static/find-icons/09.png";
import find10 from "@/static/find-icons/10.png";
import find11 from "@/static/find-icons/11.png";

const imgList = [find1, find2, find3, find4, find5, find6, find7, find8, find9, find10, find11];

const toMiniProgram = () => {
  uni.navigateTo({
    url: "/pages/wx/miniProgram/index",
    fail: (err) => {
      console.log(err);
    },
  });
};
let i = 0;
const list = [
  ["朋友圈"],
  ["视频号", "直播"],
  ["扫一扫", "摇一摇"],
  ["看一看", "搜一搜"],
  ["附近"],
  ["购物", "游戏"],
  ["小程序"],
].reduce((prev, item) => {
  prev.push(
    item.map((it) => {
      return {
        title: it,
        icon: imgList[i++],
      };
    })
  );
  return prev;
}, [] as any[]);

console.log("list", list);
</script>

<style scoped lang="scss">
.contact-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
}
.container {
  flex: 1;

  .item-container {
    display: flex;
    flex-direction: column;

    .item {
      display: flex;
      flex-direction: column;

      margin-bottom: 16rpx;

      .sub-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20rpx 20rpx;
        background: #fff;
        border-bottom: 1rpx solid #f1f1f1;

        &-icon {
          width: 58rpx;
          height: 60rpx;
          display: flex;
          align-items: center;
          justify-content: center;

          image {
            width: 100%;
            height: 100%;
          }
        }

        &-title {
          flex: 1;
          margin-left: 20rpx;
        }

        &-arrow {
        }
      }
    }
  }
}
.img-container {
  flex: 1;
  display: flex;

  .img-wrap {
    flex: 1;
    width: 100%;
    position: relative;
    overflow: auto;
    height: 110%;

    .img {
      width: 100%;
    }
  }
  .blank-click {
    width: 100%;
    height: 90rpx;
    z-index: 1000;
    position: absolute;
    left: 0;
    bottom: 180rpx;
    background-color: red;
    opacity: 1;
  }
}
</style>
