<template>
  <div class="progress" :style="{width : width+'px',height : height +'px'}">
    <div class="progress_item" :style="{width:percentage+'%',backgroundColor:color}"></div>
  </div>
</template>
 
<script>
export default {
  name: "Progress",
  data() {
    return {};
  },
  props: {
    width: Number,
    height: Number,
    percentage: Number,
    color:String
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.progress {
  background-color: #ebeef5;
  border-radius: 80px;
  overflow: hidden;
  .progress_item {
    height: 100%;
    border-radius: 80px;
  }
}
</style>