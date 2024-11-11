<template>
  <view class="wx-mini-program">
    <view class="navbar">
      <up-navbar
        title="小程序"
        autoBack
        placeholder
        leftIcon="arrow-left"
        bgColor="transparent"
      >
        <template #right>
          <up-icon
            name="search"
            color="#181818"
            size="24"
            style="margin-right: 20rpx"
            @click="toSearch"
          />
          <up-icon name="account" color="#181818" size="24" />
        </template>
      </up-navbar>
    </view>

    <view class="container">
      <scroll-view scroll-y style="height: 100%">
        <view class="item-container">
          <view class="used">
            <view class="head">
              <view class="title">最近使用</view>
              <view class="arrow">
                <up-icon name="arrow-right" color="#181818" size="24" />
              </view>
            </view>
            <view class="list">
              <view class="item" v-for="item in usedList" :key="item.title">
                <view class="icon"></view>
                <view class="title">{{ item.title }}</view>
              </view>
            </view>
          </view>
          <view class="usually">
            <view class="head">
              <view class="title">我的常用</view>
              <view class="arrow">
                <up-icon name="arrow-right" color="#181818" size="24" />
              </view>
            </view>
            <view class="list">
              <view class="item" v-for="(item, index) in usually" :key="index">
                <view class="icon"></view>
                <view class="title">{{ item.title }}</view>
              </view>
            </view>
          </view>
          <view class="others"></view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usedList, others, usually } from "./data";
const toSearch = () => {};
</script>

<style lang="scss" scoped>
.wx-mini-program {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
}
.container {
  flex: 1;
  background-color: red;
  .item-container {
    display: flex;
    flex-direction: column;
    padding: 20rpx 20rpx 0;

    .usually .list {
      flex-wrap: wrap;
    }

    .used,
    .usually {
      background-color: #fff;
      padding: 24rpx;
      border-radius: 24rpx;
      margin-bottom: 20rpx;
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .list {
        margin-top: 40rpx;
        display: flex;
        .item {
          width: 25%;
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-bottom: 10rpx;

          .icon {
            width: 80rpx;
            height: 80rpx;
            background-color: blue;
            border-radius: 50%;
          }
          .title {
            // 超出显式省略号
            width: 100%;
            overflow: hidden;
            /*文本不会换行*/
            white-space: nowrap;
            /*当文本溢出包含元素时，以省略号表示超出的文本*/
            text-overflow: ellipsis;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
