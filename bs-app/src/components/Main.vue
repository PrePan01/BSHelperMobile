<template>
  <div>
    <Starter class="starter" v-show="showStarter"></Starter>
    <!--<van-notice-bar
        left-icon="warning"
        text="接口维护中！若战绩查询失败（未找到玩家）请稍后再试！"
    />-->
    <div v-show="tabberActive !== 2">
      <!--搜索框-->
      <van-search
          v-model="searchValue"
          placeholder="请输入玩家标签 (无需#)"
          input-align="center"
          @search="search"
          background="#3976E3"
          clear-trigger="always"

      />
      <!--历史搜索-->
      <div style="text-align: center;margin-top: 5px"  v-if="historySearch !== null && searchValue === ''">你是否想要搜索：
        <span @click="searchHistory" style="color: lightblue">{{ historySearch }}</span>
      </div>
    </div>
    <!--加载遮罩-->
    <van-overlay :show="showOverlay" z-index="100">
      <div class="wrapper">
        <van-loading color="#1989fa" />
      </div>
    </van-overlay>
    <PersonalCard v-show="tabberActive === 0"></PersonalCard>
    <RecentEvents v-show="tabberActive === 1"></RecentEvents>
    <MorePage v-show="tabberActive === 2"></MorePage>
    <!--底部导航-->
    <van-tabbar v-model="tabberActive">
      <van-tabbar-item icon="contact">个人名片</van-tabbar-item>
      <van-tabbar-item icon="underway-o">最近对战</van-tabbar-item>
      <van-tabbar-item icon="add-o">更多</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import axios from 'axios'
import PersonalCard from '@/components/PersonalCard'
import RecentEvents from "@/components/RecentEvents";
import MorePage from "@/components/MorePage";
import Starter from "@/components/Starter";
import { Notify } from 'vant';

export default {
  name: 'Main',
  components: {
    PersonalCard, RecentEvents, MorePage, Starter
  },
  data() {
    return {
      tabberActive: 0, //激活的标签页
      searchValue: '', //搜索框
      personalData: {},
      battleLogs: [],
      showOverlay: false,
      historySearch:'',
      showStarter: true
    }
  },
  methods: {
    sendSearch() {
      axios({
        methods: 'GET',
        url: '/playStatsApi/' + this.searchValue,
      }).then((res) => {
        if(res.data.message === '404 Not Found'){
          alert('未搜索到玩家')
          this.showOverlay = false
        }
        else{
          this.personalData = res.data
          this.$bus.$emit('PersonalData',res.data)
          this.$bus.$emit('PersonalTrophies',res.data.trophies)
          this.$bus.$emit('PersonalBrawlers',res.data.brawlers)
          axios({
            methods: 'GET',
            url: '/playStatsApi/v1/battlelog/' + this.searchValue,
          }).then((res) => {
            this.battleLogs = res.data.items
            this.$bus.$emit('myName',this.personalData.name)
            this.$bus.$emit('BattleLogs',this.battleLogs)
            this.showOverlay = false
          }).catch((err) => {
            console.log(err)
            Notify({ type: 'danger', message: '战绩列表查询失败，请刷新重试' });
            this.showOverlay = false
          })
        }
      }).catch((err) => {
        if(err.response.status === 500){
          Notify({ type: 'danger', message: '出现异常，请刷新重试(500)' });
        }
        else if(err.response.status === 404){
          Notify({ type: 'danger', message: '接口出错，请稍后重试(404)' });
        }
        else{
          Notify({ type: 'danger', message: '查询失败，请刷新重试，或稍后再试' });
        }
        this.showOverlay = false
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
    this.$bus.$on('tabberActive', (data) => {
      this.tabberActive = data
    })
    this.$bus.$on('showStarter', (data) => {
      this.showStarter = data
    })
    this.$bus.$on('onSearch', (data) => {
      this.searchValue = data
      this.showOverlay = true
      this.sendSearch()
    })
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
.starter{
  z-index: 65535;
  position: absolute;
  width: 100vw;
  height: 100%;
  background-color: #fff;
}
</style>
