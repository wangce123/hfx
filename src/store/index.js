import Vue from "vue";
import Vuex from "vuex";
import course from "./modules/course";
Vue.use(Vuex);

const index = new Vuex.Store({
  state: {
    isAll: false
  },
  mutations: {
    changeIsAll(state) {
      state.isAll = true;
    }
  },
  modules:{
    course
  }
});
export default index;
