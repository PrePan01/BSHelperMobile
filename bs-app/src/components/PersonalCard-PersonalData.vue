<template>
  <div>
    <van-list>
      <!--id-->
      <van-divider :style="{color: 'rgb(26,82,197)', fontWeight: 'bold', marginTop: '4vh', fontSize: '2em'}">
        {{ personalData.name }}
      </van-divider>
      <div style="text-align: center">
        <h3 style="display: inline-block;text-align: center;color: rgb(26,82,197); font-size: 1.5em;margin-top: -5px">
          {{ showTag ===true? '('+personalData.tag+')': '*********' }}
        </h3>
        <i style="position: absolute;margin-left: 5px;" :class="{'iconfont':true, 'icon-yanjing_xianshi_o':showTag, 'icon-yanjing_yincang_o': !showTag}" @click="showTag = !showTag"></i>
      </div>
      <!--分栏-->
      <van-row>
        <!--左边列-->
        <van-col span="12">
          <van-cell>
            <!--奖杯数-->
            <a-statistic style="margin-top: 1vh" :suffix="trophiesChange === 0 ? '-' : trophiesChange > 0? '↑'+ trophiesChange : '↓'+trophiesChange" :value="personalData.trophies" valueStyle="color: rgb(254,208,53);font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/icon_trophy_medium.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">奖杯数</span>
                </div>
              </template>
            </a-statistic>
            <!--等级-->
            <a-statistic style="margin-top: 3vh" :value="personalData.expLevel" valueStyle="color: rgb(35,143,242);font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/icon_player_level.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">等级</span>
                </div>
              </template>
            </a-statistic>
            <!--单鸡胜场-->
            <a-statistic style="margin-top: 3vh" :suffix="soloChange === 0 ? '-' : soloChange > 0? '↑'+ soloChange : '↓'+soloChange" :value="personalData.soloVictories" valueStyle="color: rgb(35,143,242);font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/Vector Smart Object-7.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">单鸡胜场</span>
                </div>
              </template>
            </a-statistic>
            <!--15胜挑战-->
            <a-statistic style="margin-top: 3vh" :value="personalData.isQualifiedFromChampionshipChallenge === false? '×': '√'" valueStyle="color: rgb(35,143,242);font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/icon_championship.png" alt=""
                       style="height: 20px;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">15胜挑战</span>
                </div>
              </template>
            </a-statistic>
          </van-cell>
        </van-col>
        <!--右边列-->
        <van-col span="12">
          <van-cell>
            <!--最高奖杯数-->
            <a-statistic style="margin-top: 1vh" :value="personalData.highestTrophies" valueStyle="color: red;font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/icon_trophy_medium.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">最高奖杯数</span>
                </div>
              </template>
            </a-statistic>
            <!--3v3胜场-->
            <a-statistic style="margin-top: 3vh" :suffix="threeVsChange === 0 ? '-' : threeVsChange > 0? '↑'+ threeVsChange : '↓'+threeVsChange" :value="personalData['3vs3Victories']" valueStyle="color: rgb(35,143,242);font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/3vs3.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">3v3胜场</span>
                </div>
              </template>
            </a-statistic>
            <!--双鸡胜场-->
            <a-statistic style="margin-top: 3vh" :suffix="duoChange === 0 ? '-' : duoChange > 0? '↑' + duoChange : '↓' + duoChange" :value="personalData.duoVictories" valueStyle="color: rgb(35,143,242);font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/icon_showdownplus.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">双鸡胜场</span>
                </div>
              </template>
            </a-statistic>
            <!--荣誉等级-->
            <div class="rank">
              <span class="rankInfo" v-show="trophyRanks[0] !== 0">
                <img src="@/assets/icon_rank_1.png" alt="" class="rankImg">
                <div class="rankNum">{{trophyRanks[0]}}</div>
              </span>
              <span class="rankInfo" v-show="trophyRanks[1] !== 0">
                <img src="@/assets/icon_rank_2.png" alt="" class="rankImg">
                <div class="rankNum">{{trophyRanks[1]}}</div>
              </span>
              <span class="rankInfo" v-show="trophyRanks[2] !== 0">
                <img src="@/assets/icon_rank_3.png" alt="" class="rankImg">
                <div class="rankNum">{{trophyRanks[2]}}</div>
              </span>
              <span class="rankInfo" v-show="trophyRanks[3] !== 0">
                <img src="@/assets/icon_rank_4.png" alt="" class="rankImg">
                <div class="rankNum">{{trophyRanks[3]}}</div>
              </span>
              <span class="rankInfo" v-show="trophyRanks[4] !== 0">
                <img src="@/assets/icon_rank_5.png" alt="" class="rankImg">
                <div class="rankNum">{{trophyRanks[4]}}</div>
              </span>
              <span class="rankInfo" v-show="trophyRanks[5] !== 0">
                <img src="@/assets/icon_rank_6.png" alt="" class="rankImg">
                <div class="rankNum">{{trophyRanks[5]}}</div>
              </span>
              <span class="rankInfo" v-show="trophyRanks[6] !== 0">
                <img src="@/assets/icon_rank_7.png" alt="" class="rankImg">
                <div class="rankNum">{{trophyRanks[6]}}</div>
              </span>
              <span class="rankInfo" v-show="trophyRanks[7] !== 0">
                <img src="@/assets/icon_rank_8.png" alt="" class="rankImg">
                <div class="rankNum">{{trophyRanks[7]}}</div>
              </span>
            </div>
          </van-cell>
        </van-col>
      </van-row>
      <!--战队-->
      <van-cell>
        <a-statistic style="margin-top: 1vh" :suffix="'('+personalData.club.tag+')'" :value="personalData.club.name === undefined? '未加入战队': personalData.club.name" valueStyle="color: rgb(35,143,242);font-weight: bold;font-size: 1.8em">
          <template slot="title">
            <div>
              <img src="~@/assets/icon_club_league.png" alt=""
                   style="height: 3vh;vertical-align: middle;margin-right: 2vw"
              >
              <span style="font-size: 1.5em;vertical-align: middle;color: black;">战队</span>
            </div>
          </template>
        </a-statistic>
      </van-cell>
      <!--荣誉联赛结束后-->
      <van-cell>
        <h2 style="margin: 2vh 0 15px 0">
          本赛季荣誉联赛结束后
          <van-count-down v-if="countDown !== 0" style="display: inline-block" format="DD 天 HH 时 mm 分 ss 秒" :time="countDown" />
        </h2>
        <van-row>
          <van-col span="12">
            <a-statistic style="margin-top: 1vh" :value="trophyLeagueEnd[0]" :suffix="trophyLeagueEndNum" valueStyle="color: rgb(254,208,53);font-weight: bold;font-size: 1.8em">
              <template slot="title">
                <div>
              <span style="font-size: 1.5em;vertical-align: middle;color: black;">
                <img src="~@/assets/SeasonEndTrophies.png" alt=""
                     style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                >
                奖杯数
              </span>
                </div>
              </template>
            </a-statistic>
          </van-col>
          <van-col span="12">
            <a-statistic style="margin-top: 1vh" :value="trophyLeagueEnd[1]" valueStyle="color: rgb(254,76,251);font-weight: bold;font-size: 1.8em">
              <template slot="title">
                <div>
                  <img src="~@/assets/SeasonEndStarPoints.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">星光点数</span>
                </div>
              </template>
            </a-statistic>
          </van-col>
        </van-row>

      </van-cell>
    </van-list>
    <h3 style="text-align: center;margin: 10px auto; border: 1px solid rgb(245,246,247);width: 70vw;padding: 10px 0;"><b>上次查询</b><br>{{lastSearchTime}}</h3>
    <div style="height: 10vh"></div>
  </div>
</template>

<script>

// eslint-disable-next-line
import moment from "moment"
import 'moment/locale/zh-cn'

export default {
  name: "PersonalCard-PersonalData",
  data(){
    return{
      personalData: {},
      showTag: true,
      trophiesChange: 0,
      threeVsChange: 0,
      soloChange: 0,
      duoChange: 0,
      lastSearchTime: ''
    }
  },
  methods: {
    getDataChange(){
      let lastTrophies = localStorage.getItem('lastTrophies' + this.personalData.tag)
      let threeVsChange = localStorage.getItem('threeVsChange' + this.personalData.tag)
      let soloChange = localStorage.getItem('soloChange' + this.personalData.tag)
      let duoChange = localStorage.getItem('duoChange' + this.personalData.tag)
      if(lastTrophies === null){
        return
      }
      this.trophiesChange = this.personalData.trophies - lastTrophies
      this.threeVsChange = this.personalData['3vs3Victories'] - threeVsChange
      this.soloChange = this.personalData.soloVictories - soloChange
      this.duoChange = this.personalData.duoVictories - duoChange
    },
    getLastSearchTime(){
      let lastSearchTime = localStorage.getItem('lastSearchTime' + this.personalData.tag)
      if(lastSearchTime === null){
        this.lastSearchTime = '当前是第一次使用战绩小助手！'
        return
      }else{
        this.lastSearchTime = moment(lastSearchTime).fromNow() /*moment(Date.now() - parseInt(lastSearchTime)).format('YYYY-MM-DD HH:mm:ss')*/
      }
    }
  },
  mounted(){
    //接收个人信息数据
    this.$bus.$on('PersonalData', (data) => {
      this.getLastSearchTime()
      //上一次查询时间
      localStorage.setItem('lastSearchTime' + this.personalData.tag,moment())
      this.personalData = data
      this.getDataChange()
      localStorage.setItem('lastTrophies' + this.personalData.tag, this.personalData.trophies)
      localStorage.setItem('threeVsChange' + this.personalData.tag, this.personalData['3vs3Victories'])
      localStorage.setItem('soloChange' + this.personalData.tag, this.personalData.soloVictories)
      localStorage.setItem('duoChange' + this.personalData.tag, this.personalData.duoVictories)
    })
  },
  computed:{
    trophyLeagueEnd: {
      get(){
        let trophyLeagueEndTrophy = 0
        let starPoints = 0
        for(let brawlersNo in this.personalData.brawlers){
          let trophies = this.personalData.brawlers[brawlersNo].trophies
          if(trophies <= 500){
            trophyLeagueEndTrophy += trophies
          }
          else if(trophies >= 501 && trophies <= 524){
            trophyLeagueEndTrophy += 500
            starPoints += 20
          }
          else if(trophies >= 525 && trophies <= 549){
            trophyLeagueEndTrophy += 524
            starPoints += 50
          }
          else if(trophies >= 550 && trophies <= 574){
            trophyLeagueEndTrophy += 549
            starPoints += 70
          }
          else if(trophies >= 575 && trophies <= 599){
            trophyLeagueEndTrophy += 574
            starPoints += 80
          }
          else if(trophies >= 600 && trophies <= 624){
            trophyLeagueEndTrophy += 599
            starPoints += 90
          }
          else if(trophies >= 625 && trophies <= 649){
            trophyLeagueEndTrophy += 624
            starPoints += 100
          }
          else if(trophies >= 650 && trophies <= 674){
            trophyLeagueEndTrophy += 649
            starPoints += 110
          }
          else if(trophies >= 675 && trophies <= 699){
            trophyLeagueEndTrophy += 674
            starPoints += 120
          }
          else if(trophies >= 700 && trophies <= 724){
            trophyLeagueEndTrophy += 699
            starPoints += 130
          }
          else if(trophies >= 725 && trophies <= 749){
            trophyLeagueEndTrophy += 724
            starPoints += 140
          }
          else if(trophies >= 750 && trophies <= 774){
            trophyLeagueEndTrophy += 749
            starPoints += 150
          }
          else if(trophies >= 775 && trophies <= 799){
            trophyLeagueEndTrophy += 774
            starPoints += 160
          }
          else if(trophies >= 800 && trophies <= 824){
            trophyLeagueEndTrophy += 799
            starPoints += 170
          }
          else if(trophies >= 825 && trophies <= 849){
            trophyLeagueEndTrophy += 824
            starPoints += 180
          }
          else if(trophies >= 850 && trophies <= 874){
            trophyLeagueEndTrophy += 849
            starPoints += 190
          }
          else if(trophies >= 875 && trophies <= 899){
            trophyLeagueEndTrophy += 874
            starPoints += 200
          }
          else if(trophies >= 900 && trophies <= 924){
            trophyLeagueEndTrophy += 885
            starPoints += 210
          }
          else if(trophies >= 925 && trophies <= 949){
            trophyLeagueEndTrophy += 900
            starPoints += 220
          }
          else if(trophies >= 950 && trophies <= 974){
            trophyLeagueEndTrophy += 920
            starPoints += 230
          }
          else if(trophies >= 975 && trophies <= 999){
            trophyLeagueEndTrophy += 940
            starPoints += 240
          }
          else if(trophies >= 1000 && trophies <= 1049){
            trophyLeagueEndTrophy += 960
            starPoints += 250
          }
          else if(trophies >= 1050 && trophies <= 1099){
            trophyLeagueEndTrophy += 980
            starPoints += 260
          }
          else if(trophies >= 1100 && trophies <= 1149){
            trophyLeagueEndTrophy += 1000
            starPoints += 270
          }
          else if(trophies >= 1150 && trophies <= 1199){
            trophyLeagueEndTrophy += 1020
            starPoints += 280
          }
          else if(trophies >= 1200 && trophies <= 1249){
            trophyLeagueEndTrophy += 1040
            starPoints += 290
          }
          else if(trophies >= 1250 && trophies <= 1299){
            trophyLeagueEndTrophy += 1060
            starPoints += 300
          }
          else if(trophies >= 1300 && trophies <= 1349){
            trophyLeagueEndTrophy += 1080
            starPoints += 310
          }
          else if(trophies >= 1350 && trophies <= 1399){
            trophyLeagueEndTrophy += 1100
            starPoints += 320
          }
          else if(trophies >= 1400 && trophies <= 1449){
            trophyLeagueEndTrophy += 1120
            starPoints += 330
          }
          else if(trophies >= 1450 && trophies <= 1499){
            trophyLeagueEndTrophy += 1140
            starPoints += 340
          }
          else if(trophies >= 1500){
            trophyLeagueEndTrophy += 1150
            starPoints += 350
          }
        }
        return [trophyLeagueEndTrophy,starPoints]
      }
    },
    trophyRanks: {
      get(){
        let rank = [0,0,0,0,0,0,0,0]
        for(let i in this.personalData.brawlers){
          if(this.personalData.brawlers[i].highestTrophies >= 0 && this.personalData.brawlers[i].highestTrophies <= 49) {
            rank[0]++
          }
          else if(this.personalData.brawlers[i].highestTrophies >= 50 && this.personalData.brawlers[i].highestTrophies <= 139) {
            rank[1]++
          }
          else if(this.personalData.brawlers[i].highestTrophies >= 140 && this.personalData.brawlers[i].highestTrophies <= 299) {
            rank[2]++
          }
          else if(this.personalData.brawlers[i].highestTrophies >= 300 && this.personalData.brawlers[i].highestTrophies <= 499) {
            rank[3]++
          }
          else if(this.personalData.brawlers[i].highestTrophies >= 500 && this.personalData.brawlers[i].highestTrophies <= 749) {
            rank[4]++
          }
          else if(this.personalData.brawlers[i].highestTrophies >= 750 && this.personalData.brawlers[i].highestTrophies <= 999) {
            rank[5]++
          }
          else if(this.personalData.brawlers[i].highestTrophies >= 1000 && this.personalData.brawlers[i].highestTrophies <= 1249){
            rank[6]++
          }
          else{
            rank[7]++
          }
        }
        return rank
      }
    },
    trophyLeagueEndNum: {
      get(){
        let num = this.personalData.trophies - this.trophyLeagueEnd[0]
        if(num > 0){
          return '↓' + num
        }
        else{
          return 0
        }
      }
    },
    countDown: {
      get(){
        let now = new Date();
        let final = new Date("2022-04-04 16:00:00");
        return final - now
      }
    }
  }
}
</script>

<style scoped>
@import "https://at.alicdn.com/t/font_3113095_kijmbmussna.css";
img{
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
.rank{
  padding-top: 4vh;
  display: flex;
  justify-content: space-between;
  width: 38vw;
  overflow-x: scroll;
  overflow-y: hidden;
}
.rankInfo{
  text-align: center;
  font-weight: bold;
  margin-right: 10px;
  color: rgb(35,143,242);
  font-size: 18px;
  margin-top: 5px;
}
.rankImg{
  width: 9vw;
}
.rankNum{

}

</style>
