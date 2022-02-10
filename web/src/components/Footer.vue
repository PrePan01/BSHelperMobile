<template>
  <div class="footerContainer">
    <img src="@/assets/备案图标.png" alt="" style="width: 16px;margin: 0 3px 2px 0">
    <div style="display: inline-block;margin-right: 20px;">
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45030302000234" target="_Blank" style="color:#939393;">桂公网安备 45030302000234号</a>
    </div>
    <a href="http://beian.miit.gov.cn/" target="_Blank" style=" color:#939393;">桂ICP备2022000505</a>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.footerContainer{
  width: 100%;
  background-color: rgb(0,21,41);
  text-align: center;
  text-decoration: none;
  height: 30px;
  line-height: 30px;
}
</style>
