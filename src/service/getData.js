import { getStore } from "../config/utils";
import { httpGet, httpPost, uploadFile, loadJson } from "../config/axios";

// 1. 获取 用户信息
// export const getUser = (user_id) =>
//   httpGet({ url: "/v1/user", params: { user_id } });
export const getUser = (user_id) =>
    loadJson({ path: "/databases/user/user.json" });

// 2. 获取 猜想的城市
// export const guessCity = () =>
// httpGet({ url: "/v1/cities", params: { type: "guess" } });
export const guessCity = () => loadJson({ path: "/databases/home/guess.json" });

// 3.获取 热门城市列表
// export const getHotCity = () =>
//   httpGet({ url: "/v1/cities", params: { type: "hot" } });
export const getHotCity = () => loadJson({ path: "/databases/home/hot.json" });

// 4. 获取所有城市
// export const getGroupCity = () =>
//   httpGet({ url: "/v1/cities", params: { type: "group" } });
export const getGroupCity = () =>
    loadJson({ path: "/databases/home/group.json" });

// 5. 获取当前所在城市
// export const getCurrentCity = (number) =>
//   httpGet({ url: "/v1/cities/" + number });
export const getCurrentCity = () =>
    loadJson({ path: "/databases/home/guess.json" });

// 6. 获取搜索地址
// export const searchPlace = (cityid, value) =>
//   httpGet({
//     url: "/v1/pois",
//     params: { type: "search", city_id: cityid, keyword: value },
//   });
export const searchPlace = () =>
    loadJson({ path: "/databases/city/place.json" });

// 7. 获取msite页面地址信息
// export const getMsiteAddress = (geohash) =>
//     httpGet({ url: "/v2/pois/" + geohash });
export const getMsiteAddress = () =>
    loadJson({ path: "/databases/msite/address.json" });

// 8. 获取msite页面食品分类列表
// export const getMsiteFoodTypes = (geohash) =>
//   httpGet({
//     url: "/v2/index_entry",
//     params: {
//       geohash,
//       group_type: "1",
//       "flags[]": "F",
//     },
//   });
export const getMsiteFoodTypes = () =>
    loadJson({ path: "/databases/msite/category.json" });

// 9. 获取msite商铺列表
// export const getShopList = ({
//   latitude,
//   longitude,
//   offset,
//   restaurant_category_id = "",
//   restaurant_category_ids = "",
//   order_by = "",
//   ery_mode = "",
//   delivery_mode = "",
//   support_ids = [],
// }) => {
//   // let supportStr = "";
//   // support_ids.forEach((item) => {
//   //     supportStr += "&support_ids[]=" + item;
//   // });
//   let data = {
//     latitude,
//     longitude,
//     offset,
//     limit: "20",
//     "extras[]": "activities",
//     keyword: "",
//     restaurant_category_id,
//     "restaurant_category_ids[]": restaurant_category_ids,
//     order_by,
//     "delivery_mode[]": delivery_mode,
//     support_ids: support_ids,
//   };
//   return httpGet({ url: "/shopping/restaurants", params: data });
// };
export const getShopList = () =>
    loadJson({ path: "/databases/msite/restaurant.json" });

// 10. 获取food页面的 category 种类列表
// export const getFoodCategory = (latitude, longitude) =>
//     httpGet({
//         url: "/shopping/v2/restaurant/category",
//         params: {
//             latitude,
//             longitude,
//         },
//     });
export const getFoodCategory = () =>
    loadJson({ path: "/databases/food/category.json" });

// 11. 获取food页面的配送方式
// export const getFoodDelivery = (latitude, longitude) =>
//     httpGet({
//         url: "/shopping/v1/restaurants/delivery_modes",
//         params: {
//             latitude,
//             longitude,
//             kw: "",
//         },
//     });
export const getFoodDelivery = () =>
    loadJson({ path: "/databases/food/delivery_modes.json" });

// 12.获取food页面的商家属性活动列表
// export const getShopAttribute = (latitude, longitude) =>
//     httpGet({
//         url: "/shopping/v1/restaurants/activity_attributes",
//         params: {
//             latitude,
//             longitude,
//             kw: "",
//         },
//     });
export const getShopAttribute = () =>
    loadJson({ path: "/databases/food/activity_attributes.json" });

// 13. 获取shop页面商铺详情
// export const getShopDetails = (shopid, latitude, longitude) =>
//     httpGet({
//         url: "/shopping/restaurant/" + shopid,
//         params: {
//             latitude,
//             longitude:
//                 longitude +
//                 "&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics",
//         },
//     });
export const getShopDetails = () =>
    loadJson({ path: "/databases/shop/restaurant.json" });

// 14. 获取shop页面菜单列表
// export const getFoodMenu = (restaurant_id) =>
//     httpGet({
//         url: "/shopping/v2/menu",
//         params: {
//             restaurant_id,
//         },
//     });
export const getFoodMenu = () =>
    loadJson({ path: "/databases/shop/menu.json" });

// 15.获取商铺评价分数
// export const getRatingScores = (shopid) =>
//     httpGet({ url: "/ugc/v2/restaurants/" + shopid + "/ratings/scores" });
export const getRatingScores = () =>
    loadJson({ path: "/databases/shop/scores.json" });

// 16. 获取商铺评价列表
// export const getRatingList = (shopid, offset, tag_name = "") =>
//     httpGet({
//         url: "/ugc/v2/restaurants/" + shopid + "/ratings",
//         params: {
//             has_content: true,
//             offset,
//             limit: 10,
//             tag_name,
//         },
//     });
export const getRatingList = () =>
    loadJson({ path: "/databases/shop/ratings.json" });

// 17.获取商铺评价分类
// export const getRatingTags = (shopid) =>
//     httpGet({ url: "/ugc/v2/restaurants/" + shopid + "/ratings/tags" });
export const getRatingTags = () =>
    loadJson({ path: "/databases/shop/tags.json" });



// 18. 确认订单
// export const checkout = (geohash, entities, shopid) =>
//     httpPost({
//         url: "/v1/carts/checkout",
//         data: {
//             come_from: "web",
//             geohash,
//             entities,
//             restaurant_id: shopid,
//         },
//         params: {
//             come_from: "web",
//             geohash,
//             entities,
//             restaurant_id: shopid,
//         },
//     });
export const checkout = () =>
    loadJson({ path: "/databases/confirmOrder/checkout.json" });


// 19. 获取图片验证码
// export const getCaptchas = () => httpPost({ url: "/v1/captchas" });
export const getCaptchas = () =>
    loadJson({ path: "/databases/user/captchas.json" });

// 20. 账号密码登录
// export const accountLogin = (username, password, captcha_code) =>
//     httpPost({ url: "/v2/login", data: { username, password, captcha_code } });
export const accountLogin = () =>
    loadJson({ path: "/databases/user/login.json" });

// 21. 退出登录
// export const signout = () => httpGet({ url: "/v2/signout" });
export const signout = () =>
    loadJson({ path: "/databases/user/signout.json" });

// 22. 修改密码
// export const changePassword = (
//     username,
//     oldpassWord,
//     newpassword,
//     confirmpassword,
//     captcha_code
// ) =>
//     httpPost({
//         url: "/v2/changepassword",
//         data: {
//             username,
//             oldpassWord,
//             newpassword,
//             confirmpassword,
//             captcha_code,
//         },
//     });
export const changePassword = () =>
    loadJson({ path: "/databases/user/changePassword.json" });

// 23. 上传头像
// export const uploadAvatar = (user_id, data) =>
//     uploadFile({ url: "/eus/v1/users/" + user_id + "/avatar", data });
export const uploadAvatar = () =>
    loadJson({ path: "/databases/user/uploadAvatar.json" });

// 24.搜索地址
// export const searchNearby = (keyword) =>
//     httpGet({ url: "/v1/pois", params: { type: "nearby", keyword } });
export const searchNearby = () =>
    loadJson({ path: "/databases/confirmOrder/searchNearby.json" });

// 25.添加地址
// export const addAddress = (
//     userId,
//     address,
//     address_detail,
//     geohash,
//     name,
//     phone,
//     phone_bk,
//     poi_type,
//     sex,
//     tag,
//     tag_type
// ) =>
//     httpPost({
//         url: "/v1/users/" + userId + "/addresses",
//         data: {
//             address,
//             address_detail,
//             geohash,
//             name,
//             phone,
//             phone_bk,
//             poi_type,
//             sex,
//             tag,
//             tag_type,
//         },
//     });
export const addAddress = () =>
    loadJson({ path: "/databases/confirmOrder/addAddress.json" });

// 26. 获取已经添加的地址列表
// export const getAddressList = (user_id) =>
//     httpGet({ url: "/v1/users/" + user_id + "/addresses" });
export const getAddressList = () =>
    loadJson({ path: "/databases/confirmOrder/addressList.json" });

// 27.删除已有的地址
// export const deleteAddress = (userid, addressid) =>
//     httpPost({
//         url: "/v1/users/" + userid + "/addresses/" + addressid,
//         method: "DELETE",
//     });
export const deleteAddress = () =>
    loadJson({ path: "/databases/confirmOrder/deleteAddress.json" });

// 28.获取订单列表
// export const getOrderList = (user_id, offset) =>
//     httpGet({
//         url: "/bos/v2/users/" + user_id + "/orders",
//         params: {
//             limit: 10,
//             offset,
//         },
//     });
export const getOrderList = () =>
    loadJson({ path: "/databases/order/orderList.json" });

// 29. 获取search页面搜索结果
// export const searchRestaurant = (geohash, keyword) =>
//     httpGet({
//         url: "/v4/restaurants",
//         params: {
//             "extras[]": "restaurant_activity",
//             geohash,
//             keyword,
//             type: "search",
//         },
//     });
export const searchRestaurant = () =>
    loadJson({ path: "/databases/search/search.json" });

// 30. 获取服务中心信息
// export const getService = () => httpGet({ url: "/v3/profile/explain" });
export const getService = () =>
    loadJson({ path: "/databases/service/service.json" });

// 31. 获取快速备注列表
// export const getRemark = (id, sig) =>
//     httpGet({
//         url: "/v1/carts/" + id + "/remarks",
//         params: {
//             sig,
//         },
//     });
export const getRemark = () =>
    loadJson({ path: "/databases/confirmOrder/getRemark.json" });

// 32. 下订单
// export const placeOrders = (
//     user_id,
//     cart_id,
//     address_id,
//     description,
//     entities,
//     geohash,
//     sig
// ) =>
//     httpPost({
//         url: "/v1/users/" + user_id + "/carts/" + cart_id + "/orders",
//         data: {
//             address_id,
//             come_from: "mobile_web",
//             deliver_time: "",
//             description,
//             entities,
//             geohash,
//             paymethod_id: 1,
//             sig,
//         },
//     });
export const placeOrders = () =>
    loadJson({ path: "/databases/confirmOrder/placeOrders.json" });

// 33. 重新发送订单验证码
// export const payRequest = (merchantOrderNo, userId) =>
//     httpGet({
//         url: "/payapi/payment/queryOrder",
//         params: {
//             merchantId: 5,
//             merchantOrderNo,
//             source: "MOBILE_WAP",
//             userId,
//             version: "1.0.0",
//         },
//     });
export const payRequest = () =>
    loadJson({ path: "/databases/confirmOrder/payRequest.json" });

// 34. 获取订单详情
// export const getOrderDetail = (user_id, orderid) =>
//     httpGet({
//         url: "/bos/v1/users/" + user_id + "/orders/" + orderid + "/snapshot",
//     });
export const getOrderDetail = () =>
    loadJson({ path: "/databases/order/orderDetail.json" });

