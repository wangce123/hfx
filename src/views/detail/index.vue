<!--  -->
<template>
  <div class="detail-main">
    <!-- 此页没用 -->
  </div>
</template>

<script>
import audioApi from "@/api/mediaApi.js"
export default {
  name: "detail",
  data() {
    return {
      queryId: 0,
      queryType: 0
    };
  },

  computed: {},

  methods: {
    init(){
      audioApi.register({
        page:1,
        rows:999,
        cd_id:9
      }).then(res =>{
        console.log(res)
      })
    }
  },
  created() {
    this.init()
  }
};
</script>
<style lang='scss' scoped>
.detail-main {
  height: 100%;
  width: 100%;
  position: relative;
  .back {
    position: absolute;
    top: 50px;
    left: -5px;
    transition: all 0.5s ease;
    height: 30px;
    width: 55px;
    background-color: #e6e6e6;
    color: #1cce1a;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    border-radius: 8px;
  }
  .nav {
    height: 50px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    a {
      color: black;
      font-size: 16px;
      display: inline-block;
      width: 50%;
      height: 100%;
      line-height: 50px;
      text-align: center;
      background-color: #f7f7f7;
      box-sizing: border-box;
      &:first-child {
        border-right: 1px solid #cccccc;
      }
      &:last-child {
        border-left: 1px solid #cccccc;
      }
      &.router-link-active {
        background-color: #fff;
        border-top: 2px solid #d13030;
      }
    }
  }
  .router-view {
    width: 100%;
  }
}
</style>