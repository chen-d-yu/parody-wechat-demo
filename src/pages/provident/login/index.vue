<template>
  <view class="login-container">
    <Navbar
      title="登录账户"
      bg-color="#1c53d5"
      titleStyle="color: #fff"
    ></Navbar>

    <view class="logo">
      <image src="@/static/logo.png"></image>
    </view>

    <view class="input">
      <view>账号</view>
      <up-input
        border="bottom"
        v-model="formData.account"
        placeholder="请输入手机号"
      ></up-input>
    </view>

    <view class="input">
      <view>密码</view>
      <up-input
        border="bottom"
        v-model="formData.pwd"
        placeholder="请输入密码"
        type="password"
      ></up-input>
    </view>

    <view class="btn" @click="handleLogin">一键登录</view>

    <view class="xieyi">
      <up-checkbox
        :customStyle="{ marginBottom: '8px' }"
        label="同意用户协议与隐私条款"
        name="agree"
        usedAlone
        v-model:checked="formData.aloneChecked"
      >
      </up-checkbox>
    </view>

    <view class="other">
      <view class="line"></view>
      <view>其他登录方式</view>
      <view class="line"></view>
    </view>

    <view class="type">
      <view> <image src="@/static/logo.png"></image>密码 </view>
      <view><image src="@/static/logo.png"></image>指纹</view>
      <view><image src="@/static/logo.png"></image>手势</view>
    </view>
  </view>
</template>

<script setup>
import Navbar from "@/components/Navbar/index.vue";
import { ref } from "vue";
import { login } from "@/api/index";

const formData = ref({
  account: "",
  pwd: "",
  aloneChecked: true,
});

const handleLogin = async () => {
  const res = await login(formData.value);

  console.log(res);
};
</script>

<style lang="scss" scoped>
.login-container {
  padding: 40rpx;
  height: 100%;
}

.logo {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  image {
    width: 200rpx;
    height: 200rpx;
  }
}

.input {
  margin-top: 60rpx;
  display: flex;
  align-items: center;
}

.btn {
  margin-top: 80rpx;
  background-color: #3165df;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 40rpx;
  padding: 20rpx;
}

.xieyi {
  margin-top: 40rpx;
}

.other {
  display: flex;
  align-items: center;
  margin-top: 140rpx;
  view {
    flex: 1;
  }

  .line {
    height: 2rpx;
    background-color: #282828c0;
    width: 40%;
  }
}

.type {
  display: flex;
  align-items: center;
  justify-content: space-between;

  view {
    display: flex;
    flex-direction: column;
    align-items: center;
    image {
      width: 60rpx;
      height: 60rpx;
      margin-top: 40rpx;
    }
  }
}
</style>
