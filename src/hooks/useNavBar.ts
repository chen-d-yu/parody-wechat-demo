import { usePage } from "./usePage";
import { WX_TABBAR_LIST } from "./useTabbar";
import { computed } from "vue";

export const useNavBar = () => {
  const { currentPage, pages } = usePage();

  const getLeftIcon = computed(() => {
    // 如果当前页面在微信顶层，那么返回''
    const wxList = WX_TABBAR_LIST.map((item) => item.pagePath);
    if (wxList.includes(currentPage.route || "")) {
      return "";
    }
    // 如果存在于微信/公积金分包，返回  left 符号
    const currentPageRouteStrSplit = (currentPage.route || "").split("/");
    if (currentPageRouteStrSplit.filter((item) => item === "wx").length) {
      return "arrow-left";
    }

    // 否则就是在公积金中的第二层子页面，返回 left
    if (
      currentPageRouteStrSplit.filter((item) => item === "provident").length &&
      pages.length > 1
    ) {
      return "arrow-left";
    }

    // 不然就是空
    return "";
  });

  const handleLeftIconClick = () => {
    if (getLeftIcon.value === "arrow-left") {
      uni.navigateBack();
      return;
    }
  };

  return {
    handleLeftIconClick,
    getLeftIcon,
  };
};
