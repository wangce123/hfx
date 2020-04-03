<template>
  <div class>
    <Progress
      ref="pg"
      class="line"
      :width="300"
      :height="30"
      :color="'#19caad'"
      :percentage="percentage"
      v-on="$listeners"
      @touchstart.native="touchstart"
      @touchmove.native="touchmove"
    ></Progress>
  </div>
</template>
 
<script>
import Progress from "../views/detail/component/Progress";
export default {
  name: "vueName",
  components: {
    Progress
  },
  data() {
    return {
      percentage: 0
    };
  },
  mounted() {
    console.log(this.$refs.pg);
  },
  methods: {
    touchstart(e) {
      var line = document.querySelector(".line")
      console.log(line.offsetLeft);
      console.log(this.$refs.pg);
      console.log(
        "touchstart",
        (e.touches[0].clientX / this.$refs.pg.width) * 100
      );
      this.percentage = (e.touches[0].clientX / this.$refs.pg.width) * 100;
    },
    touchmove(e) {
      console.log(
        "touchmove",
        (e.touches[0].clientX / this.$refs.pg.width) * 100
      );
      this.percentage = (e.touches[0].clientX / this.$refs.pg.width) * 100;
    }
  }
};
</script>
 
<style lang="scss" scoped>
.line {
  margin-left: 20px;
}
</style>