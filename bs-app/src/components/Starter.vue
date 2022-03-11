<template>
  <div class="mainContainer">
    <div style="text-align: center;">
      <i class="iconfont icon-gongju-" style="font-size: 30vw;color: rgb(2,82,205)" ></i>
      <h1 class="title">战绩小助手</h1>
      <h3 class="title">（国际服）</h3>
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
        更新日志
      </a-button>
    </a-button-group>
  </div>
</template>

<script>
export default {
  name: "Starter",
  data(){
    return{
      historySearch: ''
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
    }
  },
  mounted(){
    this.historySearch = localStorage.getItem('historySearch')
  }
}
</script>

<style scoped>
@import "https://at.alicdn.com/t/font_3113095_b2o4zd16cko.css";
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
</style>
