const config = {
  // 默认地址请求地址，可在 .env.** 文件中修改 
  baseURL: "http://localhost:8080",
  // 设置超时时间
  timeout: 80000,
  // 跨域时候允许携带凭证
  withCredentials: true,
  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  defaultHeaders: "application/json",
  setAuthHeaders: () => {
    return {
      tokenType: "wmp_token",
      ["accessToken"]: uni.getStorageSync("token"),
    };
  },
};

export default config;
