<template>
  <div>
    <a-card title="最近25场" style="width: 95vw; margin: 0 auto; padding: -5px">
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
            <a-statistic title="获胜" :value="victoryNum"/>
          </div>
          <div>
            <a-statistic title="失败" :value="defeatNum"/>
          </div>
        </van-col>
        <van-col span="5">
          <div>
            <a-statistic title="平局" :value="drawNum"/>
          </div>
          <div>
            <a-statistic title="胜率" :value="winRate"/>
          </div>
        </van-col>
        <van-col span="4">
          <div>
            <a-statistic title="mvp" :value="myMVP"/>
          </div>
          <div>
            <a-statistic title="MVP率" :value="MVPRate"/>
          </div>
        </van-col>
      </van-row>
    </a-card>
  </div>
</template>

<script>
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
      myName: ''
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
      this.winRate = victory / (victory + defeat + draw) * 100
      this.MVPRate = (myMVP / victory * 100) .toFixed(2)
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
  mounted() {
    this.$bus.$on('myName', (data) => {
      this.myName = data
    })
    this.$bus.$on('BattleLogs', (data) => {
      this.battleLogs = data
      this.summary()
    })
  }
}
</script>

<style scoped>
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
</style>
