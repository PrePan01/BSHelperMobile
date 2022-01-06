<template>
  <div>
    <!--标签搜索框-->
    <div>
      <a-input-search
          prefix="#"
          placeholder="请输入个人标签"
          enter-button="查询"
          size="large"
          @search="onSearch"
          v-model="searchInput"
          style="width: 20vw;"
          @keyup="upperCase"
      />
    </div>

    <h1>{{playName}}</h1>
    <!--个人数据卡片-->
    <a-card style="width: 70vw">

    </a-card>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BSPersonalCard",
  data(){
    return{
      searchInput: '',  //标签搜索框
      playerInfo: {},
      playName: ''
    }
  },
  methods: {
    //输入框输入字符转大写
    upperCase(){
      this.searchInput = this.searchInput.toUpperCase()
    },
    //获取个人信息数据
    onSearch(){
      axios({
        methods: 'GET',
        url: '/playStatsApi/' + this.searchInput,
      }).then((res) => {
        this.playName = res.data.name

        console.log(this.playerInfo)
      })
    }
  }
}
</script>

<style scoped>

</style>
