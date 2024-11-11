<template>
  <view class="container">
    <Capsule></Capsule>
    <view
      class="logo"
      :style="{ marginTop: `${useCommonStore.statusBarHeight * 2}rpx` }"
    >
      <image src="@/static/logo.png" mode="widthFix"></image>
    </view>

    <view class="user-info-card">
      <view class="content">
        <template v-for="(item, index) in list" :key="index">
          <view :class="['item', item.classNames]" v-if="index !== 1">
            <view class="info">
              <view class="head">
                <text>{{ item.title }}</text>
              </view>
              <view class="val">
                <template v-if="canShow">
                  {{ item.value }}
                </template>
                <template v-else> ****** </template>
              </view>
              <view class="date" v-if="item.date">{{ item.date }}</view>
            </view>

            <view class="icon-img">
              <up-icon
                size="26"
                color="#fff"
                :name="item.icon"
                v-if="item.icon === 'arrow-right'"
              ></up-icon>

              <image
                class="img"
                @click="canShow = !canShow"
                v-else
                :src="item.icon"
              ></image>
            </view>
          </view>
          <view class="item" v-else>
            <view class="need-login" @click="handleLogin">
              <view class="btn">立即登录</view>
            </view>
          </view>
        </template>
      </view>
    </view>

    <view class="banner-container">
      <view class="head">
        <view class="line"></view>
        <view>热门服务</view>
      </view>

      <view class="list">
        <view class="item" v-for="(item, index) in bannerList" :key="index">
          <view class="icon-img">
            <image :src="item.icon" mode="aspectFill"></image>
          </view>
          <view class="title">{{ item.title }}</view>
        </view>
      </view>
    </view>

    <view class="city-service">
      <view class="head">
        <view class="left">
          <view class="line"></view> <view>城市服务</view></view
        >
        <view class="check-more">{{ `查看更多>>` }}</view>
      </view>

      <view class="list">
        <view class="item">
          <view class="icon-img">
            <image
              src="@/static/home_icon_center.png"
              mode="aspectFill"
            ></image>
          </view>
          <view class="title">服务中心</view>
          <view>
            <up-icon name="arrow-right"></up-icon>
          </view>
        </view>
      </view>
    </view>
  </view>

  <CustomTab></CustomTab>
</template>

<script setup lang="ts">
import commonStore from "@/store/commonStore";
import Capsule from "@/components/Capsule/index.vue";
import { computed, ref } from "vue";
import infoStore from "@/store/infoStore";
import CustomTab from "@/components/CustomTab/index.vue";
import visiblePng from "../../../static/visible.png";
import unvisiblePng from "../../../static/unvisible.png";
import home_icon_account from "../../../static/home_icon_account.png";
import home_icon_loan from "../../../static/home_icon_loan.png";
import home_icon_personal from "../../../static/home_icon_personal.png";
import home_icon_transfer from "../../../static/home_icon_transfer.png";

const canShow = ref(false);

const useInfoStore = infoStore();
const useCommonStore = commonStore();

const isLogin = computed(() => {
  return Object.keys(useInfoStore.userInfo || {}).length;
});

const list = ref([
  {
    classNames: "left-top",
    title: "余额（元）",
    value: "1,233.00",
    icon: canShow.value ? visiblePng : unvisiblePng,
  },
  {
    classNames: "right-top",
    title: "余额（元）",
    value: "1,233.00",
    icon: "",
  },
  {
    classNames: "left-bottom",
    title: "最近缴存（元）",
    value: "1,233.00",
    icon: "arrow-right",
    date: "2024-11-10",
  },
  {
    classNames: "right-bottom",
    title: "最近提取（元）",
    value: "1,233.00",
    icon: "arrow-right",
    date: "2024-11-10",
  },
]);

const bannerList = ref([
  {
    title: "账户信息",
    icon: home_icon_account,
  },
  {
    title: "个人信息",
    icon: home_icon_loan,
  },
  {
    title: "填报信息",
    icon: home_icon_personal,
  },
  {
    title: "报表",
    icon: home_icon_transfer,
  },
]);

const height = computed(() => {
  return useCommonStore.statusBarHeight * 2 + "rpx";
});

const handleLogin = async () => {
  uni.navigateTo({
    url: `/pages/provident/login/index`,
  });
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;

  .user-info-card {
    display: flex;
    flex-direction: column;
    padding: 24rpx;

    .content {
      display: flex;
      flex-wrap: wrap;
      background-color: #5c88ee;
      border-radius: 8rpx;
      padding: 34rpx;

      .item {
        width: 50%;
        color: #fff;
        padding: 0 20rpx 20rpx 0;
        display: flex;
        justify-content: space-between;

        .need-login {
          flex: 1;
          display: flex;
          align-items: center;
          justify-self: center;

          .btn {
            flex: 1;
            width: 304rpx;
            text-align: center;
            line-height: 80rpx;
            height: 80rpx;
            background: #1a4dcd;
            border-radius: 40rpx;
            margin-bottom: 40rpx;
          }
        }

        .info {
          display: flex;
          flex-direction: column;
          .head {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }

        .info-img {
          display: flex;
          align-self: stretch;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .img {
          width: 30rpx;
          height: 30rpx;
          margin-right: 40rpx;
        }
      }

      .left-top {
        .val {
          font-size: 60rpx;
          font-weight: bolder;
        }
      }

      .right-top,
      .left-bottom,
      .right-bottom {
        .info .val {
          padding: 20rpx 0;
        }
        .icon-img {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .wrap {
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left,
        .right {
          flex: 1;
        }

        .left {
          display: flex;
          flex-direction: column;
          color: #fff;

          &-b {
            font-size: 60rpx;
            line-height: 60rpx;
          }

          &-t {
            font-size: 28rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;

            image {
              width: 30rpx;
              height: 30rpx;
              margin-right: 40rpx;
            }
          }
        }
      }
    }
  }
}

.banner-container {
  margin-top: 40rpx;
  display: flex;
  flex-direction: column;
  padding: 0 34rpx;

  .head {
    display: flex;
    align-items: center;
    font-size: 36rpx;
    font-weight: bold;
    line-height: 36rpx;

    .line {
      width: 6rpx;
      background-color: #5381ee;
      height: 28rpx;
      margin-right: 20rpx;
    }
  }

  .list {
    margin-top: 40rpx;
    display: flex;

    .item {
      width: calc(100% / 4);
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon-img {
        image {
          width: 96rpx;
          height: 96rpx;
        }
      }
    }
  }
}

.city-service {
  margin-top: 40rpx;
  display: flex;
  flex-direction: column;
  padding: 0 34rpx;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      font-size: 36rpx;
      font-weight: bold;
      line-height: 36rpx;
      display: flex;
      align-items: center;

      .line {
        width: 6rpx;
        background-color: #5381ee;
        height: 28rpx;
        margin-right: 20rpx;
      }
    }

    .check-more {
      font-size: 28rpx;
      color: #607eb6;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    margin-top: 36rpx;
    border-radius: 8rpx;

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #f5f9fc;
      padding: 24rpx 34rpx;
      .icon-img {
        image {
          width: 80rpx;
          height: 80rpx;
        }
      }

      .title {
        color: #607eb6;
        flex: 1;
        text-align: left;
        padding-left: 20rpx;
        font-size: 34rpx;
      }
    }
  }
}

.logo {
  width: 100rpx;

  padding-bottom: 20rpx;
  image {
    width: 100%;
  }
}
</style>
