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
          style="width: 50vw;"
          @keyup="upperCase"
      />
    </div>
    <!--玩家昵称-->
    <h1 style="font-size: 35px;margin: 20px 0 10px 0">{{playName}}</h1>
    <!--数据表格-->
    <el-tabs v-if="this.playName" >
      <el-tab-pane label="个人数据">
        <!--个人数据卡片-->
        <div style="background: #ECECEC; padding: 10px">
          <!--第一行-->
          <a-row :gutter="10">
            <!--奖杯数-->
            <a-col :span="6" >
              <a-card :hoverable='true'>
                <template slot="title">
                  <div class="cardTitle">
                    <img src="~@/assets/icon_trophy_medium.png" alt="" style="height: 40px;">
                    <span>奖杯数</span>
                  </div>
                </template>
                <a-statistic
                    :value="trophies"
                    :value-style="{ color: '#cf1322', fontSize: '40px' }"
                >
                  <template #suffix>
                    <a-icon :type="trophies < highestTrophies? 'arrow-down' : 'arrow-up'" style="font-size: 1.4em;"/>
                    <span style="font-size: 1.4em">({{ highestTrophies - trophies  }})</span>
                  </template>
                </a-statistic>
              </a-card>
            </a-col>
            <!--最高奖杯数-->
            <a-col :span="6">
              <a-card :hoverable='true'>
                <template slot="title">
                  <div class="cardTitle">
                    <img src="~@/assets/icon_trophy_medium.png" alt="" style="height: 40px;">
                    <span>最高奖杯数</span>
                  </div>
                </template>
                <a-statistic
                    :value="highestTrophies"
                    :value-style="{ color: '#cf1322', fontSize: '40px' }"
                >
                </a-statistic>
              </a-card>
            </a-col>
            <!--等级-->
            <a-col :span="6">
              <a-card :hoverable='true'>
                <template slot="title">
                  <div class="cardTitle">
                    <img src="~@/assets/icon_player_level.png" alt="" style="height: 40px;">
                    <span>等级</span>
                  </div>
                </template>
                <a-statistic
                    :value="expLevel"
                    :value-style="{ color: '#cf1322', fontSize: '40px' }"
                >
                </a-statistic>
              </a-card>
            </a-col>
            <!--是否符合冠军挑战赛资格-->
            <a-col :span="6">
              <a-card :hoverable='true'>
                <template slot="title">
                  <div class="cardTitle">
                    <img src="~@/assets/icon_championship.png" alt="" style="height: 40px;">
                    <span>是否符合冠军挑战赛资格</span>
                  </div>
                </template>
                <a-statistic
                    :value="isQualifiedFromChampionshipChallenge?'是':'否'"
                    :value-style="{ color: '#cf1322', fontSize: '40px' }"
                >
                </a-statistic>
              </a-card>
            </a-col>
          </a-row>
          <!--第二行-->
          <a-row :gutter="10" style="margin-top: 10px">
            <!--3v3胜场-->
            <a-col :span="8">
              <a-card :hoverable='true'>
                <template slot="title">
                  <div class="cardTitle">
                    <img src="~@/assets/3vs3.png" alt="" style="height: 40px;">
                    <span>3V3胜场</span>
                  </div>
                </template>
                <a-statistic
                    :value="threeVsthreeVictories"
                    :value-style="{ color: '#cf1322', fontSize: '40px' }"
                >
                </a-statistic>
              </a-card>
            </a-col>
            <!--单鸡胜场-->
            <a-col :span="8">
              <a-card :hoverable='true'>
                <template slot="title">
                  <div class="cardTitle">
                    <img src="~@/assets/Vector Smart Object-7.png" alt="" style="height: 40px;">
                    <span>单鸡胜场</span>
                  </div>
                </template>
                <a-statistic
                    :value="soloVictories"
                    :value-style="{ color: '#cf1322', fontSize: '40px' }"
                >
                </a-statistic>
              </a-card>
            </a-col>
            <!--双鸡胜场-->
            <a-col :span="8">
              <a-card :hoverable='true'>
                <template slot="title">
                  <div class="cardTitle">
                    <img src="~@/assets/icon_showdownplus.png" alt="" style="height: 40px;">
                    <span>双鸡胜场</span>
                  </div>
                </template>
                <a-statistic
                    :value="duoVictories"
                    :value-style="{ color: '#cf1322', fontSize: '40px' }"
                >
                </a-statistic>
              </a-card>
            </a-col>
          </a-row>
          <!--第三行-->
          <a-row :gutter="10" style="margin-top: 10px">
            <a-col :span="24">
              <a-card :hoverable='true'>
                <template slot="title">
                  <div class="cardTitle">
                    <img src="~@/assets/icon_club_league.png" alt=" "  style="height: 40px;">
                    <span>战队</span>
                  </div>
                </template>
                <a-statistic
                    :value="club+' ('+clubTag+')'"
                    :value-style="{ color: '#cf1322', fontSize: '40px' }"
                >
                </a-statistic>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的英雄">
        <el-table :data="[brawlers, myStarPowers, myGadgets]" height="850" border style="width: 100%">
          <el-table-column
              label="英雄"
              width="120">
              <template slot-scope="scope">
                <img :src="require('../../assets/brawlers/'+ scope.row.id +'.png')" alt="" width="60px">
              </template>
          </el-table-column>
          <el-table-column
              prop="power"
              label="战力等级"
              sortable
              width="140">
          </el-table-column>
          <el-table-column
              prop="rank"
              label="荣誉等级"
              sortable
              width="140">
          </el-table-column>
          <el-table-column
              prop="trophies"
              label="奖杯数"
              sortable
              width="160">
          </el-table-column>
          <el-table-column
              prop="highestTrophies"
              label="最高奖杯数"
              sortable
              width="160">
          </el-table-column>
          <el-table-column label="我的星辉之力">
            <el-table-column
                label="星辉一"
                width="120">
                <template slot-scope="scope">
                  <span>{{scope.row}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="starPowers[1].id"
                label="星辉二"
                width="120">
            </el-table-column>
          </el-table-column>
          <el-table-column label="我的武装配件">
            <el-table-column
                prop="gadgets[0].id"
                label="配件一"
                width="120">
            </el-table-column>
            <el-table-column
                prop="gadgets[1].id"
                label="配件二"
                width="120">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>



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
      club: '', //战队名
      clubTag: '',  //战队标签
      brawlers: [],  //我的所有英雄
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
          this.playName = '@' + res.data.name
          this.trophies = res.data.trophies
          this.highestTrophies = res.data.highestTrophies
          this.expLevel = res.data.expLevel
          this.isQualifiedFromChampionshipChallenge = res.data.isQualifiedFromChampionshipChallenge
          this.threeVsthreeVictories = res.data['3vs3Victories']
          this.soloVictories = res.data.soloVictories
          this.duoVictories = res.data.duoVictories
          this.club = res.data.club.name
          this.clubTag = res.data.club.tag
          this.brawlers = res.data.brawlers
          this.loading = false
        })
      }
    }
  }
}
</script>

<style>
/*解决图片缩小变模糊*/
img{
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
/*数据卡片标题*/
.cardTitle span{
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  font-family: '黑体',serif;
  font-size: 1.4em;
}
</style>
