<template>
  <view class="group-container">
    <swiper
      class="swiper"
      vertical
      :current="useCommonStore.currentIndex"
      @change="handleChange"
      @animationfinish="animationfinish"
      @transition="handleScroll"
    >
      <swiper-item>
        <view class="swiper-item uni-bg-green">
          <canvas
            id="myCanvas"
            canvas-id="myCanvas"
            :style="{
              width: canvasInfo.width + 'px',
              height: canvasInfo.height + 'px',
            }"
            @touchstart="handleTouchStart"
          ></canvas>
        </view>
      </swiper-item>
      <swiper-item>
        <up-navbar
          title="微信"
          autoBack
          placeholder
          leftIcon=""
          bgColor="#ededed"
        >
          <template #right>
            <up-icon
              name="search"
              color="#181818"
              size="24"
              style="margin-right: 20rpx"
              @click="toSearch"
            />
            <up-icon name="plus-circle" color="#181818" size="18" />
          </template>
        </up-navbar>
        <view class="img-container">
          <image class="img" src="@/static/images/chat.jpg" mode="widthFix" />
          <view class="brank-click" @click="toImChat"></view>
        </view>
      </swiper-item>
    </swiper>

    <CustomTab :customStyle="`opacity: ${opacity}`" />
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, getCurrentInstance, watch, nextTick } from "vue";
import CustomTab from "@/components/CustomTab/index.vue";
import { useNavigate } from "@/hooks/useTabbar";
import commonStore from "@/store/commonStore";
import { onHide, onShow } from "@dcloudio/uni-app";

const useCommonStore = commonStore();

const show = ref(false);
// const current = ref(1);
const opacity = ref(1);

onHide(() => {
  nextTick(() => {
    useCommonStore.updateValueByKey("currentIndex", 1);
  });
});

const handleChange = (event) => {
  // useCommonStore.updateValueByKey("currentIndex", event.detail.current);
};
const animationfinish = (event) => {
  opacity.value = event.detail.current;
};

const prevDy = ref(0);

const handleScroll = (event) => {
  const { dy } = event.detail;
  prevDy.value = dy;
};

const toSearch = () => {};

const { navigateHandler } = useNavigate();
const toImChat = () => {
  navigateHandler("/pages/wx/im/index");
};

const instance = getCurrentInstance();
const canvasInfo = ref({
  width: 0,
  height: 0,
});

const handleTouchStart = (event) => {
  const x = event.touches[0].x;
  const y = event.touches[0].y;

  // 定义目标区域的坐标和尺寸
  const targetArea = {
    x: 36,
    y: 220,
    width: 40,
    height: 40,
  };

  // 判断点击位置是否在目标区域内
  if (
    x >= targetArea.x &&
    x <= targetArea.x + targetArea.width &&
    y >= targetArea.y &&
    y <= targetArea.y + targetArea.height
  ) {
    // 响应点击事件
    // 在这里执行目标区域被点击后的操作
    navigateHandler("/pages/provident/index/index");
  }
};

const canvasStart = () => {
  const query = uni.createSelectorQuery().in(instance);

  query
    .select("#myCanvas")
    .fields({ size: true, rect: true }, (res) => {})
    .exec((res) => {
      // node.windowWidth = 750;
      // node.windowHeight = 1300;
      const ctx = uni.createCanvasContext("myCanvas");

      canvasInfo.value.height =
        useCommonStore.windowHeight - (useCommonStore?.statusBarHeight || 0);
      canvasInfo.value.width = useCommonStore.windowWidth;

      const canvasWidth = useCommonStore.windowWidth;

      // node.width = useCommonStore.windowWidth * useCommonStore.dpr;
      // node.height = useCommonStore.windowHeight * useCommonStore.dpr;

      // ctx.scale(useCommonStore.dpr, useCommonStore.dpr);

      uni.getImageInfo({
        src: "../../static/images/im-chat.jpg",
        success(res) {
          const img = res.path; // 获取图片的本地路径
          // 图片的原始尺寸
          const imgWidth = res.width;
          const imgHeight = res.height;

          const scale = canvasWidth / imgWidth;

          // 计算图片在canvas中的宽度和高度
          const scaledWidth = canvasWidth;
          const scaledHeight = imgHeight * scale;

          ctx.drawImage(
            img,
            0,
            useCommonStore?.statusBarHeight || 0,
            scaledWidth,
            scaledHeight
          );
          ctx.save();

          // 移动的正方形
          ctx.translate(scaledWidth, scaledHeight);
          ctx.rotate(Math.PI);

          ctx.translate(0, -scaledHeight + 100);

          ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
          ctx.restore();

          // 绘制点击区域
          ctx.translate(36, 220 + (useCommonStore?.statusBarHeight || 0));
          ctx.setFillStyle("#ff0000");
          ctx.fillRect(0, 0, 40, 40);
          ctx.draw();

          // TODO
          // 创建从上往下的线性渐变对象，起始位置在x=0, y=600
          // const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
          // gradient.addColorStop(0, "rgba(57, 53, 76,0)"); // 渐变开始处不透明（深）
          // gradient.addColorStop(1, "rgba(70, 65, 93,0.5)"); // 渐变结束处完全透明（浅）
          // ctx.setFillStyle(gradient);
          // ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        },
      });
    });
};

watch(
  () => useCommonStore.currentIndex,
  (val) => {
    console.log("val", val);
    nextTick(() => {
      canvasStart();
    });
  },
  {
    immediate: true,
  }
);
onMounted(() => {
  nextTick(() => {
    canvasStart();
  });
});
</script>

<style scoped lang="scss">
.group-container {
  height: 100%;

  .swiper {
    height: 100%;
  }

  .swiper-item {
    width: 100%;
    height: 100%;

    .img {
      width: 100%;
      height: 90%;
    }
  }
}

.img-container {
  width: 100%;
  display: flex;
  position: relative;

  .img {
    flex: 1;
  }

  .brank-click {
    width: 100%;
    height: 130rpx;
    z-index: 1000;
    position: absolute;
    bottom: 0;
  }
}
</style>
