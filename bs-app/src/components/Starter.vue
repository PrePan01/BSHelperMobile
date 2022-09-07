<template>
  <div class="mainContainer">

    <a-alert
        message="提示！"
        description="此站为移动端小助手，请使用手机或竖屏访问噢！"
        type="warning"
        v-if="showSizeWarning"
        show-icon
        class="sizeWarning"
    />

    <van-dialog v-model="showNewFn" title="新功能出现！" width="300px" confirmButtonText="我知道啦" confirmButtonColor="#0252CD" @closed="closeDialog()">
      <div style="margin: 10px auto;width: 290px;text-align: center">
        <img :src="require('../assets/newfn.png')" alt="" width="280px">
        <div style="width: 240px;margin: 10px auto;font-size: 14px">
          <div>现在可以查看距上次查询后的奖杯数、胜场数等数据的变化了！</div>
          <div>上次查询时间可在个人数据首页最底部查看！</div>
        </div>
      </div>
    </van-dialog>

    <div style="text-align: center;">
      <van-notice-bar
          background="#FFF"
          left-icon="volume-o"
          scrollable
          text="皮肤图鉴模块正式上线，欢迎点击皮肤下方铅笔按钮共同维护最新史低价格数据，详情请查看【更多】-【皮肤图鉴】！"
      />
      <img :src="require('../assets/startlogo.png')" alt="" style="width: 80vw;margin: 0 0 -5vh 10vw">
    </div>
    <div></div>
    <div>
      <!--搜索框-->
      <a-input-search
          class="input"
          placeholder="请输入玩家标签(无需#)"
          enter-button="搜索"
          size="large"
          @search="onSearch"
          prefix="#"
      />
      <div style="margin-top: 10px">
        <p style="text-align: center"  v-if="historySearch !== null">你是否想要搜索：
          <span @click="searchHistory" style="color: lightblue">{{ historySearch }}</span>
        </p>
      </div>
    </div>
    <a-button-group size="large">
      <a-button  @click="showStarter">
        直接进入
      </a-button>
      <a-button  @click="toUpdateInfo">
        公告&更新日志
      </a-button>
    </a-button-group>

  </div>
</template>

<script>
export default {
  name: "Starter",
  data(){
    return{
      historySearch: '',
      showNewFn: false,
      showSizeWarning: false
    }
  },
  methods: {
    onSearch(value){
      localStorage.setItem('historySearch', value)
      this.$bus.$emit('onSearch', value)
      this.$bus.$emit('showStarter', false)
    },
    showStarter(){
      this.$bus.$emit('showStarter', false)
    },
    searchHistory(){
      this.$bus.$emit('onSearch', this.historySearch)
      this.$bus.$emit('showStarter', false)
    },
    toUpdateInfo(){
      this.$router.push('/updateInfo')
    },
    //关闭新功能弹窗
    closeDialog(){
      localStorage.setItem('newFn', 'shown')
    },
    openBanner(){
      window.open('https://mp.weixin.qq.com/s/FTq1u4RbaEr1-eg0COi54w')
    }
  },
  mounted(){
    this.historySearch = localStorage.getItem('historySearch')
    this.showNewFn = localStorage.getItem('newFn') !== 'shown'
    if(window.screen.width > window.screen.height) {
      this.showSizeWarning = true
    }
  }
}
</script>

<style scoped>
@import "https://at.alicdn.com/t/font_3113095_b2o4zd16cko.css";
img{
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
.mainContainer{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.input{
  width: 80vw;
}
.title{
  color: rgb(2,82,205);
  font-weight: bold;
  font-family: 黑体,serif;
}
.sizeWarning {
  position: absolute;
  top: 10vh;
  z-index: 100;
}
</style>
<style>

</style>
