import request from "@/services/http";

export const getUserInfo = () => {
  return request.get({
    url: `/v1/wx-user/info`,
  });
};

// {"account":"19071813929","pwd":"123456"}
export const login = () => {
  return request.post({
    url: `/v1/wx-user/login`,
  });
};

export const getIndexDetail = () => {
  return request.get({
    url: `/v1/wx-user/detail/info`,
  });
};

export const getDetailList = () => {
  return request.get({
    url: "/v1/wx-user/detail/list",
  });
};
