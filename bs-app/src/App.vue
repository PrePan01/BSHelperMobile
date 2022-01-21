<template>
  <div id="app">
    <!--搜索框-->
    <van-search
        v-model="searchValue"
        shape="round"
        placeholder="请输入玩家标签(无需#)"
        input-align="center"
        @search="search"
    />
    <p style="text-align: center"  v-if="historySearch !== null && searchValue === ''">你是否想要搜索：
      <span @click="searchHistory" style="color: lightblue">{{ historySearch }}</span>
    </p>
    <van-overlay :show="showOverlay" z-index="100">
      <div class="wrapper">
        <van-loading color="#1989fa" />
      </div>
    </van-overlay>
    <PersonalCard v-show="tabberActive === 0"></PersonalCard>
    <recentEvents v-show="tabberActive === 1"></recentEvents>
    <!--底部导航-->
    <van-tabbar v-model="tabberActive">
      <van-tabbar-item icon="contact">个人名片</van-tabbar-item>
      <van-tabbar-item icon="underway-o">最近对战</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import axios from 'axios'
import PersonalCard from '@/components/PersonalCard'
import recentEvents from "@/components/recentEvents";

export default {
  name: 'App',
  components: {
    PersonalCard,recentEvents
  },
  data() {
    return {
      tabberActive: 0, //激活的标签页
      searchValue: '', //搜索框
      personalData: {},
      battleLogs: [],
      showOverlay: false,
      historySearch:''
    }
  },
  methods: {
    sendSearch() {
      axios({
        methods: 'GET',
        url: 'https://cr.is-a.dev/' + this.searchValue,
      }).then((res) => {
        this.personalData = res.data
        this.$bus.$emit('PersonalData',res.data)
        this.$bus.$emit('PersonalBrawlers',res.data.brawlers)
        axios({
          methods: 'GET',
          url: 'https://cr.is-a.dev/v1/battlelog/' + this.searchValue,
        }).then((res) => {
          this.battleLogs = res.data.items
          this.$bus.$emit('myName',this.personalData.name)
          this.$bus.$emit('BattleLogs',this.battleLogs)
          this.showOverlay = false
        })
      })
    },
    //个人信息数据
    search(){
      this.showOverlay = true
      this.sendSearch()
      localStorage.setItem('historySearch', this.searchValue)
    },
    searchHistory(){
      this.searchValue = this.historySearch
      this.showOverlay = true
      this.sendSearch()
    }
  },
  mounted(){
    this.historySearch = localStorage.getItem('historySearch')
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
