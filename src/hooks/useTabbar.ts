import { computed, watch } from "vue";
import commonStore from "@/store/commonStore";
import wechat from "@/static/tabbar/wechat.png";
import wechat1 from "@/static/tabbar/wechat_hl.png";
import contact from "@/static/tabbar/contact.png";
import contactFill from "@/static/tabbar/contact-fill.png";
import find from "@/static/tabbar/find.png";
import find_hl from "@/static/tabbar/find_hl.png";
import my from "@/static/tabbar/my.png";
import my_hl from "@/static/tabbar/my_hl.png";
import tabbar_icon_home_normal from "@/static/tabbar/tabbar_icon_home_normal.png";
import tabbar_icon_home_select from "@/static/tabbar/tabbar_icon_home_select.png";
import tabbar_icon_my_select from "@/static/tabbar/tabbar_icon_my_select.png";
import tabbar_icon_my_normal from "@/static/tabbar/tabbar_icon_my_normal.png";
import tabbar_icon_service_normal from "@/static/tabbar/tabbar_icon_service_normal.png";
import tabbar_icon_service_select from "@/static/tabbar/tabbar_icon_service_select.png";

export const WX_TABBAR_LIST: TabbarItem[] = [
  {
    pagePath: "pages/group/index",
    iconPath: wechat1,
    selectedIconPath: wechat,
    text: "微信",
  },
  {
    pagePath: "pages/contact/index",
    iconPath: contact,
    selectedIconPath: contactFill,
    text: "通讯录",
  },
  {
    pagePath: "pages/find/index",
    iconPath: find,
    selectedIconPath: find_hl,
    text: "发现",
  },
  {
    pagePath: "pages/mine/index",
    iconPath: my,
    selectedIconPath: my_hl,
    text: "我",
  },
];

export const MINI_PROGRAM_TABBAR_LIST: TabbarItem[] = [
  {
    pagePath: "pages/provident/index/index",
    iconPath: tabbar_icon_home_normal,
    selectedIconPath: tabbar_icon_home_select,
    text: "",
  },
  {
    pagePath: "pages/service/index",
    iconPath: tabbar_icon_my_normal,
    selectedIconPath: tabbar_icon_my_select,
    text: "",
  },
  {
    pagePath: "pages/my/index",
    iconPath: tabbar_icon_service_normal,
    selectedIconPath: tabbar_icon_service_select,
    text: "",
  },
];
export interface TabbarItem {
  pagePath: string;
  iconPath: string;
  selectedIconPath: string;
  text: string;
}

const useTabbar = () => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1].route;

  const useCommonStore = commonStore();

  const tabList = computed(() => {
    const [listMap = []] = [WX_TABBAR_LIST, MINI_PROGRAM_TABBAR_LIST].filter(
      (list) => list.map((item) => item.pagePath).includes(currentPage || "")
    );

    return listMap;
  });

  watch(
    () => tabList.value,
    (list) => {
      console.log(list);

      const firstPagePath = list?.[0].pagePath ? `/${list[0].pagePath}` : "";
      const indexPath = useCommonStore.indexPath;
      if (firstPagePath && firstPagePath !== indexPath) {
        useCommonStore.updateValueByKey("indexPath", firstPagePath);
      }
    },
    {
      immediate: true,
    }
  );

  const showComp = computed(() => {
    const inWXList = WX_TABBAR_LIST.map((item) => item.pagePath).includes(
      currentPage || ""
    );
    const inMiniProgramList = MINI_PROGRAM_TABBAR_LIST.map(
      (item) => item.pagePath
    ).includes(currentPage || "");
    return inWXList || inMiniProgramList;
  });

  return { tabList, showComp, currentPage };
};

function extractPath(url: string) {
  const match = url.match(/^[^?#]*/);
  return match ? match[0] : "";
}

const useNavigate = () => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1].route;

  const tabList = computed(() => {
    const [listMap = []] = [WX_TABBAR_LIST, MINI_PROGRAM_TABBAR_LIST].filter(
      (list) => list.map((item) => item.pagePath).includes(currentPage || "")
    );

    return listMap;
  });

  const navigateHandler = (url: string) => {
    return new Promise((resolve, reject) => {
      const pathname = url.startsWith("/") ? url : "/" + url;

      const isTabbarLink = tabList.value
        .map((item) => `/${item.pagePath}`)
        .includes(extractPath(pathname));

      const navParams = {
        url: url.startsWith("/") ? url : "/" + url,
        success: (...args: any[]) => {
          resolve(args);
        },

        fail: (...args: any[]) => {
          reject(...args);
        },
      };

      if (isTabbarLink) {
        uni.reLaunch(navParams);
      } else {
        uni.navigateTo(navParams);
      }
    });
  };

  return { navigateHandler };
};

export { useTabbar, useNavigate };
