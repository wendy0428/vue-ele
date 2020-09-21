import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// 手淘 H5 适配
import "amfe-flexible/index.js";

// 引入 Mint-ui 组件库
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
// 引入自定义样式去覆盖 mint-ui的样式
import "./assets/css/mint.css";

Vue.use(MintUI);

Vue.config.productionTip = false;

Vue.prototype.axios = axios;

axios.defaults.baseURL = "/api";

// 自定义指令,实现列表加载更多
Vue.directive("loadMore", {
    bind: (el, binding) => {
        let windowHeight = window.screen.height;
        // console.log("返回以像素计的访问者屏幕的高度",windowHeight);
        let clientHeight;
        let offsetTop;
        let oldScrollTop;
        let requestFram;
        // 在开始触摸的时候获取 当前 ul元素的高度 和 ul 相对于文档 document的 top 绝对位移
        el.addEventListener(
            "touchstart",
            () => {
                // element.clientHeight: 在页面上返回内容的可视高度（不包括边框，边距或滚动条）height+上下padding
                clientHeight = el.clientHeight;
                // console.log('在页面上返回内容的可视高度',clientHeight);
                // offsetTop:返回当前元素的相对垂直偏移位置的偏移容器. 可以理解为容器相对于document的top的绝对偏移。等于    top+margin
                offsetTop = el.offsetTop;
                // console.log('返回当前元素的相对垂直偏移位置的偏移容器',offsetTop);
            },
            false
        );

        el.addEventListener(
            "touchmove",
            () => {
                loadMore();
            },
            false
        );

        el.addEventListener(
            "touchend",
            () => {
                oldScrollTop = document.documentElement.scrollTop;
                // console.log('oldScrollTop',oldScrollTop);
                moveEnd();
            },
            false
        );

        const moveEnd = () => {
            requestFram = requestAnimationFrame(() => {
                if (document.documentElement.scrollTop != oldScrollTop) {
                    oldScrollTop = document.documentElement.scrollTop;
                    moveEnd();
                } else {
                    cancelAnimationFrame(requestFram);
                    clientHeight = el.clientHeight;
                    loadMore();
                }
            });
        };

        const loadMore = () => {
            // 当前 ul元素的高度+当前 ul元素相对于document的top的绝对偏移-可视窗口的高度-滚动条的高度>2
            if (clientHeight + offsetTop - windowHeight - oldScrollTop < 2) {
                binding.value();
            }
        };
    }
}),
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
