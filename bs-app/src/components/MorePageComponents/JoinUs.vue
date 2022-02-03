<template>
  <div>
    <!--标题头-->
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="加入我们"
        @back="onClickLeft"
    />

    <img src="@/assets/joinUs.png" alt="" width="100%">

    <div style="text-align: center">
      <van-button plain type="info" block class="joinBtn" @click="joinGlobal">加入国际服战队</van-button>
      <van-button plain type="info" block class="joinBtn" @click="joinCn1">加入国服一队</van-button>
      <van-button plain type="info" block class="joinBtn" @click="joinCn2">加入国服二队</van-button>
      <van-button plain type="info" block class="joinBtn joinGroupBtn" data-clipboard-text = '957189136' @click="copyGroupNum">复制群号</van-button>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  name: "JoinUs",
  methods:{
    onClickLeft(){
      this.$router.push('/')
      this.$bus.$emit('tabberActive', 2)
    },
    copyGroupNum(){
      new Clipboard('.joinGroupBtn')
      this.$notify({ type: 'success', message: '复制成功！' });
    },
    joinGlobal(){
      window.open('https://link.brawlstars.com/invite/band/cn?tag=RQV28LYC&token=ntnymehk')
    },
    joinCn1(){
      this.$notify({ type: 'warning', message: '暂时满人，请先加群！' });
    },
    joinCn2(){
      window.open('https://link.brawlstars.cn/invite/band/cn?tag=RGYR2C2&token=p2jfe4w9&platform=android&pub=yoozoo&bundle=com.youzu.bs')
    }
  }
}
</script>

<style scoped>
img{
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
.joinBtn{
  width: 80vw;
  margin: 5vh auto;
}
</style>
