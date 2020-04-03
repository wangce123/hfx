<!--  -->
<template>
  <div class="audio-main" ontouchstart>
    <!-- loading部分 -->
    <van-loading v-if="isLoading" type="spinner" color="#19caad" />
    <!-- 导航栏部分 -->
    <van-nav-bar
      :title="courseName"
      :left-text="$store.state.isAll == true? '返回' : ''"
      right-text="音频"
      :left-arrow="$store.state.isAll == true? true : false"
      @click-left="onClickLeft"
      @click-right="$router.push(`/detail/video/${btoa(courseIndex)}`)"
    />

    <!-- 播放器banner板块 -->
    <div class="banner">
      <!-- 播放信息 -->
      <div class="info">
        <div class="record">
          <div class="record-c">
            <div class="red"></div>
          </div>
        </div>
        <div class="detail">
          <div class="detail-c">
            <div class="logo">
              <img src="@/assets/icon/elephant.png" alt />
            </div>
          </div>
          <p v-if="audioList.length > 0">{{audioList[audioIndex].audio_name}}</p>
        </div>
      </div>
      <!-- 播放控件 -->
      <div class="controller">
        <!-- 上一首/下一首/暂停 -->
        <div class="controller-c">
          <div class="last">
            <img src="@/assets/icon/last step.png" @click="last" alt />
          </div>
          <div class="pause" @click="pause">
            <img v-if="!isPaused" src="@/assets/icon/pause.png" alt />
            <img v-else src="@/assets/svg/paused.svg" alt />
          </div>
          <div class="next">
            <img src="@/assets/icon/next step.png" @click="next" alt />
          </div>
        </div>
        <!-- 进度条/时间/重新播放 -->
        <div class="controller-r">
          <el-progress
            ref="progress"
            class="line"
            color="#19caad"
            :text-inside="true"
            :stroke-width="20"
            :percentage="percentage"
            status="exception"
            :show-text="false"
            @click.native="changeProgress"
          ></el-progress>
          <div class="time">
            <span class="currentTime">{{currentTime}}</span>
            <span class="duration">{{duration}}</span>
          </div>
          <div class="restart" @click="restart">
            <img src="@/assets/icon/restart.png" alt />
          </div>
        </div>

        <!-- audio标签和资源在这 -->
        <audio
          @timeupdate="updateCurrentTime"
          @canplaythrough="canplaythrough"
          @waiting="waiting"
          loop
        >
          Your browser does not support the audio element.
          <source :src="resourceAudioUrl" type="audio/mp3" />
        </audio>
      </div>
    </div>

    <!-- 以下是播放列表 -->
    <div class="wrapper">
      <div class="content">
        <ul class="songList">
          <li
            v-for="(item,index) in audioList"
            :key="item.audio_pos"
            :class="{active:index == audioIndex}"
            @click="changeAudioIndex($event,index)"
          >
            <div>
              <img v-if="index == audioIndex" src="@/assets/icon/voice.png" alt />
              <span v-else>{{index < 9 ? '0'+(index+1) : index+1}}</span>
              {{`${item.audio_name}`}}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Progress from "../component/Progress";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import BScroll from "better-scroll";
import audioApi from "@/api/mediaApi.js";
export default {
  name: "audio-main",
  components: {
    Progress
  },
  data() {
    return {
      percentage: 0,
      currentTimes: 0,
      durations: 0,
      isPaused: true,
      resourceAudioUrl: "",
      courseIndex: 9,
      courseType: 0,
      audioIndex: 0,
      audioList: [],
      courseName: "",
      isLoading: false,
      isFirstClick: true,
      firstSrc: ""
    };
  },
  computed: {
    currentTime: function() {
      var a = this.currentTimes;
      return this.timeFormatter(a);
    },
    duration: function() {
      var a = this.durations;
      return this.timeFormatter(a);
    }
  },
  created() {
    let queryId = window.atob(this.$route.params.queryId);
    this.courseIndex = queryId;
    this.init();
  },
  mounted() {
    //将better-scroll挂载到vue实例上
    let wrapper = document.querySelector(".wrapper");
    let scroll = new BScroll(wrapper, {
      click: true
    });

    // 这里将音频挂载到vue实例上
    this.audioEle = document.getElementsByTagName("audio")[0];

    //这里获取进度条总宽度
    this.progressWidth = document.querySelectorAll(".line")[0].offsetWidth;
    console.log(this.progressWidth);
  },
  methods: {
    //url编码
    btoa(val) {
      return window.btoa(val);
    },
    //数据初始化，axios请求
    init() {
      audioApi
        .audioApi({
          page: 1,
          rows: 999,
          cd_id: this.courseIndex
        })
        .then(res => {
          console.log("res", res);
          this.audioList = res.rows;
          this.resourceAudioUrl = res.rows[0].resourceAudioUrl;
          this.firstSrc = res.rows[0].resourceAudioUrl;
          // this.audioEle.src = res.rows[0].resourceAudioUrl;
          // this.isPause = true;
          console.log(this.resourceAudioUrl);
          this.courseName = res.cd_name;
        });
    },
    // 这里是tabbar点击事件
    onClickLeft() {
      this.$router.push("/course");
    },

    // 转化时间格式
    timeFormatter(a) {
      return `${
        Math.floor(a / 60) < 10 ? "0" + Math.floor(a / 60) : Math.floor(a / 60)
      } : ${
        Math.floor(a % 60) < 10 ? "0" + Math.floor(a % 60) : Math.floor(a % 60)
      }`;
    },

    //这里动态改变播放器的进度条和当前播放时间，缓冲成功获取总时长。
    updateCurrentTime() {
      this.currentTimes = this.audioEle.currentTime;
      if (this.durations != 0) {
        this.percentage = Math.floor(
          (this.currentTimes / this.durations) * 100
        );
      } else {
        this.percentage = 0;
      }
    },
    canplaythrough() {
      this.durations = this.audioEle.duration;
      this.isLoading = false;
      if (this.audioEle.paused == true) {
      } else {
        this.isPaused = false;
      }
    },
    waiting() {
      this.isLoading = true;
    },

    //这里是自定义播放器的控件
    restart() {
      this.audioEle.load();
      this.audioEle.play();
      // this.isPaused = false;
    },
    pause() {
      this.isPaused = !this.isPaused;
      if (this.isFirstClick == true) {
        this.audioEle.src = this.firstSrc;
        this.isFirstClick = false;
      }
      if (this.isPaused) {
        this.audioEle.pause();
        this.isLoading = false;
      } else {
        console.log("暂停点击", this.resourceAudioUrl, this.audioEle);
        this.audioEle.play();
      }
    },
    // 点击进度条
    changeProgress(e) {
      var proportion = e.offsetX / this.progressWidth;
      this.percentage = proportion * 100;
      if (this.isFirstClick != true) {
        this.audioEle.currentTime = proportion * this.audioEle.duration;
      }
      console.log(e.offsetX);
    },

    last() {
      if (this.audioIndex == 0) {
        this.$toast("小朋友，这是第一节哦");
      } else {
        this.audioIndex--;
        this.changeAudio();
      }
    },
    next() {
      if (this.audioIndex == this.audioList.length - 1) {
        this.$toast("小朋友，这是最后一节哦");
      } else {
        this.audioIndex++;
        this.changeAudio();
      }
    },

    // 这是列表点击事件
    changeAudioIndex(e, val) {
      this.audioIndex = val;
      this.changeAudio();
      console.log("列表点击", this.audioEle);
    },

    // 封装切换音频的函数
    changeAudio() {
      this.currentTimes = 0;
      this.durations = 0;
      this.isPaused = true;
      this.resourceAudioUrl = this.audioList[this.audioIndex].resourceAudioUrl;
      this.audioEle.src = this.resourceAudioUrl;
      this.audioEle.play();
      console.log(this.audioEle.readyState);
      console.log(this.resourceAudioUrl);
    }
  }
};
</script>
<style lang="scss">
.van-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -15px;
  margin-left: -15px;
}
.van-nav-bar {
  .van-nav-bar__left,
  .van-nav-bar__right {
    span {
      font-size: 15px;
      color: #ec6941;
      font-family: "SiYuanHeiTiJiuZiXing-Regular-2";
    }
  }
  .van-icon-arrow-left:before {
    content: "\F008";
    color: #ec6941;
  }
  .van-nav-bar__title {
    font-size: 17.5px;
    color: #232323;
    font-family: "SiYuanHeiTiJiuZiXing-Regular-2";
    font-weight: bold;
    // margin-left: 100px;
  }
}
</style>
<style lang='scss' scoped>
.audio-main {
  height: 100%;
  .banner {
    height: 210px;
    width: 100%;
    background-color: #ffffff;
    .info {
      height: 150px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .record {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .record-c {
          width: 120px;
          height: 120px;
          background-color: #232323;
          box-shadow: 0px 0px 2px 1px #232323;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          .red {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            // background-color: #c20c0c;
            background-color: #ec6941;
          }
          img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            &.rot {
              animation: rotate 12s linear infinite normal;
            }
          }
        }
      }
      .detail {
        width: 50%;
        height: 85%;
        margin-top: 15px;
        p {
          margin: 10px 0;
          margin-left: 20px;
          color: #ec6941;
          font-size: 15px;
          font-family: "SiYuanHeiTiJiuZiXing-Regular-2";
          text-align: left;
        }
        .detail-c {
          width: 100%;
          height: 80px;
          .logo {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 84px;
              height: 58px;
            }
          }
        }
      }
    }
    .controller {
      display: flex;
      width: 100%;
      height: 50px;
      .controller-c {
        width: 50%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
        padding: 0 15px;
        div {
          width: 20px;
          height: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .controller-r {
        width: 50%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        padding-right: 15px;
        .line {
          width: 70%;
        }
        .time {
          position: absolute;
          bottom: -2px;
          left: 12px;
          width: 70%;
          display: flex;
          justify-content: space-between;
        }
        .restart {
          width: 20px;
          height: 20px;
          img {
            width: 100%;
            height: 100%;
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
          font-family: "SiYuanHeiTiJiuZiXing-Regular-2";
          font-size: 17px;
          text-align: left;
          width: 80%; // 文本超出的处理
          overflow: hidden; //以下三者、缺一不可
          white-space: nowrap; //单行
          text-overflow: ellipsis;
          span {
            color: #999999;
            margin: auto 10px;
          }
          img {
            vertical-align: text-bottom;
            width: 20px;
            height: 20px;
            margin: auto 10px;
          }
        }
        &.active div {
          color: #19caad;
        }
      }
    }
  }
}

/*定义record旋转动画*/
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>