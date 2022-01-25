<template>
  <div class="container">
    <div class="downNow">
      <!--下载卡片-->
      <div class="downCard">
        <img src="~@/assets/android.svg" alt="" style="width: 200px;margin-left: 60px">
        <div class="downCardRight">
          <a href="http://prepan.top/download/helper0.2b4.apk">
            <i class="iconfont icon-xiazai" style="font-size: 55px"></i>
          </a>
          <h3>
            更新时间：22/01/24
          </h3>
        </div>
      </div>
      <!--历史版本-->
      <a-collapse accordion>
        <a-collapse-panel key="1" header="历史版本">
          <p>暂无</p>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "Download"
}
</script>

<style scoped>
@import "//at.alicdn.com/t/font_3113095_yku6kidtyc.css";
.container{
  display: flex;
  justify-content: center;
}
.downNow{
  width: 40vw;
}
.downCard{
  display: flex;
  height: 40vh;
  margin: 10vh 0 5vh 0;
  border: 1.5px solid rgb(218,218,218);
  align-items: center;
  background-color: rgb(250,250,250);
}
.downCardRight{
  margin: 0 auto;
  text-align: center;
}
</style>
