<template>
  <div>
    <a-card v-if="battleLogs !== []" style="width: 95vw; margin: 0 auto; padding: -5px">
      <template slot="title">
        <div style="vertical-align: middle;font-size: 1.25em">最近25场（只统计3V3）</div>
      </template>
      <!--统计数据-->
      <van-row style="display: flex;align-items: center;">
        <van-col span="10">
          <!--胜负缩略图-->
            <div style="width: 100px;float: left;">
              <div v-for="(item,index) in battleLogs" :key="index" :class="{
              battlelogsIndex: true,
              battlelogsIndexRed: item.battle.result === 'defeat',
              battlelogsIndexBlue: 'rank' in item.battle,
              battlelogsIndexGreen: item.battle.result === 'victory',
              battlelogsIndexGrey: item.battle.result === 'draw'}">
              </div>
            </div>
        </van-col>
        <van-col span="5">
          <div>
            <a-statistic title="获胜" :value="victoryNum" valueStyle="color: rgb(103,194,58)"/>
          </div>
          <div style="height: 1vh"></div>
          <div>
            <a-statistic title="MVP" :value="myMVP"/>
          </div>
        </van-col>
        <van-col span="5">
          <div>
            <a-statistic title="失败" :value="defeatNum"  valueStyle="color: rgb(245,108,108)"/>
          </div>
          <div style="height: 1vh"></div>
          <div>
            <a-statistic title="胜率" :value="winRate"/>
          </div>
        </van-col>
        <van-col span="4">
          <div>
            <a-statistic title="平局" :value="drawNum"  valueStyle="color: rgb(144,147,153)"/>
          </div>
          <div style="height: 1vh"></div>
          <div>
            <a-statistic title="MVP率" :value="MVPRate"/>
          </div>
        </van-col>
      </van-row>
    </a-card>

    <!--筛选-->
    <van-button plain hairline block type="info" color="rgb(26,82,197)" v-if="battleLogs !== []" @click="sheetShow = true" size="mini" style="width: 95vw;margin: 10px auto">筛选</van-button>
    <van-action-sheet v-model="sheetShow" title="筛选">
      <div style="height: 10vh;display: flex;flex-direction: column;align-items: center;justify-content: center">
        <a-radio-group v-model="checkboxValue">
          <a-radio-button value="all">
            全部
          </a-radio-button>
          <a-radio-button value="victory">
            仅看获胜
          </a-radio-button>
          <a-radio-button value="defeat">
            仅看战败
          </a-radio-button>
        </a-radio-group>
      </div>
    </van-action-sheet>

    <!--收缩列表-->
    <van-collapse v-model="activeNames">
      <van-collapse-item v-show="checkboxValue === 'all'? true: item.battle.result === checkboxValue" v-for="(item,index) in battleLogs" :key="index" :name="item.battleTime">
        <template slot="title">
          <img :src="require('../assets/gameModes/'+ item.battle.mode +'.png')" alt=""  style="margin-right: 5vw; width: 8vw;">
          <!--3v3-->
          <span v-if="'teams' in item.battle">
            <span v-for="(picItem, index) in item.battle.teams[0]" :key="index + '0'">
              <img v-if="picItem.name === myName" :src="require('../assets/brawlers/'+ picItem.brawler.id +'.png')" alt="" width="30vw">
            </span>
            <span v-for="(picItem, index) in item.battle.teams[1]" :key="index + '1'">
              <img v-if="picItem.name === myName" :src="require('../assets/brawlers/'+ picItem.brawler.id +'.png')" alt="" width="30vw">
            </span>
          </span>
          <!--duels-->
          <span v-if="item.event.mode === 'duels'">
            <span v-for="(picItem, index) in item.battle.players[0].brawlers" :key="index + '2'">
              <img v-if="item.battle.players[0].name === myName" :src="require('../assets/brawlers/'+ picItem.id +'.png')" alt="" width="30vw">
            </span>
            <span v-for="(picItem, index) in item.battle.players[1].brawlers" :key="index+ '3'">
              <img v-if="item.battle.players[1].name === myName" :src="require('../assets/brawlers/'+ picItem.id +'.png')" alt="" width="30vw">
            </span>
          </span>
          <!--soloSD-->
          <span v-if="item.event.mode === 'soloShowdown'">
            <span v-for="(playersItem, index) in item.battle.players" :key="index + '4'">
              <img v-if="playersItem.name === myName" :src="require('../assets/brawlers/'+ playersItem.brawler.id +'.png')" alt="" width="30vw">
            </span>
          </span>
          <!--duoSD-->
          <span v-if="item.event.mode === 'duoShowdown'">
            <span v-for="(teamsItem, index) in item.battle.teams" :key="index + '5'">
              <img v-if="teamsItem[0].name === myName" :src="require('../assets/brawlers/'+ teamsItem[0].brawler.id +'.png')" alt="" width="30vw">
              <img v-if="teamsItem[1].name === myName" :src="require('../assets/brawlers/'+ teamsItem[1].brawler.id +'.png')" alt="" width="30vw">
            </span>
          </span>
          <!--胜负-->
          <span style="float: right">
            <a-tag :color="item.battle.result === undefined? 'purple': item.battle.result === 'victory'? 'green': item.battle.result === 'defeat'? 'red': 'blue'">
              {{ item.battle.result === undefined? '第' + item.battle.rank + '名': item.battle.result === 'victory'? '获胜': item.battle.result === 'defeat'? '战败': '平局'}}
            </a-tag>
          </span>
        </template>

        <!--详情-->
        <div v-if="'teams' in item.battle && item.battle.teams.length === 2">
          <van-row>
            <van-col span="10">
              <a-descriptions title="对战详情">
                <a-descriptions-item label="比赛时间">
                  {{ item.battleTime | dateFormatter }}
                </a-descriptions-item>
                <a-descriptions-item label="类型">
                  {{ item.battle.type === 'ranked'? '排位': item.battle.type === 'challenge'? '挑战': item.battle.type === 'teamRanked'? '战队联赛' : '其他' }}
                </a-descriptions-item>
                <a-descriptions-item label="时长">
                  {{ item.battle.duration === undefined? '暂无数据' : item.battle.duration > 60? Math.floor(item.battle.duration / 60) + '分' + (item.battle.duration % 60) + '秒' : item.battle.duration + '秒' }}
                </a-descriptions-item>
                <a-descriptions-item label="杯数变化">
                  {{ item.battle.trophyChange >0? '+'+item.battle.trophyChange: item.battle.trophyChange }}
                </a-descriptions-item>
                <a-descriptions-item label="MVP">
                  {{ 'starPlayer' in item.battle? item.battle.starPlayer !== null? item.battle.starPlayer.name: '暂无' : '暂无' }}
                </a-descriptions-item>
              </a-descriptions>
            </van-col>
            <van-col span="14">
              <div style="text-align: center">
                <span v-for="(item, index) in item.battle.teams[0]" :key="index" style="display: inline-block;text-align: center">
                  <img :src="require('../assets/brawlers/'+ item.brawler.id +'.png')" alt="" style="width: 15vw;margin: 2vh 8px 0 0;display: block">
                  <van-tag plain type="primary">Lv.{{ item.brawler.power }}</van-tag>
                  <div style="width: 15vw;font-size: 0.2em;color: black;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :class="{name: item.name === myName}">{{item.name}}</div>
                </span>
              </div>
              <div style="text-align: center">
                <i class="iconfont icon-duizhan2x"></i>
              </div>
              <div style="text-align: center">
                <span v-for="(item, index) in item.battle.teams[1]" :key="index" style="display: inline-block;text-align: center">
                  <img :src="require('../assets/brawlers/'+ item.brawler.id +'.png')" alt="" style="width: 15vw;margin: 0.5vh 8px 0 0;display: block">
                  <van-tag plain type="primary">Lv.{{ item.brawler.power }}</van-tag>
                  <div style="width: 15vw;font-size: 0.2em;color: black;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :class="{name: item.name === myName}">{{item.name}}</div>
                </span>
              </div>
            </van-col>
          </van-row>
        </div>
        <div v-if="item.event.mode === 'soloShowdown' || item.event.mode === 'duoShowdown'">
          <a-descriptions title="对战详情">
            <a-descriptions-item label="比赛时间">
              {{ item.battleTime | dateFormatter }}
            </a-descriptions-item>
            <a-descriptions-item label="类型">
              {{ item.battle.type === 'ranked'? '排位': item.battle.type === 'challenge'? '挑战': item.battle.type === 'teamRanked'? '战队联赛' : '其他' }}
            </a-descriptions-item>
            <a-descriptions-item label="时长">
              {{ item.battle.duration === undefined? '暂无数据' : item.battle.duration > 60? Math.floor(item.battle.duration / 60) + '分' + (item.battle.duration % 60) + '秒' : item.battle.duration + '秒' }}
            </a-descriptions-item>
            <a-descriptions-item label="杯数变化">
              {{ item.battle.trophyChange >0? '+'+item.battle.trophyChange: item.battle.trophyChange }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <div v-if="item.event.mode === 'duels'">
          <van-row>
            <van-col span="10">
              <a-descriptions title="对战详情">
                <a-descriptions-item label="比赛时间">
                  {{ item.battleTime | dateFormatter }}
                </a-descriptions-item>
                <a-descriptions-item label="类型">
                  {{ item.battle.type === 'ranked'? '排位': item.battle.type === 'challenge'? '挑战': item.battle.type === 'teamRanked'? '战队联赛' : '其他' }}
                </a-descriptions-item>
                <a-descriptions-item label="时长">
                  {{ item.battle.duration === undefined? '暂无数据' : item.battle.duration > 60? Math.floor(item.battle.duration / 60) + '分' + (item.battle.duration % 60) + '秒' : item.battle.duration + '秒' }}
                </a-descriptions-item>
                <a-descriptions-item label="杯数变化">
                  {{ item.battle.trophyChange >0? '+'+item.battle.trophyChange: item.battle.trophyChange === undefined? '暂无数据': item.battle.trophyChange }}
                </a-descriptions-item>
              </a-descriptions>
            </van-col>
            <van-col span="14">
              <div style="text-align: center">
                <span v-for="(item, index) in item.battle.players[0].brawlers" :key="index" style="display: inline-block;text-align: center">
                  <img :src="require('../assets/brawlers/'+ item.id +'.png')" alt="" style="width: 15vw;margin: 2vh 8px 0 0;display: block">
                  <van-tag plain type="primary">Lv.{{ item.power }}</van-tag>
                </span>
                <div style="font-size: 0.2em;color: black;margin: 0 auto" :class="{name: item.battle.players[0].name === myName}">{{item.battle.players[0].name}}</div>
              </div>
              <div style="text-align: center">
                <i class="iconfont icon-duizhan2x"></i>
              </div>
              <div style="text-align: center">
                <span v-for="(item, index) in item.battle.players[1].brawlers" :key="index" style="display: inline-block;text-align: center">
                  <img :src="require('../assets/brawlers/'+ item.id +'.png')" alt="" style="width: 15vw;margin: 0.5vh 8px 0 0;display: block">
                  <van-tag plain type="primary">Lv.{{ item.power }}</van-tag>
                </span>
                <div style="font-size: 0.2em;color: black;margin: 0 auto" :class="{name: item.battle.players[1].name === myName}">{{item.battle.players[1].name}}</div>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-collapse-item>
    </van-collapse>
    <div style="height: 10vh"></div>
  </div>
</template>

<script>
import moment from "moment"

export default {
  name: "recentEvents",
  data(){
    return{
      battleLogs: [],
      victoryNum: 0,
      defeatNum: 0,
      drawNum: 0,
      myMVP: 0,
      winRate: 0,
      MVPRate: 0,
      myName: '',
      activeNames: [''],
      checkboxValue:'all',
      sheetShow:false
    }
  },
  methods: {
    summary() {
      var victory = 0
      var defeat = 0
      var draw = 0
      var myMVP = 0
      for (let i in this.battleLogs) {
        if ('starPlayer' in this.battleLogs[i].battle) {
          if (this.battleLogs[i].battle.starPlayer !== null) {
            if (this.battleLogs[i].battle.starPlayer.name === this.myName)
              myMVP++
          }
        }
        if (this.battleLogs[i].battle.result === 'victory') {
          victory++
        } else if (this.battleLogs[i].battle.result === 'defeat') {
          defeat++
        } else if (this.battleLogs[i].battle.result === 'draw') {
          draw++
        }
      }
      this.victoryNum = victory
      this.defeatNum = defeat
      this.drawNum = draw
      this.myMVP = myMVP
      this.winRate = (victory / (victory + defeat + draw) * 100).toFixed(2)
      this.MVPRate = (myMVP / victory * 100).toFixed(2)
      if (this.winRate <= 20.0) this.myLevel = 'G'
      else if (this.winRate > 20.0 && this.winRate <= 25.0) this.myLevel = 'F'
      else if (this.winRate > 25.0 && this.winRate <= 30.0) this.myLevel = 'E'
      else if (this.winRate > 30.0 && this.winRate <= 35.0) this.myLevel = 'D'
      else if (this.winRate > 35.0 && this.winRate <= 40.0) this.myLevel = 'C'
      else if (this.winRate > 40.0 && this.winRate <= 45.0) this.myLevel = 'D'
      else if (this.winRate > 45.0 && this.winRate <= 50.0) this.myLevel = 'A'
      else if (this.winRate > 50.0 && this.winRate <= 60.0) this.myLevel = 'A+'
      else if (this.winRate > 60.0 && this.winRate <= 70.0) this.myLevel = 'S'
      else if (this.winRate > 70.0 && this.winRate <= 80.0) this.myLevel = 'SS'
      else if (this.winRate > 80.0) this.myLevel = 'SSS'
    },
  },
  filters: {
    //时间转换
    dateFormatter(data) {
      var utcDate = data
      var year = utcDate.slice(0, 4)
      var month = utcDate.slice(4, 6)
      var day = utcDate.slice(6, 8)
      var hour = utcDate.slice(9, 11)
      var minute = utcDate.slice(11, 13)
      var second = utcDate.slice(13, 15)
      var new_datetime = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      var timestamp = new Date(Date.parse(new_datetime));
      timestamp = timestamp.getTime();
      timestamp = timestamp / 1000;
      timestamp = timestamp + 8 * 60 * 60;
      // var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      return moment(timestamp * 1000).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  mounted() {
    this.$bus.$on('myName', (data) => {
      this.myName = data
    })
    this.$bus.$on('BattleLogs', (data) => {
      this.battleLogs = data
      this.summary()
    })
    console.log('mounted')
  }
}
</script>

<style scoped>
@import '//at.alicdn.com/t/font_3113095_d3gzdglor3c.css';

img{
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
.battlelogsIndex{
  height: 10px;
  width: 10px;
  margin-right: 10px;
  display: inline-block;
  /*border-right: 1px solid white;*/
}
.battlelogsIndexRed{
  background-color: rgb(245,108,108);
}
.battlelogsIndexBlue{
  background-color: rgb(64,158,255);
}
.battlelogsIndexGreen{
  background-color: rgb(103,194,58);
}
.battlelogsIndexGrey{
  background-color: rgb(144,147,153);
}
.name{
  font-weight: bold;
}
</style>
