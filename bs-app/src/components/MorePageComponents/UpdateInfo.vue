<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="更新日志"
      @back="onClickLeft"
    />
    <div class="mainContainer">
      <iframe src="https://www.wolai.com/dcq38esZ4mkBvuKPMnQMKz" frameborder="0" height="100%" width="100%"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateInfo",
  methods: {
    onClickLeft(){
      this.$router.push('/')
      this.$bus.$emit('tabberActive', 2)
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
