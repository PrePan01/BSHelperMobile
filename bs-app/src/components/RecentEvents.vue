<template>
  <div>
    <a-back-top id="backTop" />

    <a-card v-if="battleLogs !== []" style="width: 95vw; margin:1vh auto 0 auto; padding: -5px">
      <template slot="title">
        <div style="vertical-align: middle;font-size: 1.25em">最近25场</div>
      </template>
      <!--统计数据表格-->
      <van-row ref="summaryCard" style="display: flex;align-items: center;">
        <van-col span="9">
          <!--胜负缩略图-->
            <div style="width: 100px;float: left;">
              <div v-for="(item,index) in battleLogs" :key="index" :class="{
                battlelogsIndex: true,
                battlelogsIndexRed: item.battle.result === 'defeat',
                battlelogsIndexBlue: 'rank' in item.battle,
                battlelogsIndexGreen: item.battle.result === 'victory',
                battlelogsIndexBlue: item.battle.result === 'draw',
                battlelogsIndexNull: !('result' in item.battle)
              }">
              </div>
            </div>
        </van-col>
        <van-col span="5">
          <div>
            <a-statistic title="获胜" :value="victoryNum" valueStyle="color: rgb(103,194,58);"/>
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
            <a-statistic title="胜率" :value="isNaN(winRate)?'--':winRate"/>
          </div>
        </van-col>
        <van-col span="5">
          <div>
            <a-statistic title="平局" :value="drawNum"  valueStyle="color: rgb(64,158,255)"/>
          </div>
          <div style="height: 1vh"></div>
          <div>
            <a-statistic title="MVP率" :value="isNaN(MVPRate)?'--':MVPRate"/>
          </div>
        </van-col>
      </van-row>
      <!--折线图-->
      <van-divider />
      <div style="text-align: center;margin-top: 1vh;color: rgba(0, 0, 0, 0.45);font-size: 14px">近期杯数走势</div>
      <div ref="chart" style="height: 250px;width: 90vw;margin: -6vh 0 -3vh -3vw">
      </div>
    </a-card>

    <!--模式英雄统计-->
    <van-row>
      <van-col span="12">
        <!--0宝石，1足球，2赏金，3金库，4热区，5机甲，6淘汰赛，7单鸡，8双鸡，9车轮战，10积分战，11推车，12篮球，13机甲天降-->
        <!--item[模式，次数，胜场，负场]-->
        <!--模式次数-->
        <div class="modeNum">
          <div v-for="(item, index) in modeNum"  :key="index" :class="selectModeIndex === item[0]?'modeNumItemActive':''" class="modeNumItem" v-show="item[1] !== 0" @click="selectModeIndexFn(item[0])">
            <img v-bind:src="require('../assets/gameModes/'+ item[0] +'.png')" alt="" style="width: 17vw">
            <div style="color: black;font-size: 16px">{{item[1]+'次'}}</div>
            <div style="font-size: 14px;margin-top: -5px" v-show="item[0] !== 7 && item[0] !== 8">
              <span style="color: rgb(82,196,26)">{{item[2]}}</span> / <span style="color: rgb(247,93,164)">{{item[3]}}</span>
            </div>
          </div>
        </div>
      </van-col>
      <van-col span="12">
        <!--英雄次数-->
        <div class="brawlerUse">
          <div v-for="(key,index) in brawlUseSorted" :key="index" class="brawlerUseItem">
            <img :src="require('../assets/brawlers/'+ key +'.png')" alt="" style="width: 17vw">
            <div style="color: black;font-size: 16px">{{brawlUse[key][0]+'次'}}</div>
            <div style="font-size: 14px;margin-top: -5px">
              <span style="color: rgb(82,196,26)">{{brawlUse[key][1]}}</span> / <span style="color: rgb(247,93,164)">{{brawlUse[key][2]}}</span>
            </div>
          </div>
        </div>
      </van-col>
    </van-row>

    <!--筛选-->
    <van-button plain hairline block type="info" color="rgb(26,82,197)" v-if="battleLogs !== []" @click="sheetShow = true" size="mini" style="width: 95vw;margin: 10px auto">
      {{ checkboxValue | checkboxValue }}
    </van-button>
    <van-action-sheet v-model="sheetShow" title="筛选" :overlay="false" :lock-scroll="false">
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
          <a-radio-button value="mvp">
            仅看MVP
          </a-radio-button>
        </a-radio-group>
      </div>
    </van-action-sheet>

    <!--战绩列表-->
    <van-collapse v-model="activeNames">
      <van-collapse-item v-show="selectMode(item.battle) && showEvents(item.battle)" v-for="(item,index) in battleLogs" :key="index" :name="item.battleTime" >
        <!--列表-->
        <template slot="title">
          <div style="display: flex; align-items: center;padding: 3px 0">
            <img :src="require('../assets/gameModes/'+ item.battle.mode +'.png')" alt=""  style="margin-right: 1vw; width: 8vw;">
            <span style="display:inline-block; width: 26vw;font-size: 16px">{{item.event.map | mapTranslate}}</span>
            <!--3v3-->
            <span v-if="'teams' in item.battle && item.battle.teams.length === 2">
              <span v-for="(item, index) in item.battle.teams[0]" :key="index + '0'">
                <img v-if="item.name === myName" :src="require('../assets/brawlers/'+ item.brawler.id +'.png')" alt="" width="44vw">
              </span>
              <span v-for="(item, index) in item.battle.teams[1]" :key="index + '1'">
                <img v-if="item.name === myName" :src="require('../assets/brawlers/'+ item.brawler.id +'.png')" alt="" width="44vw">
              </span>
            </span>
            <!--duels-->
            <span v-if="item.event.mode === 'duels'">
              <span v-for="(picItem, index) in item.battle.players[0].brawlers" :key="index + '2'">
                <img v-if="item.battle.players[0].name === myName" :src="require('../assets/brawlers/'+ picItem.id +'.png')" alt="" width="30vw" style="margin-right: 5px">
              </span>
              <span v-for="(picItem, index) in item.battle.players[1].brawlers" :key="index+ '3'">
                <img v-if="item.battle.players[1].name === myName" :src="require('../assets/brawlers/'+ picItem.id +'.png')" alt="" width="30vw" style="margin-right: 5px">
              </span>
            </span>
            <!--soloSD-->
            <span v-if="item.event.mode === 'soloShowdown' || item.battle.mode === 'soloShowdown'">
              <span v-for="(playersItem, index) in item.battle.players" :key="index + '4'">
                <img v-if="playersItem.name === myName" :src="require('../assets/brawlers/'+ playersItem.brawler.id +'.png')" alt="" width="40vw">
              </span>
            </span>
            <!--duoSD-->
            <span v-if="item.event.mode === 'duoShowdown' || item.battle.mode === 'duoShowdown'">
              <span v-for="(teamsItem, index) in item.battle.teams" :key="index + '5'">
                <img v-if="teamsItem[0].name === myName" :src="require('../assets/brawlers/'+ teamsItem[0].brawler.id +'.png')" alt="" width="40vw">
                <img v-if="teamsItem[1].name === myName" :src="require('../assets/brawlers/'+ teamsItem[1].brawler.id +'.png')" alt="" width="40vw">
              </span>
            </span>
            <!--机甲入侵-->
            <span v-if="item.event.mode === 'roboRumble'">
              <span v-for="(playersItem, index) in item.battle.players" :key="index">
                <img v-if="playersItem.name === myName" :src="require('../assets/brawlers/'+ playersItem.brawler.id +'.png')" alt="" width="40vw">
              </span>
            </span>
            <!--天选之战-->
            <span v-if="item.event.mode === 'bigGame'">
              <span v-for="(playersItem, index) in item.battle.players" :key="index">
                <img v-if="playersItem.name === myName" :src="require('../assets/brawlers/'+ playersItem.brawler.id +'.png')" alt="" width="40vw">
              </span>
            </span>

            <!--最右侧标签-->
            <div style="margin-left: 5px">

              <!--杯数-->
              <span v-if="'teams' in item.battle && item.battle.teams.length === 2">
                <span v-for="(item1, index) in item.battle.teams[0]" :key="index + '0'">
                  <a-tag plain v-if="item1.name === myName && (item.battle.type === 'teamRanked' || item.battle.type === 'soloRanked')" color="orange">{{ item1.brawler.trophies | rankNum }}</a-tag>
                  <a-tag plain v-if="item1.name === myName && item.battle.type !== 'teamRanked' && item.battle.type !== 'soloRanked'" color="orange">{{ item1.brawler.trophies }}</a-tag>
                </span>
                <span v-for="(item1, index) in item.battle.teams[1]" :key="index + '1'">
                  <a-tag plain v-if="item1.name === myName && (item.battle.type === 'teamRanked' || item.battle.type === 'soloRanked')" color="orange">{{ item1.brawler.trophies | rankNum }}</a-tag>
                  <a-tag plain v-if="item1.name === myName && item.battle.type !== 'teamRanked' && item.battle.type !== 'soloRanked'" color="orange">{{ item1.brawler.trophies }}</a-tag>
                </span>
              </span>

              <span v-if="item.event.mode === 'soloShowdown' || item.battle.mode === 'soloShowdown'">
                <span v-for="(item, index) in item.battle.players" :key="index + '0'">
                  <a-tag plain v-if="item.name === myName" color="orange">{{ item.brawler.trophies }}</a-tag>
                </span>
              </span>

              <span v-if="item.event.mode === 'duoShowdown' || item.battle.mode === 'duoShowdown'">
                <span v-for="(teamsItem, index) in item.battle.teams" :key="index + '5'">
                  <a-tag plain v-if="teamsItem[0].name === myName" color="orange">{{ teamsItem[0].brawler.trophies }}</a-tag>
                  <a-tag plain v-if="teamsItem[1].name === myName" color="orange">{{ teamsItem[1].brawler.trophies }}</a-tag>
                </span>
              </span>
          </div>

            <a-tag style="display: inline-block;margin-left: -3px;margin-right: 3px;padding: 0 6px;" plain color="red" v-if="('starPlayer' in item.event || 'starPlayer' in item.battle) && isMyMvp(item.battle)">
              MVP
            </a-tag>

            <div style="margin: 0 3px 0 auto ">
              <div
                  v-if="item.battle.mode!=='bigGame'"
                  :class="{
                  'result': true,
                  'winColor': item.battle.result === 'victory',
                  'loseColor': item.battle.result === 'defeat',
                  'drawColor': item.battle.result === 'draw',
                  'otherColor': item.battle.result === undefined
                }">
                {{ item.battle.result === undefined? '#' + item.battle.rank: item.battle.result === 'victory'? '胜利': item.battle.result === 'defeat'? '战败': '平局'}}
              </div>
              <div style="margin: -5px 0;font-size: 12px;text-align: right">
                {{item.battleTime | dateFormatter | momentTrans}}
              </div>
            </div>

          </div>
        </template>
        <!--详情-->
        <!--3V3-->
        <div v-if="'teams' in item.battle && item.battle.teams.length === 2" style="text-align: center">
          <div style="display: inline-block">
            <div style="color: black;margin-bottom: 4px">
              <span style="margin-right: 12vw">
                <i style="font-weight: bold" class="iconfont icon-shijian"></i>
                <span style="font-size: 16px;margin-left: 5px">{{ item.battleTime | dateFormatter }}</span>
              </span>
              <span>
                <i style="font-size: 15px" class="iconfont icon-zbds_shalou"></i>
                <span style="font-size: 16px;margin-left: 3px">{{ item.battle.duration === undefined? '暂无数据' : item.battle.duration > 60? Math.floor(item.battle.duration / 60) + '分' + (item.battle.duration % 60) + '秒' : item.battle.duration + '秒' }}</span>
              </span>
            </div>
            <div style="color: black;line-height: 3vh;margin-bottom: 4px;font-size: 15px">
              <div>
                <span style="margin-right: 7vw"><b>类型：</b>{{ item.battle.type === 'ranked'? '排位': item.battle.type === 'challenge'? '挑战': item.battle.type === 'teamRanked'? '组排联赛': item.battle.type === 'soloRanked'? '单排联赛' : '其他' }}</span>
                <span class="mvpSpan"><b>MVP：</b>{{ 'starPlayer' in item.battle? item.battle.starPlayer !== null? item.battle.starPlayer.name: '暂无' : '暂无' }}</span>
                <span><b>奖杯：</b>{{ item.battle.trophyChange >0? '+'+item.battle.trophyChange: item.battle.trophyChange }}</span>
              </div>
            </div>
          </div>
          <van-divider style="margin: 0 0 10px 0"></van-divider>
          <!--阵容-->
          <div style="display: inline-block; margin: 0 auto;">
            <div style="display: flex; margin: 0 auto;align-items: center">
              <div style="text-align: center;display: inline-block">
                <div
                    v-for="(brawlerItem, index) in item.battle.teams[0]"
                    :key="index"
                    style="display: inline-block;text-align: center;margin: 0 3px"
                    @click="$bus.$emit('onSearch', brawlerItem.tag.slice(1))">
                  <img :src="require('../assets/brawlers/'+ brawlerItem.brawler.id +'.png')" alt="" style="width: 13vw;display: block">
                  <van-tag plain type="primary" :color="brawlerItem.brawler.power === 11? 'rgb(114,46,209)': brawlerItem.brawler.power === 10? 'rgb(19,194,194)': 'rgb(82,196,26)'">Lv.{{ brawlerItem.brawler.power }}</van-tag>
                  <div style="width: 13vw;font-size: 12px;color: black;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :class="{name: item.name === myName}">{{brawlerItem.name}}</div>
                  <div style="color: black;font-size: 12px;margin-top: -2px">
                    <img style="vertical-align: middle" src="@/assets/icon_trophy_small.png" alt="" width="13px">
                    <span v-if="item.battle.type === 'teamRanked' || item.battle.type === 'soloRanked'" style="vertical-align: middle">{{brawlerItem.brawler.trophies | rankNum}}</span>
                    <span v-else style="vertical-align: middle">{{brawlerItem.brawler.trophies}}</span>
                  </div>
                </div>
              </div>
              <div style="text-align: center;display: inline-block;">
                <i style="font-size: 20px;padding: 0 1px" class="iconfont icon-duizhan2x"></i>
              </div>
              <div style="text-align: center;display: inline-block">
                <span
                    v-for="(brawlerItem, index) in item.battle.teams[1]"
                    :key="index"
                    style="display: inline-block;text-align: center;margin: 0 3px"
                    @click="$bus.$emit('onSearch', brawlerItem.tag.slice(1))">
                  <img :src="require('../assets/brawlers/'+ brawlerItem.brawler.id +'.png')" alt="" style="width: 13vw;display: block">
                  <van-tag plain type="primary" :color="brawlerItem.brawler.power === 11? 'rgb(114,46,209)': brawlerItem.brawler.power === 10? 'rgb(19,194,194)': 'rgb(82,196,26)'">Lv.{{ brawlerItem.brawler.power }}</van-tag>
                  <div style="width: 13vw;font-size: 12px;color: black;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :class="{name: brawlerItem.name === myName}">{{brawlerItem.name}}</div>
                  <div style="color: black;font-size: 12px;margin-top: -2px">
                    <img style="vertical-align: middle" src="@/assets/icon_trophy_small.png" alt="" width="13px">
                    <span v-if="item.battle.type === 'teamRanked' || item.battle.type === 'soloRanked'" style="vertical-align: middle">{{brawlerItem.brawler.trophies | rankNum}}</span>
                    <span v-else style="vertical-align: middle">{{brawlerItem.brawler.trophies}}</span>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!--吃鸡-->
        <div v-if="item.event.mode === 'soloShowdown' || item.event.mode === 'duoShowdown'">
          <a-descriptions title="对战详情" style="margin-left: 20px">
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
        <!--社区图吃鸡-->
        <div v-if="item.event.mode === undefined && (item.battle.mode === 'soloShowdown' || item.battle.mode === 'duoShowdown')">
          <a-descriptions title="对战详情" style="margin-left: 20px">
            <a-descriptions-item label="比赛时间">
              {{ item.battleTime | dateFormatter }}
            </a-descriptions-item>
            <a-descriptions-item label="类型">
              社区地图
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <!--车轮擂台赛-->
        <div v-if="item.event.mode === 'duels'" style="text-align: center">
          <div style="display: inline-block">
            <div style="color: black;margin-bottom: 4px">
              <span style="margin-right: 12vw">
                <i style="font-weight: bold" class="iconfont icon-shijian"></i>
                <span style="font-size: 16px;margin-left: 5px">{{ item.battleTime | dateFormatter }}</span>
              </span>
              <span>
                <i style="font-size: 15px" class="iconfont icon-zbds_shalou"></i>
                <span style="font-size: 16px;margin-left: 3px">{{ item.battle.duration === undefined? '暂无数据' : item.battle.duration > 60? Math.floor(item.battle.duration / 60) + '分' + (item.battle.duration % 60) + '秒' : item.battle.duration + '秒' }}</span>
              </span>
            </div>
          </div>
          <van-divider style="margin: 0 0 10px 0"></van-divider>
          <!--阵容-->
          <div style="display: inline-block; margin: 0 auto;">
            <div style="display: flex; margin: 0 auto;align-items: center">
              <div style="text-align: center;display: inline-block">
                <div v-for="(item, index) in item.battle.players[0].brawlers" :key="index" style="display: inline-block;text-align: center;margin: 0 3px">
                  <img :src="require('../assets/brawlers/'+ item.id +'.png')" alt="" style="width: 13vw;display: block">
                  <van-tag plain type="primary" :color="item.power === 11? 'rgb(114,46,209)': item.power === 10? 'rgb(19,194,194)': 'rgb(82,196,26)'">Lv.{{ item.power }}</van-tag>
                  <div style="color: black;font-size: 12px;margin-top: -2px">
                    <img style="vertical-align: middle" src="@/assets/icon_trophy_small.png" alt="" width="13px">
                    <span style="vertical-align: middle">{{item.trophies}}</span>
                  </div>
                </div>
                <div style="font-size: 12px;color: black" :class="{name: item.battle.players[0].name === myName}">{{item.battle.players[0].name}}</div>
              </div>
              <div style="text-align: center;display: inline-block;">
                <i style="font-size: 20px;padding: 0 1px" class="iconfont icon-duizhan2x"></i>
              </div>
              <div style="text-align: center;display: inline-block">
                <span v-for="(item, index) in item.battle.players[1].brawlers" :key="index" style="display: inline-block;text-align: center;margin: 0 3px">
                  <img :src="require('../assets/brawlers/'+ item.id +'.png')" alt="" style="width: 13vw;display: block">
                  <van-tag plain type="primary" :color="item.power === 11? 'rgb(114,46,209)': item.power === 10? 'rgb(19,194,194)': 'rgb(82,196,26)'">Lv.{{ item.power }}</van-tag>
                  <div style="color: black;font-size: 12px;margin-top: -2px">
                    <img style="vertical-align: middle" src="@/assets/icon_trophy_small.png" alt="" width="13px">
                    <span style="vertical-align: middle">{{item.trophies}}</span>
                  </div>
                </span>
                <div style="font-size: 12px;color: black" :class="{name: item.battle.players[1].name === myName}">{{item.battle.players[1].name}}</div>
              </div>
            </div>
          </div>
        </div>
        <!--机甲入侵-->
        <div v-if="item.event.mode === 'roboRumble'">
          <van-row>
            <van-col span="10">
              <a-descriptions title="对战详情">
                <a-descriptions-item label="比赛时间">
                  <b>{{ item.battleTime | dateFormatter }}</b>
                </a-descriptions-item>
              </a-descriptions>
            </van-col>
            <van-col span="14">
              <div style="text-align: center">
                <span v-for="(item, index) in item.battle.players" :key="index" style="display: inline-block;text-align: center;margin: 0vh 8px 0 0">
                  <img :src="require('../assets/brawlers/'+ item.brawler.id +'.png')" alt="" style="width: 15vw;display: block">
                  <van-tag plain type="primary">Lv.{{ item.brawler.power }}</van-tag>
                  <div style="width: 15vw;font-size: 0.2em;color: black;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :class="{name: item.name === myName}">{{item.name}}</div>
                </span>
              </div>
            </van-col>
          </van-row>
        </div>
        <!--天选之战-->
        <div v-if="item.event.mode === 'bigGame'">
          <van-row>
            <van-col span="10">
              <a-descriptions style="margin-left: 10px">
                <a-descriptions-item label="比赛时间">
                  <b>{{ item.battleTime | dateFormatter }}</b>
                </a-descriptions-item>
              </a-descriptions>
              <div style="margin-left: 20px;text-align: center">
                <div style="color: black">天选英雄</div>
                <img :src="require('../assets/brawlers/'+ item.battle.bigBrawler.brawler.id +'.png')" alt="" style="width: 15vw;">
                <br>
                <van-tag plain type="primary">Lv.{{ item.battle.bigBrawler.brawler.power }}</van-tag>
                <br>
                <span style="width: 15vw;font-size: 0.2em;color: black;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :class="{name: item.battle.bigBrawler.name === myName}">{{item.battle.bigBrawler.name}}</span>
              </div>
            </van-col>
            <van-col span="14">
              <div style="text-align: center">
                <span v-for="(item, index) in item.battle.players" :key="index" style="display: inline-block;text-align: center;margin: 0vh 8px 0 0">
                  <img :src="require('../assets/brawlers/'+ item.brawler.id +'.png')" alt="" style="width: 15vw;display: block">
                  <van-tag plain type="primary">Lv.{{ item.brawler.power }}</van-tag>
                  <div style="width: 15vw;font-size: 0.2em;color: black;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :class="{name: item.name === myName}">{{item.name}}</div>
                </span>
              </div>
            </van-col>
          </van-row>
        </div>

        <div v-if="item.event.mode === 'unknown'">

        </div>
      </van-collapse-item>
    </van-collapse>
    <div style="height: 10vh"></div>
  </div>
</template>

<script>
import moment from "moment"
import * as echarts from 'echarts';

export default {
  name: "RecentEvents",
  data(){
    return{
      battleLogs: [],
      trophies: 0,
      victoryNum: 0,
      defeatNum: 0,
      drawNum: 0,
      myMVP: 0,
      winRate: 0,
      MVPRate: 0,
      myName: '',
      activeNames: [''],
      checkboxValue:'all',
      sheetShow:false,
      brawlUse: {},
      brawlUseSorted: [],
      modeNum: [],
      selectModeIndex: -1,
      showFeedback: true,
      showFeedbackResult: false
    }
  },
  methods: {
    summary() {
      var victory = 0
      var defeat = 0
      var draw = 0
      var myMVP = 0
      for (let i in this.battleLogs) {
        if(this.battleLogs[i].event.mode !== 'unknown'){
          if ('starPlayer' in this.battleLogs[i].battle) {
            if (this.battleLogs[i].battle.starPlayer !== null) {
              if (this.battleLogs[i].battle.starPlayer.name === this.myName)
                myMVP++
            }
          }
          if('result' in this.battleLogs[i].battle){
            if (this.battleLogs[i].battle.result === 'victory') {
              victory++
            } else if (this.battleLogs[i].battle.result === 'defeat') {
              defeat++
            } else if (this.battleLogs[i].battle.result === 'draw') {
              draw++
            }
          }
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
    isMyMvp(data){
      if('starPlayer' in data){
        if(data.starPlayer !== null){
          return data.starPlayer.name === this.myName;
        }
        else return false
      }
      else {
        return false
      }
    },
    showEvents(battle){
      if(this.checkboxValue === 'all') return true
      else{
        if(this.checkboxValue === 'mvp'){
          if('starPlayer' in battle){
            if(battle.starPlayer !== null){
              return battle.starPlayer.name === this.myName;
            }
          }
        }
        else{
          return battle.result === this.checkboxValue
        }
      }

    },
    calBrawlersUse() {
      let data = {}
      for (let item in this.battleLogs) {
        let battleLogsItem = this.battleLogs[item]
        if(battleLogsItem.event.mode !== 'unknown' || battleLogsItem.battle.mode !== 'unknown'){
          //处理3V3
          if ('teams' in battleLogsItem.battle && battleLogsItem.battle.teams.length === 2) {
            let teams = battleLogsItem.battle.teams
            for (let i in teams[0]) {
              if (teams[0][i].name === this.myName) {
                if (teams[0][i].brawler.id in data) {
                  if (battleLogsItem.battle.result === 'victory') {
                    data[teams[0][i].brawler.id][0]++
                    data[teams[0][i].brawler.id][1]++
                  }
                  if (battleLogsItem.battle.result === 'defeat') {
                    data[teams[0][i].brawler.id][0]++
                    data[teams[0][i].brawler.id][2]++
                  }
                } else {
                  if (battleLogsItem.battle.result === 'victory') {
                    data[teams[0][i].brawler.id] = [1, 1, 0]
                  }
                  if (battleLogsItem.battle.result === 'defeat') {
                    data[teams[0][i].brawler.id] = [1, 0, 1]
                  }
                }
              }
            }
            for (let i in teams[1]) {
              if (teams[1][i].name === this.myName) {
                if (teams[1][i].brawler.id in data) {
                  if (battleLogsItem.battle.result === 'victory') {
                    data[teams[1][i].brawler.id][0]++
                    data[teams[1][i].brawler.id][1]++
                  }
                  if (battleLogsItem.battle.result === 'defeat') {
                    data[teams[1][i].brawler.id][0]++
                    data[teams[1][i].brawler.id][2]++
                  }
                } else {
                  if (battleLogsItem.battle.result === 'victory') {
                    data[teams[1][i].brawler.id] = [1, 1, 0]
                  }
                  if (battleLogsItem.battle.result === 'defeat') {
                    data[teams[1][i].brawler.id] = [1, 0, 1]
                  }
                }
              }
            }
          }
          //处理车轮战
          if(battleLogsItem.battle.mode === 'duels'){
            if(battleLogsItem.battle.players[0].name === this.myName){
              for(let i in battleLogsItem.battle.players[0].brawlers){
                let brawlersItem = battleLogsItem.battle.players[0].brawlers
                if (brawlersItem[i].id in data) {
                  if (battleLogsItem.battle.result === 'victory') {
                    data[brawlersItem[i].id][0]++
                    data[brawlersItem[i].id][1]++
                  }
                  if (battleLogsItem.battle.result === 'defeat') {
                    data[brawlersItem[i].id][0]++
                    data[brawlersItem[i].id][2]++
                  }
                } else {
                  if (battleLogsItem.battle.result === 'victory') {
                    data[brawlersItem[i].id] = [1, 1, 0]
                  }
                  if (battleLogsItem.battle.result === 'defeat') {
                    data[brawlersItem[i].id] = [1, 0, 1]
                  }
                }
              }
            }
            else if(battleLogsItem.battle.players[1].name === this.myName){
              for(let i in battleLogsItem.battle.players[1].brawlers){
                let brawlersItem = battleLogsItem.battle.players[1].brawlers
                if (brawlersItem[i].id in data) {
                  if (battleLogsItem.battle.result === 'victory') {
                    data[brawlersItem[i].id][0]++
                    data[brawlersItem[i].id][1]++
                  }
                  if (battleLogsItem.battle.result === 'defeat') {
                    data[brawlersItem[i].id][0]++
                    data[brawlersItem[i].id][2]++
                  }
                } else {
                  if (battleLogsItem.battle.result === 'victory') {
                    data[brawlersItem[i].id] = [1, 1, 0]
                  }
                  if (battleLogsItem.battle.result === 'defeat') {
                    data[brawlersItem[i].id] = [1, 0, 1]
                  }
                }
              }
            }
          }
        }
      }
      var brawlUseSorted = Object.keys(data).sort((a,b)=>{
        return data[b][0]-data[a][0];
      });
      this.brawlUse = data
      this.brawlUseSorted = brawlUseSorted
    },
    calModeNum(){
      //0宝石，1足球，2赏金，3金库，4热区，5机甲，6淘汰赛，7单鸡，8双鸡，9车轮战，10积分战,11推车，12篮球，13机甲天降
      //[序号，次数，胜场，负场]
      let data = [[0,0,0,0],[1,0,0,0],[2,0,0,0],[3,0,0,0],[4,0,0,0],[5,0,0,0],[6,0,0,0],[7,0],[8,0],[9,0,0,0],[10,0,0,0],[11,0,0,0],[12,0,0,0],[13,0,0,0]]
      for(let item in this.battleLogs){
        let battleItem = this.battleLogs[item].battle
        if(this.battleLogs[item].event.mode !== 'unknown' || this.battleLogs[item].battle.mode !== 'unknown'){
          if(battleItem.mode === 'gemGrab'){
            if (battleItem.result === 'victory') {
              data[0][1]++
              data[0][2]++
            }
            if (battleItem.result === 'defeat') {
              data[0][1]++
              data[0][3]++
            }
          }
          else if(battleItem.mode === 'brawlBall'){
            if (battleItem.result === 'victory') {
              data[1][1]++
              data[1][2]++
            }
            if (battleItem.result === 'defeat') {
              data[1][1]++
              data[1][3]++
            }
          }
          else if(battleItem.mode === 'bounty'){
            if (battleItem.result === 'victory') {
              data[2][1]++
              data[2][2]++
            }
            if (battleItem.result === 'defeat') {
              data[2][1]++
              data[2][3]++
            }
          }
          else if(battleItem.mode === 'heist'){
            if (battleItem.result === 'victory') {
              data[3][1]++
              data[3][2]++
            }
            if (battleItem.result === 'defeat') {
              data[3][1]++
              data[3][3]++
            }
          }
          else if(battleItem.mode === 'hotZone'){
            if (battleItem.result === 'victory') {
              data[4][1]++
              data[4][2]++
            }
            if (battleItem.result === 'defeat') {
              data[4][1]++
              data[4][3]++
            }
          }
          else if(battleItem.mode === 'siege'){
            if (battleItem.result === 'victory') {
              data[5][1]++
              data[5][2]++
            }
            if (battleItem.result === 'defeat') {
              data[5][1]++
              data[5][3]++
            }
          }
          else if(battleItem.mode === 'knockout'){
            if (battleItem.result === 'victory') {
              data[6][1]++
              data[6][2]++
            }
            if (battleItem.result === 'defeat') {
              data[6][1]++
              data[6][3]++
            }
          }
          else if(battleItem.mode === 'soloShowdown'){
            data[7][1]++
          }
          else if(battleItem.mode === 'duoShowdown'){
            data[8][1]++
          }
          else if(battleItem.mode === 'duels'){
            if (battleItem.result === 'victory') {
              data[9][1]++
              data[9][2]++
            }
            if (battleItem.result === 'defeat') {
              data[9][1]++
              data[9][3]++
            }
          }
          else if(battleItem.mode === 'wipeout'){
            if (battleItem.result === 'victory') {
              data[10][1]++
              data[10][2]++
            }
            if (battleItem.result === 'defeat') {
              data[10][1]++
              data[10][3]++
            }
          }
          else if(battleItem.mode === 'payload'){
            if (battleItem.result === 'victory') {
              data[11][1]++
              data[11][2]++
            }
            if (battleItem.result === 'defeat') {
              data[11][1]++
              data[11][3]++
            }
          }
          else if(battleItem.mode === 'basketBrawl'){
            if (battleItem.result === 'victory') {
              data[12][1]++
              data[12][2]++
            }
            if (battleItem.result === 'defeat') {
              data[12][1]++
              data[12][3]++
            }
          }
          else if(battleItem.mode === 'invasion'){
            if (battleItem.result === 'victory') {
              data[13][1]++
              data[13][2]++
            }
            if (battleItem.result === 'defeat') {
              data[13][1]++
              data[13][3]++
            }
          }
        }
      }
      data = data.sort(function(x, y){
        return y[1] - x[1];
      });
      this.modeNum = data
    },
    selectModeIndexFn(data){
      if(this.selectModeIndex === data){
        this.selectModeIndex = -1
      }
      else{
        this.selectModeIndex = data
      }
    },
    selectMode(data){
      if(this.selectModeIndex === -1){
        return true
      }
      else{
        let mode = ['gemGrab', 'brawlBall', 'bounty', 'heist', 'hotZone', 'siege', 'knockout', 'soloShowdown', 'duoShowdown', 'duels', 'wipeout', 'payload', 'basketBrawl', 'invasion']
        return mode[this.selectModeIndex] === data.mode
      }
    },
    drawChart(){
      let chartDom = this.$refs.chart
      let myChart = echarts.init(chartDom);
      let option;
      let trophiesData = [0];
      let trophiesDataItem = 1
      let wid = this.$refs.summaryCard.clientWidth
      for(let i = this.battleLogs.length - 1;i > 0;i --, trophiesDataItem++){
        trophiesData.push(
            'trophyChange' in this.battleLogs[i].battle && this.battleLogs[i].battle.type === 'ranked'?
                this.battleLogs[i].battle.trophyChange + trophiesData[trophiesDataItem - 1]:
                trophiesData[trophiesDataItem - 1]
        )
      }
      option = {
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            snap: true,
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        color: ['rgb(255,213,145)'],
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value',
          minInterval: 8,
          splitLine: {
            show: false
          }
        },
        series: [
          {
            data: trophiesData,
            type: 'line',
            smooth: true,
            symbol: "none",
            lineStyle: {
              width: 2.5
            }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            show: true,
            start: 40,
            end: 100,
            xAxisIndex: 0,
            height: 20,
            moveHandleSize: 12,
            left: 10,
            width: wid,
            moveHandleStyle: {
              color: "rgba(223, 230, 243, 0.6)"
            },
            fillerColor: "rgba(167, 183, 204, 0.1)",
            handleSize: 30
          }
        ]
      };
      option && myChart.setOption(option);
    }
  },
  filters: {
    //时间转换过滤器
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
    },
    checkboxValue(data){
      switch (data){
        case 'all':
          return '全部'
        case 'victory':
          return '仅看获胜'
        case 'defeat':
          return '仅看战败'
        case 'mvp':
          return '仅看MVP'
      }
    },
    momentTrans(data){
      return moment(data).fromNow()
    },
    rankNum(data){
      switch (data){
        case 1: return '青铜1'
        case 2: return '青铜2'
        case 3: return '青铜3'
        case 4: return '白银1'
        case 5: return '白银2'
        case 6: return '白银3'
        case 7: return '黄金1'
        case 8: return '黄金2'
        case 9: return '黄金3'
        case 10: return '钻石1'
        case 11: return '钻石2'
        case 12: return '钻石3'
        case 13: return '神话1'
        case 14: return '神话2'
        case 15: return '神话3'
        case 16: return '传奇1'
        case 17: return '传奇2'
        case 18: return '传奇3'
        case 19: return '大师'
      }
    }
  },
  mounted() {
    this.$bus.$on('myName', (data) => {
      this.myName = data
    })
    this.$bus.$on('PersonalTrophies', (data) => {
      this.trophies = data
    })
    this.$bus.$on('BattleLogs', (data) => {
      this.battleLogs = data
      this.summary()

      this.calBrawlersUse()
      this.calModeNum()
      this.drawChart()
    })
    localStorage.getItem('feedback0504') === 'false'? this.showFeedback = false: ''
  },
  watch: {
    battleLogs: function (){
      this.selectModeIndex = -1
    }
  }
}
</script>

<style>
@import 'https://at.alicdn.com/t/font_3113095_xl8kzdgoexd.css';

.van-collapse-item--border::after{
  border-top: 1px solid rgba(57,118,227,0.3);
}

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
.battlelogsIndexNull{
  background-color: lightgray;
}
.name{
  font-weight: bold;
}
.van-collapse-item__content{
  padding: 12px 0 !important;
}
.mvpSpan{
  margin-right: 7vw;
  display: inline-block;
  width: 30vw;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-break:keep-all;
  vertical-align: top;
}
.brawlerUse{
  margin: 0 auto;
  padding-top: 1vh;
  display: flex;
  width: 45vw;
  overflow-x: scroll;
  overflow-y: hidden;
}
.modeNum{
  margin: 0 auto;
  padding-top: 1vh;
  display: flex;
  width: 45vw;
  overflow-x: scroll;
  overflow-y: hidden;
}
.brawlerUseItem{
  margin-right: 10px;
  text-align: center;
  border: 1px solid rgb(232,232,232);
  padding: 15px 10px 6px;
}
.modeNumItem{
  margin-right: 10px;
  text-align: center;
  border: 1px solid rgb(232,232,232);
  padding: 15px 10px 6px;
}
.modeNumItemActive{
  border: 1px solid rgb(57,118,227);
}
#backTop{
  bottom: 8vh;
}
.result{
  font-family: '黑体';
  font-weight: bold;
  font-size: 20px;
  text-align: right;
  /*vertical-align: middle;*/
  text-shadow: rgb(40,44,52) 1px 0 0, rgb(40,44,52) 0 1px 0, rgb(40,44,52) -1px 0 0, rgb(40,44,52) 0 -1px 0;
  /*margin-left: auto;*/
  /*margin-right: 3px;*/
}
.winColor{
  color: rgb(103,194,58);
}
.loseColor{
  color: rgb(245,108,108);
}
.drawColor{
  color: rgb(64,158,255);
}
.otherColor{
  color: rgb(143, 147, 154);
}

.feedback{
  display: flex;
  justify-content: center;
  margin: 5px 0 0 0;
  align-items: center;
}
</style>
