<script>
import commonStore from "@/store/commonStore";

export default {
  onLaunch: async (params) => {
    const useCommonStore = commonStore();

    uni.getSystemInfo({
      success: (res) => {
        const { safeArea, platform, devicePixelRatio, statusBarHeight } = res;

        for (const key in res) {
          if (Object.prototype.hasOwnProperty.call(res, key)) {
            console.log(key, " --------------------- ", res[key]);

            useCommonStore.updateValueByKey(key, res[key]);
          }
        }

        useCommonStore.updateValueByKey("isIphoneX", safeArea.top > 20);
        useCommonStore.updateValueByKey("isIos", platform === "ios");
        useCommonStore.updateValueByKey("dpr", devicePixelRatio);

        // TODO
        // // 获取手机状态栏高度
        // const custom = wx.getMenuButtonBoundingClientRect();
        // const customBar = custom.bottom + custom.top - statusBarHeight;

        // useCommonStore.updateValueByKey("customBar", customBar);
      },
    });
  },
  onShow: async function (params) {},
  onHide: function () {},
  methods: {},
};
</script>

<style lang="scss">
/* 引入app.wxss文件, 页面公共css */
@import "uview-plus/index.scss";
@import "./app.css";
@import "./assets/font/iconfont.css";
</style>
