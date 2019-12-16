<!--  -->
<template>
  <div class="video-main">
    <!-- 导航栏部分 -->
    <van-nav-bar
      :title="courseName"
      :left-text="$store.state.isAll == true? '返回' : ''"
      right-text="视频"
      :left-arrow="$store.state.isAll == true? true : false"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 视频部分 -->
    <div class="banner">
      <div class="controller">
        <div class="videoContent">
          <video-player
            class="video-player-box"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="playsinline"
            customEventName="customstatechangedeventname"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ended="onPlayerEnded($event)"
            @waiting="onPlayerWaiting($event)"
            @playing="onPlayerPlaying($event)"
            @loadeddata="onPlayerLoadeddata($event)"
            @timeupdate="onPlayerTimeupdate($event)"
            @canplay="onPlayerCanplay($event)"
            @canplaythrough="onPlayerCanplaythrough($event)"
            @statechanged="playerStateChanged($event)"
            @ready="playerReadied"
          ></video-player>
        </div>
      </div>
    </div>
    <!-- 播放列表部分 -->
    <div class="wrapper">
      <ul class="content songList">
        <li
          v-for="(item,index) in videoList"
          :key="item.id"
          :class="{active:index == videoIndex}"
          @click="changeVideoIndex($event,index)"
        >
          <div>
            <img v-if="index == videoIndex" src="@/assets/icon/voice.png" alt />
            <span v-else>{{index < 9 ? '0'+(index+1) : index+1}}</span>
            {{`${item.title}`}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Mock from "mockjs";
var Random = Mock.Random;
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import BScroll from "better-scroll";
export default {
  name: "video-main",
  components: {
    videoPlayer
  },
  data() {
    return {
      videoIndex: 0,
      courseType: 1,
      courseIndex: 0,
      // videoUrl:'http://source.huisharing.com/data//resources/course/100191/video/step1468893594861_video.mp4',
      playerOptions: {
        // videojs options
        muted: false,
        loop: false,
        // preload: 'auto',
        language: "zh-CN",
        aspectRatio: "16:9",
        fluid: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src:
              "http://source.huisharing.com/data//resources/course/100198/video/step1469151384353_video.mp4"
          }
        ],
        poster: Random.image("375x200", "#F9B063", "#FFF", "png", "字母A")
      }
    };
  },
  created() {
    this.courseIndex = this.$route.query.queryId;

    // 视频资、封面初始化
    this.playerOptions.sources[0].src = this.videoList[0].url;
    this.playerOptions.poster = this.videoList[0].poster;

    // window.addEventListener('touchmove', func, { passive: false })
  },
  mounted() {
    //将better-scroll挂载到vue实例上
    let wrapper = document.querySelector(".wrapper");
    let scroll = new BScroll(wrapper, {
      click: true
    });

    console.log("this is current player instance object", this.player);
    screen.orientation.lock("landscape");
  },
  computed: {
    ...mapState({
      courseName: function(state) {
        var index = this.courseIndex;
        return state.course.courseList[index].name;
      },
      // 根据路由传来的index动态获取vuex中复合条件的视频组
      videoList: function(state) {
        var index = this.courseIndex;
        return state.course.courseList[index].videoList;
      },

      // 在安卓和iOS端微信使用的内核不同,所需要的attribute也不同,尝试后,采用x5内核返回false,反之为true
      playsinline() {
        var ua = navigator.userAgent.toLocaleLowerCase();
        //x5内核
        if (
          ua.match(/tencenttraveler/) != null ||
          ua.match(/qqbrowse/) != null
        ) {
          return false;
        } else {
          //ios端
          return true;
        }
      }
    }),
    player() {
      return this.$refs.videoPlayer.player;
    }
  },

  methods: {
    // 这里是tabbar点击事件
    onClickLeft() {
      this.$router.push("/course");
    },
    onClickRight() {
      this.$router.push({
        name: "audio",
        query: {
          queryType: 0,
          queryId: this.courseIndex
        }
      });
    },

    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    // ...player event
    onPlayerEnded() {},
    onPlayerWaiting() {},
    onPlayerPlaying() {},
    onPlayerLoadeddata() {},
    onPlayerTimeupdate() {},
    onPlayerCanplay() {
      // console.log('player Canplay!', player)
      //解决自动全屏
      var ua = navigator.userAgent.toLocaleLowerCase();
      //x5内核
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        $("body")
          .find("video")
          .attr("x-webkit-airplay", true)
          .attr("x5-playsinline", true)
          .attr("webkit-playsinline", true)
          .attr("playsinline", true);
      } else {
        //ios端
        $("body")
          .find("video")
          .attr("webkit-playsinline", "true")
          .attr("playsinline", "true");
      }
    },
    onPlayerCanplaythrough() {},
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log("the player is readied", player);
      // you can use it to do something...
      // player.[methods]
    },

    // 这是列表点击事件
    changeVideoIndex(e, val) {
      this.videoIndex = val;
      this.changeVideo(val);
    },
    // 封装切换视频的函数
    changeVideo(val) {
      this.playerOptions.sources[0].src = this.videoList[val].url;
      this.playerOptions.poster = this.videoList[val].poster;
    }
  }
};
</script>
<style lang="scss">
.van-nav-bar {
  .van-nav-bar__left,
  .van-nav-bar__right {
    span {
      font-size: 15px;
      font-family: "SourceHanSansBold";
      color: #ec6941;
    }
  }
  .van-icon-arrow-left:before {
    content: "\F008";
    color: #ec6941;
  }
  .van-nav-bar__title {
    font-size: 17.5px;
    color: #232323;
    font-family: "SourceHanSansBold";
    font-weight: bold;
    margin-left: 100px;
  }
}
.video-js .vjs-big-play-button {
  border: none;
}
</style>
<style lang='scss' scoped>
.video-main {
  height: 100%;
  .banner {
    height: 210px;
    width: 100%;
    .controller {
      width: 100%;
      height: 100%;
      .videoContent {
        width: 100%;
        height: 100%;
        .video-player-box {
          width: 100%;
          height: 100%;
          ::v-deep .video-js .vjs-big-play-button {
            left: 50%;
            top: 50%;
            margin-left: -40px;
            margin-top: -21.7px;
          }
        }
      }
    }
  }
  .wrapper {
    height: calc(100% - 256px);
    overflow: hidden;
    .songList {
      width: 100%;
      li {
        height: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 13px;
        &:nth-child(2n + 1) {
          background-color: #f8f8f8;
        }
        div {
          height: 100%;
          line-height: 40px;
          color: #333334;
          font-family: "SourceHanSansBold";
          font-size: 17px;
          text-align: left;
          span {
            color: #999999;
          }
          img {
            vertical-align: text-bottom;
            width: 20px;
            height: 20px;
          }
        }
        &.active div {
          color: #19caad;
        }
      }
    }
  }
}
</style>