<template>
  <div>
    <!--标题-->
    <div>
      <h1 style="font-size: 36px;font-weight: bold;display: inline-block">最近对战</h1>
      <el-popover
          style="display: inline-block;margin-left: 5px;font-size: 16px"
          placement="top-start"
          width="200"
          trigger="hover"
          content="最近25场对战，数据更新可能有延迟。">
        <i slot="reference" class="el-icon-question"> </i>
      </el-popover>
      <h1 v-if="myName" style="font-size: 36px;font-weight: bold;display: inline-block;margin-left: 15px">@{{myName}}</h1>
    </div>

    <div v-loading="loading">
      <!--标签搜索框-->
      <div>
        <a-input-search
            prefix="#"
            placeholder="请输入查询标签"
            enter-button="查询"
            size="large"
            @search="onSearch"
            v-model="searchInput"
            style="width: 50vw;"
            @keyup="upperCase"
        />
      </div>

      <div v-if="myName !== ''">
        <a-collapse style="margin-top: 20px" :bordered="false" @change="summary()">
          <a-collapse-panel header="总览" :forceRender="true">
            <!--卡片-->
            <a-card style="width: 100%;margin-top: 20px;">

              <div slot="title" style="font-size: 24px">
                最近25场(只统计3v3)
              </div>

              <a-row>
                <a-col :span="12">
                  <a-statistic title="获胜" :value="victoryNum" style="margin-bottom: 10px" />
                  <a-statistic title="战败" :value="defeatNum" style="margin-bottom: 10px" />
                </a-col>
                <a-col :span="12">
                  <a-statistic title="平局" :value="drawNum" style="margin-bottom: 10px" />
                  <a-statistic title="我的MVP" :value="myMVP" style="" />
                </a-col>
              </a-row>

            </a-card>
          </a-collapse-panel>
        </a-collapse>

        <!--表格-->
        <el-table
            :data="battlelogs"
            border
            style="width: 100%; margin-top: 20px">

          <el-table-column
              prop="battleTime"
              label="比赛时间"
              align="center"
              :formatter="dateFormatter"
              width="100"
          >
          </el-table-column>

          <el-table-column
              label="模式"
              align="center">
            <template slot-scope="scope">
              <img :src="require('../../assets/gameModes/'+ scope.row.battle.mode +'.png')" alt="" width="50px">
            </template>
          </el-table-column>

          <el-table-column
              label="比赛类型"
              width="100"
              align="center"
              :filters="[{ text: '排位', value: 'ranked' }, { text: '挑战', value: 'challenge' }, { text: '战队联赛', value: 'teamRanked' }]"
              :filter-method="filterBattleType">>
            <template slot-scope="scope">
              {{ scope.row.battle.type === 'ranked'? '排位': scope.row.battle.type === 'challenge'? '挑战': scope.row.battle.type === 'teamRanked'? '战队联赛' : '其他'}}
            </template>
          </el-table-column>

          <el-table-column
              label="比赛结果"
              width="100"
              align="center"
              :filters="[{ text: '获胜', value: 'victory' }, { text: '战败', value: 'defeat' }, { text: '平局', value: 'draw' }]"
              :filter-method="filterBattleResult">
            <template slot-scope="scope">
              <el-tag
                  effect="dark"
                  :type="scope.row.battle.result === 'victory'? 'success': scope.row.battle.result === 'defeat'? 'danger': scope.row.battle.result === undefined? '': 'info'">
                {{ scope.row.battle.result === undefined? '第' + scope.row.battle.rank + '名': scope.row.battle.result === 'victory'? '获胜': scope.row.battle.result === 'defeat'? '战败': '平局'}}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
              label="奖杯变化"
              width="80"
              align="center">
            <template slot-scope="scope">
              {{ scope.row.battle.trophyChange >0? '+' + scope.row.battle.trophyChange: scope.row.battle.trophyChange}}
            </template>
          </el-table-column>

          <el-table-column
              label="比赛时长"
              width="100"
              align="center">
            <template slot-scope="scope">
              {{ scope.row.battle.duration === undefined? '暂无数据' : scope.row.battle.duration > 60? Math.floor(scope.row.battle.duration / 60) + '分' + (scope.row.battle.duration % 60) + '秒' : scope.row.battle.duration + '秒' }}
            </template>
          </el-table-column>

          <el-table-column
              prop="battle.starPlayer.name"
              label="MVP"
              width="140"
              align="center">
          </el-table-column>

          <el-table-column label="对战阵容" align="center">
            <el-table-column label="" align="center" width="420">
              <template slot-scope="scope" v-if="'teams' in scope.row.battle">
              <span v-for="(item, index) in scope.row.battle.teams[0]" :key="index" v-show="scope.row.battle.teams.length === 2">
                <div style="display: inline-block;text-align: center;width: 120px">
                  <img :src="require('../../assets/brawlers/'+ item.brawler.id +'.png')" alt="" width="60px">
                  <br>
                  <div style="width: 120px;margin: 0 auto;white-space: nowrap">{{ item.name }}</div>
                  <div style="font-size: 16px; margin-top: -5px">Lv.{{ item.brawler.power }}</div>
                </div>
              </span>
              </template>
            </el-table-column>

            <el-table-column label="" align="center" width="420">
              <template slot-scope="scope" v-if="'teams' in scope.row.battle">
              <span v-for="(item, index) in scope.row.battle.teams[1]" :key="index" v-show="scope.row.battle.teams.length === 2">
                <div style="display: inline-block;text-align: center;width: 120px">
                  <img :src="require('../../assets/brawlers/'+ item.brawler.id +'.png')" alt="" width="60px">
                  <br>
                  <div style="width: 120px;margin: 0 auto;white-space: nowrap">{{ item.name }}</div>
                  <div style="font-size: 16px; margin-top: -5px">Lv.{{ item.brawler.power }}</div>
                </div>
              </span>
              </template>
            </el-table-column>
          </el-table-column>

        </el-table>
      </div>

    </div>
  </div>

</template>

<script>
import axios from "axios";
import moment from "moment"

export default {
  name: "RecentEvents",
  data(){
    return{
      searchInput: '',
      loading: '',
      myName: '',
      victoryNum: 0,
      defeatNum: 0,
      drawNum: 0,
      myMVP: 0,
      battlelogs: [{
        "battleTime": "20220116T084430.000Z",
        "event": {
          "id": 15000013,
          "mode": "soloShowdown",
          "map": "Skull Creek"
        },
        "battle": {
          "mode": "soloShowdown",
          "type": "ranked",
          "rank": 1,
          "trophyChange": 10,
          "players": [{
            "tag": "#LLQ0U8PR",
            "name": "PLS☆PrePan",
            "brawler": {
              "id": 16000048,
              "name": "GROM",
              "power": 8,
              "trophies": 135
            }
          }, {
            "tag": "#PQ0J00229",
            "name": "Ultimate 5412",
            "brawler": {
              "id": 16000026,
              "name": "BIBI",
              "power": 1,
              "trophies": 172
            }
          }, {
            "tag": "#20RLQ2Q08",
            "name": "TB|DarK",
            "brawler": {
              "id": 16000048,
              "name": "GROM",
              "power": 9,
              "trophies": 157
            }
          }, {
            "tag": "#9YPR2LRQU",
            "name": "Ahroldjohnrie",
            "brawler": {
              "id": 16000048,
              "name": "GROM",
              "power": 2,
              "trophies": 147
            }
          }, {
            "tag": "#YYLRJCC99",
            "name": "8-bit-TV",
            "brawler": {
              "id": 16000005,
              "name": "SPIKE",
              "power": 5,
              "trophies": 180
            }
          }, {
            "tag": "#PVQ0V89PC",
            "name": "牛B",
            "brawler": {
              "id": 16000048,
              "name": "GROM",
              "power": 2,
              "trophies": 161
            }
          }, {
            "tag": "#Y8CQYQUC8",
            "name": "TOXICxBAROOD",
            "brawler": {
              "id": 16000048,
              "name": "GROM",
              "power": 5,
              "trophies": 154
            }
          }, {
            "tag": "#JGQYRR9J",
            "name": "jubjub",
            "brawler": {
              "id": 16000005,
              "name": "SPIKE",
              "power": 5,
              "trophies": 152
            }
          }, {
            "tag": "#8V92Y2UUU",
            "name": "Botol Kecap",
            "brawler": {
              "id": 16000032,
              "name": "MAX",
              "power": 6,
              "trophies": 162
            }
          }, {
            "tag": "#G02PYLV9",
            "name": "nglok",
            "brawler": {
              "id": 16000052,
              "name": "MEG",
              "power": 5,
              "trophies": 164
            }
          }]
        }
      }]
    }
  },
  methods: {
    onSearch(){
      if(this.searchInput === ''){
        alert('请输入标签')
      }
      else{
        this.loading = true
        axios({
          methods: 'GET',
          url: '/playStatsApi/' + 'v1/battlelog/'+ this.searchInput,
        }).then((res) => {
          this.battlelogs = res.data.items
        })
        axios({
          methods: 'GET',
          url: '/playStatsApi/' + this.searchInput,
        }).then((res) => {
          this.myName = res.data.name
          this.summary()
          this.loading = false
        })
      }
    },
    upperCase(){
      this.searchInput = this.searchInput.toUpperCase()
    },
    // 比赛结果筛选
    filterBattleResult(value, row) {
      return row.battle.result === value;
    },
    // 比赛类型筛选
    filterBattleType(value, row) {
      return row.battle.type === value;
    },
    // 格式化日期
    dateFormatter(row){
      var utcDate = row.battleTime
      var year = utcDate.slice(0,4)
      var month = utcDate.slice(4,6)
      var day = utcDate.slice(6,8)
      var hour = utcDate.slice(9,11)
      var minute = utcDate.slice(11,13)
      var second = utcDate.slice(13,15)
      var new_datetime = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      var timestamp = new Date(Date.parse(new_datetime));
      timestamp = timestamp.getTime();
      timestamp = timestamp/1000;
      timestamp = timestamp+8*60*60;
      // var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      return moment(timestamp * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
    // 统计
    summary(){
      var victory = 0
      var defeat = 0
      var draw = 0
      var myMVP = 0
      for(let i in this.battlelogs){
        if('starPlayer' in this.battlelogs[i].battle){
          if(this.battlelogs[i].battle.starPlayer !== null){
            if(this.battlelogs[i].battle.starPlayer.name === this.myName)
              myMVP++
          }
        }
        if(this.battlelogs[i].battle.result === 'victory') {
          victory++
        }
        else if(this.battlelogs[i].battle.result === 'defeat') {
          defeat++
        }
        else if(this.battlelogs[i].battle.result === 'draw') {
          draw++
        }
      }
      this.victoryNum = victory
      this.defeatNum = defeat
      this.drawNum = draw
      this.myMVP = myMVP
    }
  }
}
</script>

<style scoped>

</style>
