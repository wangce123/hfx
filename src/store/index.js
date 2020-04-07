import Vue from "vue";
import Vuex from "vuex";
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
  modules: {}
});
export default index;
