import { getStore} from "../config/utils";
import { httpGet, httpPost } from "../config/axios";

// 1. 获取 用户信息
export const getUser = () =>
  httpGet({ url: "/v1/user", params: { user_id: getStore("user_id") } });

// 2. 获取 猜想的城市
export const guessCity = () =>
  httpGet({ url: "/v1/cities", params: { type: "guess" } });

// 3.获取 热门城市列表
export const getHotCity = () =>
  httpGet({ url: "/v1/cities", params: { type: "hot" } });

// 4. 获取所有城市
export const getGroupCity = () =>
  httpGet({ url: "/v1/cities", params: { type: "group" } });

// 5. 获取当前所在城市
export const getCurrentCity = (number) =>
  httpGet({ url: "/v1/cities/" + number });

// 6. 获取搜索地址
export const searchPlace = (cityid, value) =>
  httpGet({
    url: "/v1/pois",
    params: { type: "search", city_id: cityid, keyword: value },
  });
