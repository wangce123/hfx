import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import course from "./modules/course.js"

const index = new Vuex.Store({
  state: {
    isAll: false
  },
  mutations: {
    changeIsAll(state) {
      state.isAll = true;
    }
  },
  modules: {
    course
  }
});
export default index;
