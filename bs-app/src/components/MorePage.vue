<template>
  <div class="mainContainer">

    <van-row>
      <van-col span="12">
        <!--@click="$router.push('/recordList')"-->
        <a-card style="width: 43vw" class="card joinUsCard">
          <i class="iconfont icon-paixingbang cardIcon"></i>
          <h2 style="margin-bottom: 0">排行榜</h2>
          <div>维护中...</div>
        </a-card>
      </van-col>
      <van-col span="12">
        <a-card style="width: 43vw;float: right" class="card joinUsCard" @click="$router.push('/events')">
          <i class="iconfont icon-mingxinghuodong cardIcon"></i>
          <h2>天梯活动</h2>
        </a-card>
      </van-col>
    </van-row>


    <a-card class="card" @click="$router.push('/clubSearch')">
      <i class="iconfont icon-sousuo1 cardIcon"></i>
      <h2>战队查询</h2>
    </a-card>

    <a-card class="card" @click="$router.push('/skins')">
      <img class="cardIcon1" src="@/assets/衣架.svg" alt="">
      <h2>皮肤图鉴</h2>
    </a-card>

    <a-card class="card joinUsCard" @click="$router.push('/joinUs')">
      <img src="../assets/club_icon.png" alt="" class="clubIcon">
      <h2>加入我们</h2>
    </a-card>

    <van-cell-group style="border: 1px solid rgb(245,246,247);">
      <!--@click="popUpShow = true"-->
      <a href="https://www.tapechat.net/uu/6CL6M5/QW3O5XXP?uid=5779398">
        <van-cell title="问题反馈" is-link size="large" />
      </a>
      <van-cell title="更新日志" is-link size="large" @click="toUpdateInfo"/>
      <van-cell title="支持赞助" is-link size="large" @click="toSupport"/>
      <a href="http://prepan.top/download/latest.apk">
        <van-cell title="游戏下载" :label="version" is-link size="large"/>
      </a>
    </van-cell-group>

    <van-popup v-model="popUpShow" position="bottom">
      <iframe src='https://www.wjx.cn/vj/QPaihGI.aspx?width=760&source=iframe&s=t' width='100%' height='330' frameborder='0' style='overflow:auto' scrolling="no"></iframe>
    </van-popup>

    <div style="height: 10vh">

    </div>
  </div>
</template>

<script>
export default {
  name: "MorePage",
  data(){
    return{
      popUpShow: false,
      version: '更新日期：6/29 | 版本：44.226'
    }
  },
  methods: {
    toWeb(){
      window.open('http://prepan.top/')
    },
    toUpdateInfo(){
      this.$router.push('/updateInfo')
    },
    toSupport(){
      this.$router.push('/support')
    }
  }
}
</script>

<style scoped>
@import "https://at.alicdn.com/t/font_3113095_oiqkgv81nz.css";
.mainContainer{
  width: 90vw;
  margin: 3vh auto 0 auto;
}
.card{
  height: 24vh;
  width: 90vw;
  margin-bottom: 2vh;
  text-align: center;
  box-shadow: 0 0 5px 1px rgba(232,232,232,0.8);
}
.joinUsCard img{
  width: 14vw;
  margin-bottom: 20px;
  margin-top: 20px;
}
.card h2{
  font-family: 黑体, serif;
  font-weight: bold;
  font-size: 1.8em;
}
.cardIcon{
  font-size: 16vw;
  color: rgba(15,91,228,0.8);
  font-weight: bold;
}
.cardIcon1{
  width: 17vw;
  margin-top: 1vh;
  margin-bottom: 2vh;
}

</style>
