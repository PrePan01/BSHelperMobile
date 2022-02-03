<template>
  <div class="mainContainer">
    <a-card class="card joinUsCard" @click="toJoinUs">
      <img src="../assets/club_icon.png" alt="" class="clubIcon">
      <h2>加入我们</h2>
    </a-card>

    <a-card class="card" @click="toWeb">
      <div style="padding-bottom: 8px">
        <i class="iconfont icon-fangwenguanwang" style="font-size: 17vw; color: cornflowerblue; font-weight: bold;"></i>
      </div>
      <h2>前往官网</h2>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "MorePage",
  methods: {
    toJoinUs(){
      this.$router.push('/joinUs')
    },
    toWeb(){
      window.open('http://prepan.top/')
    }
  }
}
</script>

<style scoped>
@import "//at.alicdn.com/t/font_3113095_9pnbf7aak8l.css";
.mainContainer{
  width: 90vw;
  margin: 15vh auto 0 auto;
}
.card{
  width: 90vw;
  margin-bottom: 10vh;
  text-align: center;
  box-shadow: 0 0 5px 1px rgba(232,232,232,0.8);
}
.joinUsCard img{
  width: 15vw;
  margin-bottom: 20px;
  margin-top: 20px;
}
.card h2{
  font-family: 黑体, serif;
  font-weight: bold;
  font-size: 2em;
}

</style>
