<!--  -->
<template>
  <div class="audio-main" ontouchstart>
    <!-- 导航栏部分 -->
    <van-nav-bar
      :title="courseName"
      :left-text="$store.state.isAll == true? '返回' : ''"
      right-text="音频"
      :left-arrow="$store.state.isAll == true? true : false"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <!-- 播放器banner板块 -->
    <div class="banner">
      <!-- 播放信息 -->
      <div class="info">
        <div class="record">
          <div class="record-c">
            <img :src="audioList[audioIndex].songImg" :class="{rot : !isPaused}" alt />
          </div>
        </div>
        <div class="detail">
          <div class="detail-c">
            <div class="logo">
              <img src="@/assets/icon/elephant.png" alt />
            </div>
          </div>
          <!-- <p>
              歌手
              <span>{{$store.state.course.courseList[courseIndex].name}}</span>
          </p>-->
          <p>{{audioList[audioIndex].name}}</p>
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
        <audio @timeupdate="updateCurrentTime" @canplay="canplay" loop>
          Your browser does not support the audio element.
          <source :src="`${host}?id=${audioId}.mp3`" type="audio/mp3" />
        </audio>
      </div>
    </div>

    <!-- 以下是播放列表 -->
    <div class="wrapper">
      <div class="content">
        <ul class="songList">
          <li
            v-for="(item,index) in audioList"
            :key="item.id"
            :class="{active:index == audioIndex}"
            @click="changeAudioIndex($event,index)"
          >
            <div>
              <img v-if="index == audioIndex" src="@/assets/icon/voice.png" alt />
              <span v-else>{{index < 9 ? '0'+(index+1) : index+1}}</span>
              {{`${item.name}`}}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import BScroll from "better-scroll";
export default {
  name: "audio-main",
  data() {
    return {
      percentage: 0,
      currentTimes: 0,
      durations: 0,
      isPaused: true,
      host: "http://music.163.com/song/media/outer/url",
      courseIndex: 0,
      courseType: 0,
      audioIndex: 0,
      audioId: 385965
    };
  },
  computed: {
    ...mapState({
      courseName: function(state) {
        var index = this.courseIndex;
        return state.course.courseList[index].name;
      },
      audioList: function(state) {
        var index = this.courseIndex;
        return state.course.courseList[index].audioList;
      }
    }),
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
    this.courseIndex = this.$route.query.queryId;
    this.audioId = this.audioList[0].urlId;
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
    // 这里是tabbar点击事件
    onClickLeft() {
      this.$router.push("/course");
    },
    onClickRight() {
      this.$router.push({
        name: "video",
        query: {
          queryType: 1,
          queryId: this.courseIndex
        }
      });
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
      this.percentage = Math.floor((this.currentTimes / this.durations) * 100);
    },
    canplay() {
      this.durations = this.audioEle.duration;
    },

    //这里是自定义播放器的控件
    restart() {
      this.audioEle.load();
      this.audioEle.play();
      this.isPaused = false;
    },
    pause() {
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        this.audioEle.pause();
      } else {
        this.audioEle.play();
      }
    },
    changeProgress(e) {
      var proportion = e.offsetX / this.progressWidth;
      this.percentage = proportion * 100;
      this.audioEle.currentTime = proportion * this.audioEle.duration;
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
    },

    // 封装切换音频的函数
    changeAudio() {
      this.isPaused = true;
      this.audioId = this.audioList[this.audioIndex].urlId;
      this.audioEle.src = `${this.host}?id=${this.audioId}.mp3`;
      this.audioEle.play();
      console.log(this.audioEle.readyState);
      setTimeout(() => {
        this.isPaused = false;
      }, 100);
      console.log(this.audioId);
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
      color: #ec6941;
      font-family: "SourceHanSansBold";
    }
  }
  .van-icon-arrow-left:before {
    // content: "";
    // width: 20px;
    // height: 20px;
    // background: url("../../../assets/icon/back.png") no-repeat center;
    // background-size: 10px 16px;
    // background-position: top;
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
          font-family: "SourceHanSansBold";
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