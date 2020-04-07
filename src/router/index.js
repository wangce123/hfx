import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [

  {
    path: "/",
    redirect: '/course',
    // name: "home",
    // component: Home
  },
  {
    path: "/course",
    name: "course",
    component: () =>
      import("../views/course/index.vue"),
    meta: {
      title: ''
    }
  },
  {
    path: "/detail",
    name: "detail",
    redirect: '/detail/audio',
    component: () =>
      import("../views/detail/index.vue"),
  },
  {
    path: "/detail/audio/:queryId",
    name: "audio",
    component: () =>
      import("../views/detail/audio/index.vue"),
    meta: {
      title: ''
    }
  },
  {
    path: "/detail/video/:queryId",
    name: "video",
    component: () =>
      import("../views/detail/video/index.vue"),
    meta: {
      title: ''
    }
  },
  {
    path: "/progress",
    name: "progress",
    component: () =>
      import("../components/Progress.vue"),
    meta: {
      title: ''
    }
  }
];

const router = new VueRouter({
  // mode: 'history',
  routes
});

export default router;
