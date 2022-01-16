<template>
  <div v-loading="loading">
    <h1 style="font-size: 36px;font-weight: bold">个人名片</h1>
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
            style="width: 50vw;"
            @keyup="upperCase"
        />
      </div>
      <!--玩家昵称-->
      <h1 style="font-size: 35px;margin: 20px 0 10px 0">{{playName}}</h1>
      <!--标签页-->
      <a-tabs v-if="this.playName" >
        <!--个人数据标签页-->
        <a-tab-pane key="1" tab="个人数据">
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
                      <span style="font-size: 1.4em" v-show="trophies < highestTrophies">({{ highestTrophies - trophies  }})</span>
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
                      <span>冠军挑战赛资格</span>
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
        </a-tab-pane>
        <!--我的英雄标签页-->
        <a-tab-pane key="2" tab="我的角色">
          <el-table :data="brawlers" height="95vh" style="width: 1386px;margin: 20px auto;">
            <!--英雄头像列-->
            <el-table-column
                label="角色"
                align="center"
                width="160"
                label-class-name="tableLabel">
              <template slot-scope="scope">
                <img :src="require('../../assets/brawlers/'+ scope.row.id +'.png')" alt="" width="70px">
              </template>
            </el-table-column>
            <!--战力等级列-->
            <el-table-column
                prop="power"
                label="战力等级"
                sortable
                width="120"
                align="center"
                class-name="powerCol"
                label-class-name="tableLabel">
            </el-table-column>
            <!--荣誉等级列-->
            <el-table-column
                prop="rank"
                label="荣誉等级"
                sortable
                width="120"
                align="center"
                class-name="powerCol"
                label-class-name="tableLabel">
            </el-table-column>
            <!--奖杯数列-->
            <el-table-column
                prop="trophies"
                label="奖杯数"
                sortable
                width="160"
                align="center"
                class-name="powerCol"
                label-class-name="tableLabel">
            </el-table-column>
            <!--最高奖杯数列-->
            <el-table-column
                prop="highestTrophies"
                label="最高奖杯数"
                sortable
                width="160"
                align="center"
                class-name="powerCol"
                label-class-name="tableLabel">
            </el-table-column>
            <el-table-column label="我的星辉之力" align="center" label-class-name="tableLabel">
              <el-table-column
                  label="星辉一"
                  width="110"
                  align="center"
                  label-class-name="tableLabel">
                <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.starPowers.slice(0,1)" :key="index">
                    <img :src="require('../../assets/starPowersAndGadgets/'+ item.id +'.png')" alt="" width="40px">
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                  label="星辉二"
                  width="110"
                  align="center"
                  label-class-name="tableLabel">
                <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.starPowers.slice(1,2)" :key="index">
                    <img :src="require('../../assets/starPowersAndGadgets/'+ item.id +'.png')" alt="" width="40px">
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="我的武装配件" align="center" label-class-name="tableLabel">
              <el-table-column
                  label="配件一"
                  width="110"
                  align="center"
                  label-class-name="tableLabel">
                <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.gadgets.slice(0,1)" :key="index">
                    <img :src="require('../../assets/starPowersAndGadgets/'+ item.id +'.png')" alt="" width="40px">
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                  label="配件二"
                  width="110"
                  align="center"
                  label-class-name="tableLabel">
                <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.gadgets.slice(1,2)" :key="index">
                    <img :src="require('../../assets/starPowersAndGadgets/'+ item.id +'.png')" alt="" width="40px">
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="我的装备" align="center" label-class-name="tableLabel">
              <el-table-column
                  label="装备一"
                  width="110"
                  align="center"
                  label-class-name="tableLabel"
                  :filters="[
                    {text: '迅捷', value: 'SPEED'},
                    {text: '恢复', value: 'HEALTH'},
                    {text: '强攻', value: 'DAMAGE'},
                    {text: '韧性', value: 'RESISTANCE'},
                    {text: '护盾', value: 'SHIELD'}]"
                  :filter-method="filterGears1">
                <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.gears.slice(0,1)" :key="index">
                    <img :src="require('../../assets/gears/'+ item.name + item.level +'.png')" alt="" width="50px">
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                  label="装备二"
                  width="110"
                  align="center"
                  label-class-name="tableLabel"
                  :filters="[
                    {text: '迅捷', value: 'SPEED'},
                    {text: '恢复', value: 'HEALTH'},
                    {text: '强攻', value: 'DAMAGE'},
                    {text: '韧性', value: 'RESISTANCE'},
                    {text: '护盾', value: 'SHIELD'}]"
                  :filter-method="filterGears2">
                <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.gears.slice(1,2)" :key="index">
                    <img :src="require('../../assets/gears/'+ item.name + item.level +'.png')" alt="" width="50px">
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </a-tab-pane>
        <!--我的成就标签页-->
        <a-tab-pane  key="3" tab="我的成就">
          <a-row :gutter="10">
            <a-col :span="12">
              <a-button block @click.once="drawPointData()" size="large" style="margin-bottom: 20px">
                查看杯数区间
              </a-button>
              <div id="pointData"></div>
            </a-col>
            <a-col :span="12">
              <div v-show="this.maxTrophy !== 0">
                <a-card>
                  <a-statistic title="最高杯数英雄" :value="this.maxTrophy" valueStyle="fontSize: 28px; fontWeight: bold"/>
                  <span>{{maxTrophyName}}</span>
                </a-card>
                <a-row>
                  <ul style="list-style: none; margin: 20px 0 0 -40px;">
                    <a-col :span="10">
                      <li class="rankLi">
                        <img src="~@/assets/icon_rank_1.png" alt="">
                        <span>{{ rank[0] }}个</span>
                      </li>
                      <li class="rankLi">
                        <img src="~@/assets/icon_rank_2.png" alt="">
                        <span>{{ rank[1] }}个</span>
                      </li>
                      <li class="rankLi">
                        <img src="~@/assets/icon_rank_3.png" alt="">
                        <span>{{ rank[2] }}个</span>
                      </li>
                      <li class="rankLi">
                        <img src="~@/assets/icon_rank_4.png" alt="">
                        <span>{{ rank[3] }}个</span>
                      </li>
                    </a-col>
                    <a-col :span="10">
                      <li class="rankLi">
                        <img src="~@/assets/icon_rank_5.png" alt="">
                        <span>{{ rank[4] }}个</span>
                      </li>
                      <li class="rankLi">
                        <img src="~@/assets/icon_rank_6.png" alt="">
                        <span>{{ rank[5] }}个</span>
                      </li>
                      <li class="rankLi">
                        <img src="~@/assets/icon_rank_7.png" alt="">
                        <span>{{ rank[6] }}个</span>
                      </li>
                      <li class="rankLi">
                        <img src="~@/assets/icon_rank_8.png" alt="">
                        <span>{{ rank[7] }}个</span>
                      </li>
                    </a-col>
                  </ul>
                </a-row>
              </div>
            </a-col>
          </a-row>

        </a-tab-pane>
      </a-tabs>



    </div>
  </div>

</template>

<script>
import { Column } from '@antv/g2plot';
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
      //最高奖杯
      maxTrophy: 0,
      maxTrophyName: '',
      //荣誉奖牌
      rank: [0,0,0,0,0,0,0,0]
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
          if(res.data.name === undefined){
            alert('未找到玩家')
            this.loading = false
          }
          else{
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
          }
        })
      }
    },
    //装备筛选
    filterGears1(value, row){
      if(row.gears.slice(0,1)[0] !== undefined){
        return row.gears.slice(0,1)[0].name === value
      }
    },
    filterGears2(value, row){
      if(row.gears.slice(1,2)[0] !== undefined){
        return row.gears.slice(1,2)[0].name === value
      }
    },
    //杯数区间图
    drawPointData(){
      const data = [
        {"区间": "0-25", "数量": 0},
        {"区间": "26-50", "数量": 0},
        {"区间": "51-75", "数量": 0},
        {"区间": "76-100", "数量": 0},
        {"区间": "101-125", "数量": 0},
        {"区间": "126-150", "数量": 0},
        {"区间": "151-175", "数量": 0},
        {"区间": "176-200", "数量": 0},
        {"区间": "201-225", "数量": 0},
        {"区间": "226-250", "数量": 0},
        {"区间": "251-275", "数量": 0},
        {"区间": "276-300", "数量": 0},
        {"区间": "301-325", "数量": 0},
        {"区间": "326-350", "数量": 0},
        {"区间": "351-375", "数量": 0},
        {"区间": "376-400", "数量": 0},
        {"区间": "401-425", "数量": 0},
        {"区间": "426-450", "数量": 0},
        {"区间": "451-475", "数量": 0},
        {"区间": "476-500", "数量": 0},
        {"区间": "501-525", "数量": 0},
        {"区间": "526-550", "数量": 0},
        {"区间": "551-575", "数量": 0},
        {"区间": "576-600", "数量": 0},
        {"区间": "601-625", "数量": 0},
        {"区间": "626-650", "数量": 0},
        {"区间": "651-675", "数量": 0},
        {"区间": "676-700", "数量": 0},
        {"区间": "701-725", "数量": 0},
        {"区间": "726-750", "数量": 0},
        {"区间": "751-775", "数量": 0},
        {"区间": "776-800", "数量": 0},
        {"区间": "801-825", "数量": 0},
        {"区间": "826-850", "数量": 0},
        {"区间": "851-875", "数量": 0},
        {"区间": "876-900", "数量": 0},
        {"区间": "901-925", "数量": 0},
        {"区间": "926-950", "数量": 0},
        {"区间": "951-975", "数量": 0},
        {"区间": "976-1000", "数量": 0},
        {"区间": "1000+", "数量": 0},
      ]
      for(var i in this.brawlers){
        if(this.brawlers[i].highestTrophies > this.maxTrophy) {
          this.maxTrophy = this.brawlers[i].highestTrophies
          this.maxTrophyName = this.brawlers[i].name
        }
        if(this.brawlers[i].highestTrophies >= 0 && this.brawlers[i].highestTrophies <= 25) {
          data[0].数量++
          this.rank[0]++
        }
        else if(this.brawlers[i].highestTrophieshighestTrophies >= 26 && this.brawlers[i].highestTrophieshighestTrophies <= 50) {
          data[1].数量++
          this.rank[0]++
        }
        else if(this.brawlers[i].highestTrophies >= 51 && this.brawlers[i].highestTrophies <= 75) {
          data[2].数量++
          this.rank[1]++
        }
        else if(this.brawlers[i].highestTrophies >= 76 && this.brawlers[i].highestTrophies <= 100) {
          data[3].数量++
          this.rank[1]++
        }
        else if(this.brawlers[i].highestTrophies >= 101 && this.brawlers[i].highestTrophies <= 125) {
          data[4].数量++
          this.rank[1]++
        }
        else if(this.brawlers[i].highestTrophies >= 126 && this.brawlers[i].highestTrophies <= 150) {
          data[5].数量++
          this.rank[1]++
        }
        else if(this.brawlers[i].highestTrophies >= 151 && this.brawlers[i].highestTrophies <= 175) {
          data[6].数量++
          this.rank[2]++
        }
        else if(this.brawlers[i].highestTrophies >= 176 && this.brawlers[i].highestTrophies <= 200) {
          data[7].数量++
          this.rank[2]++
        }
        else if(this.brawlers[i].highestTrophies >= 201 && this.brawlers[i].highestTrophies <= 225) {
          data[8].数量++
          this.rank[2]++
        }
        else if(this.brawlers[i].highestTrophies >= 226 && this.brawlers[i].highestTrophies <= 250) {
          data[9].数量++
          this.rank[2]++
        }
        else if(this.brawlers[i].highestTrophies >= 251 && this.brawlers[i].highestTrophies <= 275) {
          data[10].数量++
          this.rank[2]++
        }
        else if(this.brawlers[i].highestTrophies >= 276 && this.brawlers[i].highestTrophies <= 300) {
          data[11].数量++
          this.rank[2]++
        }
        else if(this.brawlers[i].highestTrophies >= 301 && this.brawlers[i].highestTrophies <= 325) {
          data[12].数量++
          this.rank[3]++
        }
        else if(this.brawlers[i].highestTrophies >= 326 && this.brawlers[i].highestTrophies <= 350) {
          data[13].数量++
          this.rank[3]++
        }
        else if(this.brawlers[i].highestTrophies >= 351 && this.brawlers[i].highestTrophies <= 375) {
          data[14].数量++
          this.rank[3]++
        }
        else if(this.brawlers[i].highestTrophies >= 376 && this.brawlers[i].highestTrophies <= 400) {
          data[15].数量++
          this.rank[3]++
        }
        else if(this.brawlers[i].highestTrophies >= 401 && this.brawlers[i].highestTrophies <= 425) {
          data[16].数量++
          this.rank[3]++
        }
        else if(this.brawlers[i].highestTrophies >= 426 && this.brawlers[i].highestTrophies <= 450) {
          data[17].数量++
          this.rank[3]++
        }
        else if(this.brawlers[i].highestTrophies >= 451 && this.brawlers[i].highestTrophies <= 475) {
          data[18].数量++
          this.rank[3]++
        }
        else if(this.brawlers[i].highestTrophies >= 476 && this.brawlers[i].highestTrophies <= 500) {
          data[19].数量++
          this.rank[3]++
        }
        else if(this.brawlers[i].highestTrophies >= 501 && this.brawlers[i].highestTrophies <= 525) {
          data[20].数量++
          this.rank[4]++
        }
        else if(this.brawlers[i].highestTrophies >= 526 && this.brawlers[i].highestTrophies <= 550) {
          data[21].数量++
          this.rank[4]++
        }
        else if(this.brawlers[i].highestTrophies >= 551 && this.brawlers[i].highestTrophies <= 575) {
          data[22].数量++
          this.rank[4]++
        }
        else if(this.brawlers[i].highestTrophies >= 576 && this.brawlers[i].highestTrophies <= 600) {
          data[23].数量++
          this.rank[4]++
        }
        else if(this.brawlers[i].highestTrophies >= 601 && this.brawlers[i].highestTrophies <= 625) {
          data[24].数量++
          this.rank[4]++
        }
        else if(this.brawlers[i].highestTrophies >= 626 && this.brawlers[i].highestTrophies <= 650) {
          data[25].数量++
          this.rank[4]++
        }
        else if(this.brawlers[i].highestTrophies >= 651 && this.brawlers[i].highestTrophies <= 675) {
          data[26].数量++
          this.rank[4]++
        }
        else if(this.brawlers[i].highestTrophies >= 676 && this.brawlers[i].highestTrophies <= 700) {
          data[27].数量++
          this.rank[4]++
        }
        else if(this.brawlers[i].highestTrophies >= 701 && this.brawlers[i].highestTrophies <= 725) {
          data[28].数量++
          this.rank[4]++
        }
        else if(this.brawlers[i].highestTrophies >= 726 && this.brawlers[i].highestTrophies <= 750) {
          data[29].数量++
          this.rank[4]++
        }
        else if(this.brawlers[i].highestTrophies >= 751 && this.brawlers[i].highestTrophies <= 775) {
          data[30].数量++
          this.rank[5]++
        }
        else if(this.brawlers[i].highestTrophies >= 776 && this.brawlers[i].highestTrophies <= 800) {
          data[31].数量++
          this.rank[5]++
        }
        else if(this.brawlers[i].highestTrophies >= 801 && this.brawlers[i].highestTrophies <= 825) {
          data[32].数量++
          this.rank[5]++
        }
        else if(this.brawlers[i].highestTrophies >= 826 && this.brawlers[i].highestTrophies <= 850) {
          data[33].数量++
          this.rank[5]++
        }
        else if(this.brawlers[i].highestTrophies >= 851 && this.brawlers[i].highestTrophies <= 875) {
          data[34].数量++
          this.rank[5]++
        }
        else if(this.brawlers[i].highestTrophies >= 876 && this.brawlers[i].highestTrophies <= 900) {
          data[35].数量++
          this.rank[5]++
        }
        else if(this.brawlers[i].highestTrophies >= 901 && this.brawlers[i].highestTrophies <= 925) {
          data[36].数量++
          this.rank[5]++
        }
        else if(this.brawlers[i].highestTrophies >= 926 && this.brawlers[i].highestTrophies <= 950) {
          data[37].数量++
          this.rank[5]++
        }
        else if(this.brawlers[i].highestTrophies >= 951 && this.brawlers[i].highestTrophies <= 975) {
          data[38].数量++
          this.rank[5]++
        }
        else if(this.brawlers[i].highestTrophies >= 976 && this.brawlers[i].highestTrophies <= 1000) {
          data[39].数量++
          this.rank[5]++
        }
        else if(this.brawlers[i].highestTrophies >= 1000 && this.brawlers[i].highestTrophies <= 1250){
          this.rank[6]++
        }
        else{
          this.rank[7]++
        }
      }
      const column = new Column('pointData', {
        data,
        xField: '区间',
        yField: '数量',
        xAxis: {
          label: {
            autoRotate: false,
          },
        },
        slider: {
          start: 0.1,
          end: 0.8,
        },
      });
      column.render();
    }
  },
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
.powerCol{
  font-size: 18px;
  font-weight: bold;
}
.tableLabel{
  color: rgb(0,21,41);
  font-size: 16px;
}
.rankLi{
  margin-bottom: 20px;
}
.rankLi img{
  width: 40px;
  margin-right: 20px;
}
.rankLi span{
  font-size: 20px;
}
</style>
