<template>
  <div v-loading="loading">
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
    <!--玩家昵称-->
    <h1 style="font-size: 30px;padding: 20px 0">{{playName}}</h1>
    <!--个人数据卡片-->
    <div style="background: #ECECEC; padding: 10px" v-if="this.playName">
      <a-row :gutter="10">
        <a-col :span="6" >
          <a-card :hoverable='true'>
            <template slot="title" class="cardTitle">
              <img src="~@/assets/icon_trophy_medium.png" alt="" style="width: 20px;">
              <span>奖杯数</span>
            </template>
            <a-statistic
                :value="trophies"
                :value-style="{ color: '#cf1322', fontSize: '40px' }"
            >
              <template #prefix>
                <a-icon :type="trophies > highestTrophies? 'arrow-up': 'arrow-down'" style="font-size: 0.5em;"/>
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card>
            <template slot="title" class="cardTitle">
              <img src="~@/assets/icon_trophy_medium.png" alt="" style="width: 20px;">
              <span>最高奖杯数</span>
            </template>
            <a-statistic
                :value="highestTrophies"
                :value-style="{ color: '#cf1322', fontSize: '40px' }"
            >
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card>
            <template slot="title" class="cardTitle">
              <!--<img src="~@/assets/icon_trophy_medium.png" alt="" style="width: 20px;">-->
              <span>等级</span>
            </template>
            <a-statistic
                :value="expLevel"
                :value-style="{ color: '#cf1322', fontSize: '40px' }"
            >
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card>
            <template slot="title" class="cardTitle">
              <!--<img src="~@/assets/icon_trophy_medium.png" alt="" style="width: 20px;">-->
              <span>是否符合冠军挑战赛资格</span>
            </template>
            <a-statistic
                :value="isQualifiedFromChampionshipChallenge?'是':'否'"
                :value-style="{ color: '#cf1322', fontSize: '40px' }"
            >
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="10" style="margin-top: 10px">
        <a-col :span="8">
          <a-card>
            <template slot="title" class="cardTitle">
              <!--<img src="~@/assets/icon_trophy_medium.png" alt="" style="width: 20px;">-->
              <span>3V3胜场</span>
            </template>
            <a-statistic
                :value="threeVsthreeVictories"
                :value-style="{ color: '#cf1322', fontSize: '40px' }"
            >
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card>
            <template slot="title" class="cardTitle">
              <!--<img src="~@/assets/icon_trophy_medium.png" alt="" style="width: 20px;">-->
              <span>单鸡胜场</span>
            </template>
            <a-statistic
                :value="soloVictories"
                :value-style="{ color: '#cf1322', fontSize: '40px' }"
            >
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card>
            <template slot="title" class="cardTitle">
              <!--<img src="~@/assets/icon_trophy_medium.png" alt="" style="width: 20px;">-->
              <span>双鸡胜场</span>
            </template>
            <a-statistic
                :value="duoVictories"
                :value-style="{ color: '#cf1322', fontSize: '40px' }"
            >
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="10" style="margin-top: 10px">
        <a-col :span="24">
          <a-card>
            <template slot="title" class="cardTitle">
              <span>战队</span>
            </template>
            <a-statistic
                :value="club"
                :value-style="{ color: '#cf1322', fontSize: '40px' }"
            >
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </div>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BSPersonalCard",
  data(){
    return{
      loading: false,
      searchInput: '',  //标签搜索框
      playerInfo: {},
      playName: '', //玩家昵称
      trophies: '', //奖杯数
      highestTrophies: '', //最高奖杯数
      expLevel: '',  //等级
      isQualifiedFromChampionshipChallenge: '',
      threeVsthreeVictories: '',
      soloVictories: '',
      duoVictories: '',
      club: ''
    }
  },
  methods: {
    //输入框输入字符转大写
    upperCase(){
      this.searchInput = this.searchInput.toUpperCase()
    },
    //获取个人信息数据
    onSearch(){
      if(this.searchInput === ''){
        alert('请输入玩家标签')
      }
      else{
        this.loading = true
        axios({
          methods: 'GET',
          url: '/playStatsApi/' + this.searchInput,
        }).then((res) => {
          this.playName = res.data.name
          this.trophies = res.data.trophies
          this.highestTrophies = res.data.highestTrophies
          this.expLevel = res.data.expLevel
          this.isQualifiedFromChampionshipChallenge = res.data.isQualifiedFromChampionshipChallenge
          this.threeVsthreeVictories = res.data['3vs3Victories']
          this.soloVictories = res.data.soloVictories
          this.duoVictories = res.data.duoVictories
          this.club = res.data.club.name
          this.loading = false
        })
      }
    }
  }
}
</script>

<style>
/*数据卡片标题*/
.cardTitle{
  padding: 5px 0;
}
.cardTitle span{
  font-size: 30px !important;
}
</style>
