import qs from "qs";
import defaultConfig from "./config";

// 请求与响应拦截
/**
 * 全局请求拦截器
 * 可以用于修改请求配置，如添加请求头等
 * @param {Object} config - 请求配置
 * @return {Object} - 返回修改后的请求配置
 */
function requestInterceptor(options) {
  //1.非http开头需要拼接地址
  if (!options.url.startsWith("http")) {
    // options.url = baseURL + options.url;
    options.url = (defaultConfig.baseURL ? defaultConfig.baseURL : "") + options.url;
  }
  //2.请求超时
  options.timeout = options?.timeout ? options?.timeout : defaultConfig.timeout;
  //3.添加小程序端请求头标识
  options.header = {
    ["Content-Type"]: options?.config?.headersType || defaultConfig.defaultHeaders,
    ...options?.config?.header,
    ...defaultConfig.setAuthHeaders(),
  };
  return options;
}

const request = (options) => {
  //1.返回Promise对象
  return new Promise((resolve, reject) => {
    // 使用请求拦截器
    const interceptedOptions = requestInterceptor(options);
    uni.request({
      ...interceptedOptions,
      //2.请求成功
      success: async (response) => {
        resolve(response.data);
      },
      fail: (error) => {
        if (error.errMsg !== "request:fail abort") {
          if (!interceptedOptions.hiddenErrorMessage) {
            uni.showToast({ title: "网络异常，请检查网络连接", icon: "none" });
          }
          reject(error);
        }
      },
      complete: async () => {},
    });
  });
};

export default {
  post: async (options) => {
    if (options.method === "post" && options.headersType === "application/x-www-form-urlencoded") {
      options.data = qs.stringify(options.data);
    }
    return await request({ ...options, method: "post" });
  },
  get: async (options) => {
    return await request({ ...options, method: "get" });
  },
  put: async (options) => {
    return await request({ ...options, method: "put" });
  },
  delete: async (options) => {
    return await request({ ...options, method: "delete" });
  },
  patch: async (options) => {
    return await request({ ...options, method: "put" });
  },
};
