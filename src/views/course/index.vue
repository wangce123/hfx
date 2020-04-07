<!--  -->
<template>
  <div class="course-main">
    <div class="banner" style="display:none">
      <ul id="banner">
        <li v-for="item in courseList" :key="item.index">
          <img src="@/assets/img/banner.jpg" alt />
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <ul class="content">
        <li
          v-for="(item,index) in courseList"
          :class="{active:index == courseIndex}"
          :key="index"
          @click="changeBanner($event,index)"
        >
          <div class="li-in">
            <img :src="item.cd_picUrl" alt />
            <div class="dsc">
              <p class="name">{{item.cd_name}}</p>
            </div>
            <div class="iconBox">
              <img :src="leftIcon" @click.stop="$router.push(`/detail/audio/${btoa(item.cd_id)}`)" alt />
              <img
                :src="rightIcon"
                @click.stop="$router.push(`/detail/video/${btoa(item.cd_id)}`)"
                alt
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Mock from "mockjs";
import infoApi from "@/api/mediaApi.js";
var Random = Mock.Random;
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "course",
  data() {
    return {
      mockImage: Random.image("144x120", "#4d4d4d"),
      leftIcon: require("@/assets/icon/audio.png"),
      rightIcon: require("@/assets/icon/video.png"),
      courseIndex: 0,
      courseList: []
    };
  },

  computed: {
    ...mapState({
      // courseList: state => state.course.courseList
    })
  },

  methods: {
    changeBanner(e, val) {
      var liw = document.querySelector("#banner").children[0].offsetWidth;
      document.querySelector(".banner ul").style.left = -val * liw + "px";
      this.courseIndex = val;
    },
    //url编码
    btoa(val) {
      return window.btoa(val);
    },
    //数据初始化，axios请求
    init() {
      infoApi
        .infoApi({
          page: 1,
          rows: 999
        })
        .then(res => {
          console.log("res", res);
          this.courseList = res.rows
        });
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.$store.commit("changeIsAll");
    // console.log(this.$store.state);

    //将better-scroll挂载到vue实例上
    // let wrapper = document.querySelector(".wrapper");
    // let scroll = new BScroll(wrapper, {
    //   click: true
    // });
  }
};
</script>
<style lang="scss" scoped>
.course-main {
  .banner {
    width: 100%;
    height: 180px;
    position: relative;
    overflow: hidden;
    ul {
      transition: all 0.5s ease;
      position: absolute;
      top: 0;
      left: 0;
      width: 700%;
      height: 100%;
      li {
        width: 375px;
        height: 100%;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .wrapper {
    .content {
      li {
        width: 100%;
        height: 90px;
        font-size: 20px;
        font-family: "SiYuanHeiTiJiuZiXing-Regular-2";
        display: flex;
        align-items: center;
        justify-content: center;
        .li-in {
          height: 60px;
          width: 335px;
          margin-left: 2px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            width: 72px;
            height: 60px;
            border-radius: 5px;
          }
          .dsc {
            width: 180px;
            height: 100%;
            margin-left: 15px;
            margin-right: auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: left;
            .name {
              height: 100%;
              font-size: 15px;
              line-height: 50px;
              color: #494949;
            }
          }
          .iconBox {
            width: 58px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            img {
              width: 20px;
              height: 19px;
            }
          }
        }
        &.active {
          background-color: #f8f8f8;
        }
      }
    }
  }
}
</style>