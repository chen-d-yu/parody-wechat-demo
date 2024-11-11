import { defineStore } from "pinia";

export default defineStore("infoStore", {
  state: () => {
    return {
      userInfo: {},
    };
  },
  actions: {
    updateValueByKey(key: string, value: any) {
      this[key] = value;
    },
  },
});
