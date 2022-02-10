<template>
  <div class="mainContainer">

    <a-card class="card joinUsCard" @click="$router.push('/recordList')">
      <i class="iconfont icon-paixingbang cardIcon"></i>
      <h2>排行榜</h2>
    </a-card>

    <a-card class="card" @click="$router.push('/clubSearch')">
      <div style="padding-bottom: 5px">
        <i class="iconfont icon-sousuo1 cardIcon"></i>
      </div>
      <h2>战队查询</h2>
    </a-card>

    <a-card class="card joinUsCard" @click="$router.push('/joinUs')">
      <img src="../assets/club_icon.png" alt="" class="clubIcon">
      <h2>加入我们</h2>
    </a-card>

    <van-cell-group style="border: 1px solid rgb(245,246,247);">
      <van-cell title="问题反馈" is-link size="large" @click="popUpShow = true"/>
      <van-cell title="更新日志" is-link size="large" @click="toUpdateInfo"/>
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
      popUpShow: false
    }
  },
  methods: {
    toWeb(){
      window.open('http://prepan.top/')
    },
    toUpdateInfo(){
      this.$router.push('/updateInfo')
    }
  }
}
</script>

<style scoped>
@import "https://at.alicdn.com/t/font_3113095_mbidod1e5qb.css";
.mainContainer{
  width: 90vw;
  margin: 3vh auto 0 auto;
}
.card{
  height: 25vh;
  width: 90vw;
  margin-bottom: 4vh;
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
  font-size: 2em;
}
.cardIcon{
  text-shadow: 0 3px 5px lightgray;
  font-size: 16vw;
  color: rgba(15,91,228,0.8);
  font-weight: bold;
}
</style>
