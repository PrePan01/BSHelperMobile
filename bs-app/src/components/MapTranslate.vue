<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="地图翻译"
        @back="onClickLeft"
        subTitle="点击右上角笔图标即可编辑"
    />
    <div class="mainContainer">
      <iframe src="https://www.wolai.com/fwszr8chvheyYNJ7NBXSZi" frameborder="0" height="100%" width="100%"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapTranslate",
  methods: {
    onClickLeft(){
      this.$router.push('/')
      this.$bus.$emit('tabberActive', 1)
    },
  }
}
</script>

<style scoped>
.mainContainer{
  width: 100vw;
  height: 90vh;
}
</style>
