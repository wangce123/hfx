import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 这是移动端适配，用于设置 rem 基准值
import 'lib-flexible/flexible.js'

// 这是初始化样式
import '@/assets/css/reset.css'

// 这里引入了element-ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 这里引入了vant框架
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//这里引入jq工具
import $ from 'jquery';

//引入外部字体
import '@/assets/font/SiYuanHeiTiJiuZiXing-Regular-2/SiYuanHeiTiJiuZiXing-Regular-2.css'

// 引入动态title
import VueWechatTitle from 'vue-wechat-title'; 
Vue.use(VueWechatTitle)



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
