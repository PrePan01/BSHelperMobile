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
        <span style="font-size: 20px;margin-left: 20px" v-if="recentSearch !== null && searchInput === ''">
          <span>你是否想查询：</span>
          <a @click="searchRecent(recentSearch)">#{{ recentSearch }}</a>
        </span>
      </div>

      <div>
        <a-collapse style="margin-top: 20px" :bordered="false" @change.once="summary()">
          <a-collapse-panel header="总览" :forceRender="true">
            <!--卡片-->
            <a-card style="width: 100%">
              <div slot="title" style="font-size: 24px">
                最近25场(只统计3v3)
              </div>
              <a-row>
                <!--胜负缩略图-->
                <div style="width: 100px;float: left;margin: 10px 65px 0 20px">
                  <div v-for="(item,index) in battlelogs" :key="index" :class="{
                      battlelogsIndex: true,
                      battlelogsIndexRed: item.battle.result === 'defeat',
                      battlelogsIndexBlue: 'rank' in item.battle,
                      battlelogsIndexGreen: item.battle.result === 'victory',
                      battlelogsIndexGrey: item.battle.result === 'draw'}">
                  </div>
                </div>
                <!--杯数走势图-->
                <div id="pointChangeLine" style="display: inline-block;float: left;margin: 35px 85px 0 -15px">

                </div>
                <a-col :span="4">
                  <a-statistic title="获胜" :value="victoryNum" style="margin-bottom: 10px" />
                  <a-statistic title="战败" :value="defeatNum" style="" />
                </a-col>
                <a-col :span="4">
                  <a-statistic title="平局" :value="drawNum" style="margin-bottom: 10px" />
                  <a-statistic title="我的MVP" :value="myMVP" style="" />
                </a-col>
                <a-col :span="4">
                  <a-statistic title="胜率" :value="isNaN(winRate)? '暂无数据': winRate" style="margin-bottom: 10px" :precision="2" suffix="%"/>
                  <a-statistic title="MVP率" :value="isNaN(MVPRate)? '暂无数据': MVPRate" style="" :precision="2" suffix="%"/>
                </a-col>
                <a-col :span="2">
                  <a-statistic title="总体评价" :value="myLevel" style="margin-bottom: 10px" valueStyle="fontSize: 50px; color: #ee3f4d" />
                </a-col>
              </a-row>
            </a-card>
          </a-collapse-panel>
        </a-collapse>

        <!--表格-->
        <el-table
            :data="battlelogs"
            border
            height="90vh"
            style="width: 100%; margin-top: 20px">

          <el-table-column
              prop="battleTime"
              label="比赛时间"
              align="center"
              :formatter="dateFormatter"
              width="100"
              label-class-name="tableCol"
          >
          </el-table-column>

          <el-table-column
              label="模式"
              align="center"
              label-class-name="tableCol"
              width="100"
          >
            <template slot-scope="scope">
              <img :src="require('../../assets/gameModes/'+ scope.row.battle.mode +'.png')" alt="" width="50px">
            </template>
          </el-table-column>

          <el-table-column
              prop="event.map"
              label="地图"
              align="center"
              label-class-name="tableCol"
              :formatter="mapFormatter"
          >
          </el-table-column>

          <el-table-column
              label="比赛类型"
              width="100"
              align="center"
              label-class-name="tableCol"
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
              label-class-name="tableCol"
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
              width="50"
              align="center"
              label-class-name="tableCol"
          >
            <template slot-scope="scope">
              {{ scope.row.battle.trophyChange >0? '+' + scope.row.battle.trophyChange: scope.row.battle.trophyChange}}
            </template>
          </el-table-column>

          <el-table-column
              label="比赛时长"
              width="100"
              align="center"
              label-class-name="tableCol"
          >
            <template slot-scope="scope">
              {{ scope.row.battle.duration === undefined? '暂无数据' : scope.row.battle.duration > 60? Math.floor(scope.row.battle.duration / 60) + '分' + (scope.row.battle.duration % 60) + '秒' : scope.row.battle.duration + '秒' }}
            </template>
          </el-table-column>

          <el-table-column
              label="MVP"
              width="120"
              align="center"
              label-class-name="tableCol">
            <template slot-scope="scope">
              {{ 'starPlayer' in scope.row.battle? scope.row.battle.starPlayer !== null? scope.row.battle.starPlayer.name: '暂无' : '暂无'}}
            </template>
          </el-table-column>

          <el-table-column label="对战阵容" align="center" label-class-name="tableCol">
            <el-table-column label="" align="center" width="420">
              <template slot-scope="scope">
                <!--3V3阵容-->
                <template v-if="'teams' in scope.row.battle">
                  <span v-for="(item, index) in scope.row.battle.teams[0]" :key="index" v-show="scope.row.battle.teams.length === 2">
                    <div style="display: inline-block;text-align: center;width: 120px;margin-top: 10px">
                      <img :src="require('../../assets/brawlers/'+ item.brawler.id +'.png')" alt="" width="65px">
                      <br>
                      <div>
                        <el-tag size="small" effect="plain" class="power" type="info">Lv.{{ item.brawler.power }}</el-tag>
                      </div>
                      <div style="width: 120px;margin: 0 auto;white-space: nowrap" :class="{teamId: item.name === myName}">
                        {{ item.name }}
                      </div>
                    </div>
                  </span>
                </template>
                <!--车轮战阵容-->
                <template v-if="scope.row.battle.mode === 'duels'">
                  <div
                      style="display: inline-block;text-align: center;width: 120px;margin-top: 10px"
                      v-for="(picItem,index) in scope.row.battle.players[0].brawlers"
                      :key="index"
                  >
                    <img
                        style="width: 65px"
                        :src="require('../../assets/brawlers/'+ picItem.id +'.png')"
                        alt=""
                        width="65px"
                    >
                    <div>
                      <el-tag size="small" effect="plain" class="power" type="info">Lv.{{ picItem.power }}</el-tag>
                    </div>
                  </div>
                  <div style="" :class="{teamId: scope.row.battle.players[0].name === myName}">{{ scope.row.battle.players[0].name }}</div>
                </template>
              </template>
            </el-table-column>

            <el-table-column label="" align="center" width="420">
              <template slot-scope="scope">
                <!--3V3阵容-->
                <template v-if="'teams' in scope.row.battle">
                <span v-for="(item, index) in scope.row.battle.teams[1]" :key="index" v-show="scope.row.battle.teams.length === 2">
                  <div style="display: inline-block;text-align: center;width: 120px;margin-top: 10px">
                    <img :src="require('../../assets/brawlers/'+ item.brawler.id +'.png')" alt="" width="65px">
                    <br>
                    <div>
                      <el-tag size="small" effect="plain" class="power" type="info">Lv.{{ item.brawler.power }}</el-tag>
                    </div>
                    <div style="width: 120px;margin: 0 auto;white-space: nowrap" :class="{teamId: item.name === myName}">{{ item.name }}</div>
                  </div>
                </span>
                </template>
                <!--车轮战阵容-->
                <template v-if="scope.row.battle.mode === 'duels'">
                  <div
                      style="display: inline-block;text-align: center;width: 120px;margin-top: 10px"
                      v-for="(picItem,index) in scope.row.battle.players[1].brawlers"
                      :key="index"
                  >
                    <img
                        style="width: 65px"
                        :src="require('../../assets/brawlers/'+ picItem.id +'.png')"
                        alt=""
                        width="65px"
                    >
                    <div>
                      <el-tag size="small" effect="plain" class="power" type="info">Lv.{{ picItem.power }}</el-tag>
                    </div>
                  </div>
                  <div style="" :class="{teamId: scope.row.battle.players[1].name === myName}">{{ scope.row.battle.players[1].name }}</div>
                </template>
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
import { TinyLine } from '@antv/g2plot';
let tinyLine

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
      myLevel: '',
      winRate: 0,
      MVPRate: 0,
      myTrophies: 0,
      battlelogs: [],
      recentSearch: ''
    }
  },
  methods: {
    onSearch() {
      if (this.searchInput === '') {
        alert('请输入标签')
      }
      else {
        this.loading = true
        localStorage.setItem('recentSearch', this.searchInput)

        axios({
          methods: 'GET',
          url: '/playStatsApi/' + 'v1/battlelog/' + this.searchInput,
        }).then((res) => {
          this.battlelogs = res.data.items
        })
        axios({
          methods: 'GET',
          url: '/playStatsApi/' + this.searchInput,
        }).then((res) => {
          this.myName = res.data.name
          this.myTrophies = res.data.trophies
          if (this.myName === undefined) alert('未找到玩家')
          else {
            this.summary()
          }
          this.loading = false
        })
      }
    },
    upperCase() {
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
    dateFormatter(row) {
      var utcDate = row.battleTime
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
    },
    // 统计,打开折叠抽屉
    summary() {
      var victory = 0
      var defeat = 0
      var draw = 0
      var myMVP = 0
      for (let i in this.battlelogs) {
        if ('starPlayer' in this.battlelogs[i].battle) {
          if (this.battlelogs[i].battle.starPlayer !== null) {
            if (this.battlelogs[i].battle.starPlayer.name === this.myName)
              myMVP++
          }
        }
        if (this.battlelogs[i].battle.result === 'victory') {
          victory++
        } else if (this.battlelogs[i].battle.result === 'defeat') {
          defeat++
        } else if (this.battlelogs[i].battle.result === 'draw') {
          draw++
        }
      }
      this.victoryNum = victory
      this.defeatNum = defeat
      this.drawNum = draw
      this.myMVP = myMVP
      this.winRate = victory / (victory + defeat + draw) * 100
      this.MVPRate = myMVP / victory * 100
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
      this.drawPointChangeLine()
    },
    // 地图翻译
    mapFormatter(row) {
      var en = row.event.map
      // 足球
      if (en === 'Triple Dribble') return '三重威胁'
      else if (en === 'Firm Grip') return '牢牢把握'
      else if (en === 'Binary Coding') return '二进制'
      else if (en === 'Sticky Notes') return '便利贴'
      else if (en === 'Turtle Shell') return '坚硬龟壳'
      else if (en === 'Retina') return '视网膜'
      else if (en === 'Sneaky Fields') return '绿荫球场'
      else if (en === 'Sunny Soccer') return '阳光球场'
      else if (en === 'Super Stadium') return '超级体育场'
      else if (en === 'Backyard Bowl') return '后院球场'
      else if (en === 'Pinball Dreams') return '梦幻弹珠'
      else if (en === 'Pinhole Punt') return '精准射门'
      else if (en === 'Field Goal') return '绿茵交锋'
      else if (en === 'Center Stage') return '中心舞台'
      // 机甲
      else if (en === 'Some Assembly Required') return '等待组装'
      else return en
    },
    // 杯数曲线
    drawPointChangeLine() {
      let p = 0
      let data = [0]
      for (let i in this.battlelogs) {
        if(this.battlelogs[i].battle.type !== 'ranked') continue

        if ('trophyChange' in this.battlelogs[i].battle) {
          p = p + this.battlelogs[i].battle.trophyChange * 1
          data.push(p)
        }
        else if(this.battlelogs[i].event.mode === 'duels'){
          if(this.battlelogs[i].battle.result === 'defeat') {
            data.push(p - 8)
            p = p - 8
          }
          else if(this.battlelogs[i].battle.result === 'victory') {
            data.push(p + 8)
            p = p + 8
          }
        }
        else{
          data.push(p)
        }
      }
      console.log(data)
      if (tinyLine === undefined) {
        tinyLine = new TinyLine('pointChangeLine', {
          height: 60,
          width: 200,
          autoFit: false,
          data,
          smooth: true,
        });
        tinyLine.render()
      } else {
        tinyLine.destroy()
        tinyLine = new TinyLine('pointChangeLine', {
          height: 60,
          width: 200,
          autoFit: false,
          data,
          smooth: true,
        });
        tinyLine.render()
        console.log('else')
      }
    },
    // 最近搜索超链接
    searchRecent(recentSearch){
      this.searchInput = recentSearch
      this.onSearch()
    }
  },
  mounted(){
    this.recentSearch = localStorage.getItem('recentSearch')
  }
}
</script>

<style>
.tableCol{
  color: black;
}
.teamId{
  font-weight: bold;
  color: black;
}
.power{
  font-size: 15px;
  /*border: 1px solid black;*/
  /*width: 40px;*/
  margin: 5px auto 2px auto;
  /*border-radius: 5px*/
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
</style>
