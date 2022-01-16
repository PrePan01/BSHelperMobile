<template>
  <div  v-loading="loading">
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

    <el-table
        :data="battlelogs"
        border
        style="width: 100%; margin-top: 20px">
      <el-table-column
          prop="battleTime"
          label="比赛时间"
          align="center"
          :formatter="dateFormatter"
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

        <el-table-column label="" align="center" width="450">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.battle.teams[0]" :key="index" v-show="scope.row.battle.teams.length === 2">
              <div style="display: inline-block;text-align: center;width: 140px;margin-top: 10px">
                <img :src="require('../../assets/brawlers/'+ item.brawler.id +'.png')" alt="" width="60px">
                <br>
                <span>{{ item.name }}</span>
                <br>
                <span style="font-size: 16px">Lv.{{ item.brawler.power }}</span>
              </div>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="" align="center" width="450">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.battle.teams[1]" :key="index" v-show="scope.row.battle.teams.length === 2">
              <div style="display: inline-block;text-align: center;width: 140px">
                <img :src="require('../../assets/brawlers/'+ item.brawler.id +'.png')" alt="" width="60px">
                <br>
                <span>{{ item.name }}</span>
                <br>
                <span style="font-size: 16px">Lv.{{ item.brawler.power }}</span>
              </div>
            </span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

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
      battlelogs: [
          {
        "battleTime": "20220115T124632.000Z",
        "event": {
          "id": 15000413,
          "mode": "brawlBall",
          "map": "Sticky Notes"
        },
        "battle": {
          "mode": "brawlBall",
          "type": "ranked",
          "result": "draw",
          "duration": 210,
          "starPlayer": {
            "tag": "#LLQ0U8PR",
            "name": "PLS☆PrePan",
            "brawler": {
              "id": 16000045,
              "name": "STU",
              "power": 10,
              "trophies": 706
            }
          },
          "teams": [
            [{
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 10,
                "trophies": 706
              }
            }, {
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000053,
                "name": "LOLA",
                "power": 9,
                "trophies": 36
              }
            }, {
              "tag": "#92RV89QPL",
              "name": "alvin",
              "brawler": {
                "id": 16000038,
                "name": "SURGE",
                "power": 9,
                "trophies": 733
              }
            }],
            [{
              "tag": "#28JJR9CCG",
              "name": "Thanos Jr",
              "brawler": {
                "id": 16000000,
                "name": "SHELLY",
                "power": 11,
                "trophies": 705
              }
            }, {
              "tag": "#GVRGVQUL",
              "name": "Yeetosaurus",
              "brawler": {
                "id": 16000030,
                "name": "EMZ",
                "power": 9,
                "trophies": 704
              }
            }, {
              "tag": "#P8JP2JJ92",
              "name": "shadowkiller99",
              "brawler": {
                "id": 16000012,
                "name": "CROW",
                "power": 10,
                "trophies": 715
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T124159.000Z",
        "event": {
          "id": 15000413,
          "mode": "brawlBall",
          "map": "Sticky Notes"
        },
        "battle": {
          "mode": "brawlBall",
          "type": "ranked",
          "result": "victory",
          "duration": 31,
          "trophyChange": 8,
          "starPlayer": {
            "tag": "#LLQ0U8PR",
            "name": "PLS☆PrePan",
            "brawler": {
              "id": 16000045,
              "name": "STU",
              "power": 10,
              "trophies": 698
            }
          },
          "teams": [
            [{
              "tag": "#U8LQRYRQ",
              "name": "tribe|insane⚡️",
              "brawler": {
                "id": 16000026,
                "name": "BIBI",
                "power": 9,
                "trophies": 664
              }
            }, {
              "tag": "#JR0PLU09",
              "name": "⛩|PB💖Marcy🦄☔️",
              "brawler": {
                "id": 16000009,
                "name": "DYNAMIKE",
                "power": 9,
                "trophies": 694
              }
            }, {
              "tag": "#2U8J8QQY9",
              "name": "嘿！荒野死神",
              "brawler": {
                "id": 16000011,
                "name": "MORTIS",
                "power": 9,
                "trophies": 682
              }
            }],
            [{
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 10,
                "trophies": 698
              }
            }, {
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000053,
                "name": "LOLA",
                "power": 9,
                "trophies": 28
              }
            }, {
              "tag": "#2JP2880JR",
              "name": "ice lemon tea",
              "brawler": {
                "id": 16000032,
                "name": "MAX",
                "power": 9,
                "trophies": 695
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T124102.000Z",
        "event": {
          "id": 15000413,
          "mode": "brawlBall",
          "map": "Sticky Notes"
        },
        "battle": {
          "mode": "brawlBall",
          "type": "ranked",
          "result": "defeat",
          "duration": 158,
          "trophyChange": -6,
          "starPlayer": {
            "tag": "#R2GGCY0G",
            "name": "공포의 레드와이파이",
            "brawler": {
              "id": 16000052,
              "name": "MEG",
              "power": 10,
              "trophies": 467
            }
          },
          "teams": [
            [{
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000053,
                "name": "LOLA",
                "power": 9,
                "trophies": 28
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000044,
                "name": "COLONEL RUFFS",
                "power": 9,
                "trophies": 518
              }
            }, {
              "tag": "#2PLCC8GCG",
              "name": "그리핀도르",
              "brawler": {
                "id": 16000049,
                "name": "BUZZ",
                "power": 9,
                "trophies": 489
              }
            }],
            [{
              "tag": "#8CL08GV9Y",
              "name": "🔥CHS | NBV🔥",
              "brawler": {
                "id": 16000012,
                "name": "CROW",
                "power": 7,
                "trophies": 460
              }
            }, {
              "tag": "#R2GGCY0G",
              "name": "공포의 레드와이파이",
              "brawler": {
                "id": 16000052,
                "name": "MEG",
                "power": 10,
                "trophies": 467
              }
            }, {
              "tag": "#L0VRQQUPG",
              "name": "りはたはた",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 6,
                "trophies": 488
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T123758.000Z",
        "event": {
          "id": 15000413,
          "mode": "brawlBall",
          "map": "Sticky Notes"
        },
        "battle": {
          "mode": "brawlBall",
          "type": "ranked",
          "result": "victory",
          "duration": 177,
          "trophyChange": 8,
          "starPlayer": {
            "tag": "#JRGJ9R2Q",
            "name": "sameatfudge",
            "brawler": {
              "id": 16000011,
              "name": "MORTIS",
              "power": 9,
              "trophies": 723
            }
          },
          "teams": [
            [{
              "tag": "#9L8LJ898",
              "name": "YOU",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 8,
                "trophies": 203
              }
            }, {
              "tag": "#PLYPJ89Q",
              "name": "Victory289",
              "brawler": {
                "id": 16000025,
                "name": "CARL",
                "power": 9,
                "trophies": 733
              }
            }, {
              "tag": "#89CY8UUG2",
              "name": "IDRIS H0PK1N5",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 9,
                "trophies": 617
              }
            }],
            [{
              "tag": "#JRGJ9R2Q",
              "name": "sameatfudge",
              "brawler": {
                "id": 16000011,
                "name": "MORTIS",
                "power": 9,
                "trophies": 723
              }
            }, {
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000037,
                "name": "SPROUT",
                "power": 11,
                "trophies": 694
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000044,
                "name": "COLONEL RUFFS",
                "power": 9,
                "trophies": 510
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T123445.000Z",
        "event": {
          "id": 15000413,
          "mode": "brawlBall",
          "map": "Sticky Notes"
        },
        "battle": {
          "mode": "brawlBall",
          "type": "ranked",
          "result": "draw",
          "duration": 210,
          "starPlayer": {
            "tag": "#982QVLVJC",
            "name": "おまる",
            "brawler": {
              "id": 16000045,
              "name": "STU",
              "power": 9,
              "trophies": 708
            }
          },
          "teams": [
            [{
              "tag": "#2VYVUVUCV",
              "name": "タクミ",
              "brawler": {
                "id": 16000043,
                "name": "EDGAR",
                "power": 9,
                "trophies": 714
              }
            }, {
              "tag": "#9CJJ2PYR2",
              "name": "イブ|ピヨ族の族長🐥",
              "brawler": {
                "id": 16000026,
                "name": "BIBI",
                "power": 9,
                "trophies": 717
              }
            }, {
              "tag": "#2QPVJLLCY",
              "name": "YUUTO",
              "brawler": {
                "id": 16000011,
                "name": "MORTIS",
                "power": 10,
                "trophies": 703
              }
            }],
            [{
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000037,
                "name": "SPROUT",
                "power": 11,
                "trophies": 694
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000044,
                "name": "COLONEL RUFFS",
                "power": 9,
                "trophies": 510
              }
            }, {
              "tag": "#982QVLVJC",
              "name": "おまる",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 9,
                "trophies": 708
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T123056.000Z",
        "event": {
          "id": 15000413,
          "mode": "brawlBall",
          "map": "Sticky Notes"
        },
        "battle": {
          "mode": "brawlBall",
          "type": "ranked",
          "result": "defeat",
          "duration": 65,
          "trophyChange": -6,
          "starPlayer": {
            "tag": "#80L0UPY0U",
            "name": "Bé Quỳnh 5 tuổi",
            "brawler": {
              "id": 16000010,
              "name": "EL PRIMO",
              "power": 10,
              "trophies": 719
            }
          },
          "teams": [
            [{
              "tag": "#80L0UPY0U",
              "name": "Bé Quỳnh 5 tuổi",
              "brawler": {
                "id": 16000010,
                "name": "EL PRIMO",
                "power": 10,
                "trophies": 719
              }
            }, {
              "tag": "#8VLQRY8PR",
              "name": "Tassoslui",
              "brawler": {
                "id": 16000011,
                "name": "MORTIS",
                "power": 10,
                "trophies": 676
              }
            }, {
              "tag": "#LP8YPP",
              "name": "J.H.LIMON",
              "brawler": {
                "id": 16000012,
                "name": "CROW",
                "power": 10,
                "trophies": 680
              }
            }],
            [{
              "tag": "#88RC2VCLL",
              "name": "Mario",
              "brawler": {
                "id": 16000011,
                "name": "MORTIS",
                "power": 10,
                "trophies": 699
              }
            }, {
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000037,
                "name": "SPROUT",
                "power": 11,
                "trophies": 702
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000044,
                "name": "COLONEL RUFFS",
                "power": 9,
                "trophies": 516
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T122808.000Z",
        "event": {
          "id": 15000037,
          "mode": "duoShowdown",
          "map": "Feast or Famine"
        },
        "battle": {
          "mode": "duoShowdown",
          "type": "challenge",
          "rank": 4,
          "teams": [
            [{
              "tag": "#P2P8UJQGQ",
              "name": "yt帅氣的某某人",
              "brawler": {
                "id": 16000010,
                "name": "EL PRIMO",
                "power": 11,
                "trophies": 602
              }
            }, {
              "tag": "#PJJP9YYQY",
              "name": "Keith",
              "brawler": {
                "id": 16000017,
                "name": "TARA",
                "power": 11,
                "trophies": 602
              }
            }],
            [{
              "tag": "#RV8J9UCG",
              "name": "devil",
              "brawler": {
                "id": 16000049,
                "name": "BUZZ",
                "power": 11,
                "trophies": 602
              }
            }, {
              "tag": "#8CUY9GP90",
              "name": "(人1s",
              "brawler": {
                "id": 16000034,
                "name": "JACKY",
                "power": 11,
                "trophies": 601
              }
            }],
            [{
              "tag": "#PQ088J20",
              "name": "bhavithran",
              "brawler": {
                "id": 16000036,
                "name": "NANI",
                "power": 11,
                "trophies": 602
              }
            }, {
              "tag": "#LQGR8UY2G",
              "name": "KornRocket555",
              "brawler": {
                "id": 16000004,
                "name": "RICO",
                "power": 11,
                "trophies": 602
              }
            }],
            [{
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000024,
                "name": "ROSA",
                "power": 11,
                "trophies": 602
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000053,
                "name": "LOLA",
                "power": 11,
                "trophies": 602
              }
            }],
            [{
              "tag": "#2G2J0JUVQ",
              "name": "Vishesh",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 11,
                "trophies": 601
              }
            }, {
              "tag": "#YUYRJU88G",
              "name": "SN|Sabertooth",
              "brawler": {
                "id": 16000043,
                "name": "EDGAR",
                "power": 11,
                "trophies": 602
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T122506.000Z",
        "event": {
          "id": 15000102,
          "mode": "duoShowdown",
          "map": "Dark Passage"
        },
        "battle": {
          "mode": "duoShowdown",
          "type": "challenge",
          "rank": 2,
          "trophyChange": 1,
          "teams": [
            [{
              "tag": "#CCQ0C9QJ",
              "name": "曜 cynical 💫",
              "brawler": {
                "id": 16000038,
                "name": "SURGE",
                "power": 11,
                "trophies": 502
              }
            }, {
              "tag": "#P88U2U92Q",
              "name": "⚜RASHED⚜",
              "brawler": {
                "id": 16000012,
                "name": "CROW",
                "power": 11,
                "trophies": 502
              }
            }],
            [{
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000012,
                "name": "CROW",
                "power": 11,
                "trophies": 502
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000053,
                "name": "LOLA",
                "power": 11,
                "trophies": 502
              }
            }],
            [{
              "tag": "#8LQCLY89C",
              "name": "Elroy chanel",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 11,
                "trophies": 502
              }
            }, {
              "tag": "#P9R2UCYQ",
              "name": "Herwiee",
              "brawler": {
                "id": 16000046,
                "name": "BELLE",
                "power": 11,
                "trophies": 501
              }
            }],
            [{
              "tag": "#V2CUGP90",
              "name": "69|THE NOOB☯️",
              "brawler": {
                "id": 16000011,
                "name": "MORTIS",
                "power": 11,
                "trophies": 501
              }
            }, {
              "tag": "#PPUJ0CRRU",
              "name": "BRUH",
              "brawler": {
                "id": 16000046,
                "name": "BELLE",
                "power": 11,
                "trophies": 501
              }
            }],
            [{
              "tag": "#8JLRVGJQC",
              "name": "mango yin",
              "brawler": {
                "id": 16000042,
                "name": "BYRON",
                "power": 11,
                "trophies": 502
              }
            }, {
              "tag": "#VG0GGLU2",
              "name": "KKP123",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 11,
                "trophies": 502
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T122218.000Z",
        "event": {
          "id": 15000102,
          "mode": "duoShowdown",
          "map": "Dark Passage"
        },
        "battle": {
          "mode": "duoShowdown",
          "type": "challenge",
          "rank": 1,
          "trophyChange": 1,
          "teams": [
            [{
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000012,
                "name": "CROW",
                "power": 11,
                "trophies": 402
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000053,
                "name": "LOLA",
                "power": 11,
                "trophies": 402
              }
            }],
            [{
              "tag": "#98JYRYYPQ",
              "name": "your mom",
              "brawler": {
                "id": 16000032,
                "name": "MAX",
                "power": 11,
                "trophies": 402
              }
            }, {
              "tag": "#98L0G928U",
              "name": "我係大人",
              "brawler": {
                "id": 16000043,
                "name": "EDGAR",
                "power": 11,
                "trophies": 402
              }
            }],
            [{
              "tag": "#CP8RUVC8",
              "name": "敏锐|√ﾘシ|トリハード",
              "brawler": {
                "id": 16000001,
                "name": "COLT",
                "power": 11,
                "trophies": 402
              }
            }, {
              "tag": "#2PYJRR9UQ",
              "name": "BOSS[RSK-B]",
              "brawler": {
                "id": 16000043,
                "name": "EDGAR",
                "power": 11,
                "trophies": 401
              }
            }],
            [{
              "tag": "#PVV9G02QL",
              "name": "fighter",
              "brawler": {
                "id": 16000018,
                "name": "DARRYL",
                "power": 11,
                "trophies": 401
              }
            }, {
              "tag": "#GGYLLY8L",
              "name": "TauFiqq",
              "brawler": {
                "id": 16000042,
                "name": "BYRON",
                "power": 11,
                "trophies": 401
              }
            }],
            [{
              "tag": "#YQ8RPYU8Q",
              "name": "nana",
              "brawler": {
                "id": 16000051,
                "name": "ASH",
                "power": 11,
                "trophies": 402
              }
            }, {
              "tag": "#CQV2CVGU",
              "name": "Dvorak",
              "brawler": {
                "id": 16000015,
                "name": "PIPER",
                "power": 11,
                "trophies": 401
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T122032.000Z",
        "event": {
          "id": 15000102,
          "mode": "duoShowdown",
          "map": "Dark Passage"
        },
        "battle": {
          "mode": "duoShowdown",
          "type": "challenge",
          "rank": 1,
          "trophyChange": 1,
          "teams": [
            [{
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000012,
                "name": "CROW",
                "power": 11,
                "trophies": 302
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000053,
                "name": "LOLA",
                "power": 11,
                "trophies": 302
              }
            }],
            [{
              "tag": "#92V0VQ0RY",
              "name": "Astro",
              "brawler": {
                "id": 16000009,
                "name": "DYNAMIKE",
                "power": 11,
                "trophies": 301
              }
            }, {
              "tag": "#988L9PJCG",
              "name": "Leigh",
              "brawler": {
                "id": 16000012,
                "name": "CROW",
                "power": 11,
                "trophies": 302
              }
            }],
            [{
              "tag": "#JV9Q28G0",
              "name": "Coconut shark",
              "brawler": {
                "id": 16000015,
                "name": "PIPER",
                "power": 11,
                "trophies": 300
              }
            }, {
              "tag": "#R8VCPR98",
              "name": "Electro vine",
              "brawler": {
                "id": 16000049,
                "name": "BUZZ",
                "power": 11,
                "trophies": 300
              }
            }],
            [{
              "tag": "#8QUR090GC",
              "name": "特殊兒童",
              "brawler": {
                "id": 16000013,
                "name": "POCO",
                "power": 11,
                "trophies": 300
              }
            }, {
              "tag": "#LYCPGRLUC",
              "name": "neko_chan",
              "brawler": {
                "id": 16000024,
                "name": "ROSA",
                "power": 11,
                "trophies": 301
              }
            }],
            [{
              "tag": "#LGP892JUJ",
              "name": "CEXE Vitchz",
              "brawler": {
                "id": 16000003,
                "name": "BROCK",
                "power": 11,
                "trophies": 302
              }
            }, {
              "tag": "#YYC8C8LLY",
              "name": "Hi :)",
              "brawler": {
                "id": 16000021,
                "name": "GENE",
                "power": 11,
                "trophies": 301
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T121939.000Z",
        "event": {
          "id": 15000102,
          "mode": "duoShowdown",
          "map": "Dark Passage"
        },
        "battle": {
          "mode": "duoShowdown",
          "type": "challenge",
          "rank": 4,
          "teams": [
            [{
              "tag": "#PU9GRRVYG",
              "name": "ゆーーや",
              "brawler": {
                "id": 16000012,
                "name": "CROW",
                "power": 11,
                "trophies": 302
              }
            }, {
              "tag": "#L02GV0CJU",
              "name": "にわとり",
              "brawler": {
                "id": 16000007,
                "name": "JESSIE",
                "power": 11,
                "trophies": 301
              }
            }],
            [{
              "tag": "#YLY8Q8RYG",
              "name": "宇航梦",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 11,
                "trophies": 301
              }
            }, {
              "tag": "#280Y82LY8",
              "name": "나죽이면 일주일동안 변비",
              "brawler": {
                "id": 16000024,
                "name": "ROSA",
                "power": 11,
                "trophies": 301
              }
            }],
            [{
              "tag": "#LQVUJUGQ2",
              "name": "嘿！盛夏",
              "brawler": {
                "id": 16000015,
                "name": "PIPER",
                "power": 11,
                "trophies": 300
              }
            }, {
              "tag": "#Y82LRUYJ2",
              "name": "宇恩",
              "brawler": {
                "id": 16000023,
                "name": "LEON",
                "power": 11,
                "trophies": 300
              }
            }],
            [{
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000012,
                "name": "CROW",
                "power": 11,
                "trophies": 301
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000053,
                "name": "LOLA",
                "power": 11,
                "trophies": 301
              }
            }],
            [{
              "tag": "#20Y098LJ9",
              "name": "찌윤이",
              "brawler": {
                "id": 16000015,
                "name": "PIPER",
                "power": 11,
                "trophies": 301
              }
            }, {
              "tag": "#2RC89YG2U",
              "name": "박성준",
              "brawler": {
                "id": 16000026,
                "name": "BIBI",
                "power": 11,
                "trophies": 301
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T121623.000Z",
        "event": {
          "id": 15000036,
          "mode": "duoShowdown",
          "map": "Rockwall Brawl"
        },
        "battle": {
          "mode": "duoShowdown",
          "type": "challenge",
          "rank": 1,
          "trophyChange": 1,
          "teams": [
            [{
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000017,
                "name": "TARA",
                "power": 11,
                "trophies": 201
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 11,
                "trophies": 201
              }
            }],
            [{
              "tag": "#89LPLL9JJ",
              "name": "_kyuuri_",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 11,
                "trophies": 201
              }
            }, {
              "tag": "#P0JY8VUGV",
              "name": "たくみ",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 11,
                "trophies": 201
              }
            }],
            [{
              "tag": "#2RP28RLJ0",
              "name": "ごめんなさい",
              "brawler": {
                "id": 16000009,
                "name": "DYNAMIKE",
                "power": 11,
                "trophies": 201
              }
            }, {
              "tag": "#2GRLPRCGL",
              "name": "サスケ(仮)",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 11,
                "trophies": 200
              }
            }],
            [{
              "tag": "#YQR809PL8",
              "name": "ポコ信者",
              "brawler": {
                "id": 16000038,
                "name": "SURGE",
                "power": 11,
                "trophies": 201
              }
            }, {
              "tag": "#8VC2J9LRJ",
              "name": "nacia pro1",
              "brawler": {
                "id": 16000004,
                "name": "RICO",
                "power": 11,
                "trophies": 202
              }
            }],
            [{
              "tag": "#YVYVUJ0",
              "name": "♡혁이팡팡♡",
              "brawler": {
                "id": 16000009,
                "name": "DYNAMIKE",
                "power": 11,
                "trophies": 202
              }
            }, {
              "tag": "#PCRGPCLJG",
              "name": "風樹之歎 <풍수지탄>",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 11,
                "trophies": 200
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T121403.000Z",
        "event": {
          "id": 15000036,
          "mode": "duoShowdown",
          "map": "Rockwall Brawl"
        },
        "battle": {
          "mode": "duoShowdown",
          "type": "challenge",
          "rank": 1,
          "trophyChange": 1,
          "teams": [
            [{
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 11,
                "trophies": 101
              }
            }, {
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000017,
                "name": "TARA",
                "power": 11,
                "trophies": 101
              }
            }],
            [{
              "tag": "#PL8QL0QCJ",
              "name": "태건",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 11,
                "trophies": 100
              }
            }, {
              "tag": "#982RPU022",
              "name": "Quỷ lửa cô hồn",
              "brawler": {
                "id": 16000043,
                "name": "EDGAR",
                "power": 11,
                "trophies": 102
              }
            }],
            [{
              "tag": "#L89L82LCP",
              "name": "Tribe|SpiderMan",
              "brawler": {
                "id": 16000011,
                "name": "MORTIS",
                "power": 11,
                "trophies": 101
              }
            }, {
              "tag": "#99VUCURCR",
              "name": "아리가도 고자이마스",
              "brawler": {
                "id": 16000004,
                "name": "RICO",
                "power": 11,
                "trophies": 102
              }
            }],
            [{
              "tag": "#8RP2200UP",
              "name": "Thunder boy67",
              "brawler": {
                "id": 16000014,
                "name": "BO",
                "power": 11,
                "trophies": 102
              }
            }, {
              "tag": "#88V00GP0P",
              "name": "supercell",
              "brawler": {
                "id": 16000049,
                "name": "BUZZ",
                "power": 11,
                "trophies": 101
              }
            }],
            [{
              "tag": "#2R229Q8CU",
              "name": "Saker Slav",
              "brawler": {
                "id": 16000013,
                "name": "POCO",
                "power": 11,
                "trophies": 100
              }
            }, {
              "tag": "#9RJV22UUY",
              "name": "Ночная Фурия",
              "brawler": {
                "id": 16000040,
                "name": "AMBER",
                "power": 11,
                "trophies": 100
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T121255.000Z",
        "event": {
          "id": 15000036,
          "mode": "duoShowdown",
          "map": "Rockwall Brawl"
        },
        "battle": {
          "mode": "duoShowdown",
          "type": "challenge",
          "rank": 5,
          "teams": [
            [{
              "tag": "#P8L9PUR92",
              "name": "無敵666",
              "brawler": {
                "id": 16000038,
                "name": "SURGE",
                "power": 11,
                "trophies": 101
              }
            }, {
              "tag": "#22PLQ988R",
              "name": "BIG CHUNGUS",
              "brawler": {
                "id": 16000027,
                "name": "8-BIT",
                "power": 11,
                "trophies": 101
              }
            }],
            [{
              "tag": "#89YGV00GL",
              "name": "lukas55",
              "brawler": {
                "id": 16000034,
                "name": "JACKY",
                "power": 11,
                "trophies": 102
              }
            }, {
              "tag": "#22U2LU9QU",
              "name": "ALDI TV",
              "brawler": {
                "id": 16000018,
                "name": "DARRYL",
                "power": 11,
                "trophies": 102
              }
            }],
            [{
              "tag": "#9J88LL2YC",
              "name": "KYANgaming",
              "brawler": {
                "id": 16000043,
                "name": "EDGAR",
                "power": 11,
                "trophies": 101
              }
            }, {
              "tag": "#2U2QQYPCP",
              "name": "CVL|Noobz🍫",
              "brawler": {
                "id": 16000003,
                "name": "BROCK",
                "power": 11,
                "trophies": 100
              }
            }],
            [{
              "tag": "#2RLQ20J9J",
              "name": "O_oεπε$_βεψO_o",
              "brawler": {
                "id": 16000043,
                "name": "EDGAR",
                "power": 11,
                "trophies": 101
              }
            }, {
              "tag": "#LVC8GJG9R",
              "name": "ssisls",
              "brawler": {
                "id": 16000007,
                "name": "JESSIE",
                "power": 11,
                "trophies": 101
              }
            }],
            [{
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000017,
                "name": "TARA",
                "power": 11,
                "trophies": 100
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 11,
                "trophies": 100
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T121031.000Z",
        "event": {
          "id": 15000036,
          "mode": "duoShowdown",
          "map": "Rockwall Brawl"
        },
        "battle": {
          "mode": "duoShowdown",
          "type": "challenge",
          "rank": 2,
          "trophyChange": 1,
          "teams": [
            [{
              "tag": "#8UJLV80J",
              "name": "Vintagecoder327",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 11,
                "trophies": 0
              }
            }, {
              "tag": "#2PLU9UG28",
              "name": "Veg",
              "brawler": {
                "id": 16000000,
                "name": "SHELLY",
                "power": 11,
                "trophies": 0
              }
            }],
            [{
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000017,
                "name": "TARA",
                "power": 11,
                "trophies": 0
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 11,
                "trophies": 0
              }
            }],
            [{
              "tag": "#PR08CCVPR",
              "name": "Question_Marks",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 11,
                "trophies": 1
              }
            }, {
              "tag": "#228CJPLYJ",
              "name": "$Barley$",
              "brawler": {
                "id": 16000013,
                "name": "POCO",
                "power": 11,
                "trophies": 0
              }
            }],
            [{
              "tag": "#89J2RGGVP",
              "name": "🌟HAROLD_KERVE?",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 11,
                "trophies": 0
              }
            }, {
              "tag": "#2Q9C2UGL0",
              "name": "메가나이트",
              "brawler": {
                "id": 16000009,
                "name": "DYNAMIKE",
                "power": 11,
                "trophies": 0
              }
            }],
            [{
              "tag": "#YRYRVYQUR",
              "name": "불꽃 브롤",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 11,
                "trophies": 0
              }
            }, {
              "tag": "#9UUG0JR02",
              "name": "謎之重煉「金」",
              "brawler": {
                "id": 16000010,
                "name": "EL PRIMO",
                "power": 11,
                "trophies": 0
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T120722.000Z",
        "event": {
          "id": 15000413,
          "mode": "brawlBall",
          "map": "Sticky Notes"
        },
        "battle": {
          "mode": "brawlBall",
          "type": "ranked",
          "result": "defeat",
          "duration": 118,
          "trophyChange": -8,
          "starPlayer": {
            "tag": "#2VJUUC9JG",
            "name": "ABI༄|Miki shark",
            "brawler": {
              "id": 16000026,
              "name": "BIBI",
              "power": 11,
              "trophies": 677
            }
          },
          "teams": [
            [{
              "tag": "#2P90RC20R",
              "name": "EMP|TAPIOKA",
              "brawler": {
                "id": 16000002,
                "name": "BULL",
                "power": 9,
                "trophies": 699
              }
            }, {
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000009,
                "name": "DYNAMIKE",
                "power": 9,
                "trophies": 585
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 10,
                "trophies": 706
              }
            }],
            [{
              "tag": "#8GYVGLULU",
              "name": "あざいや",
              "brawler": {
                "id": 16000020,
                "name": "FRANK",
                "power": 9,
                "trophies": 685
              }
            }, {
              "tag": "#2VJUUC9JG",
              "name": "ABI༄|Miki shark",
              "brawler": {
                "id": 16000026,
                "name": "BIBI",
                "power": 11,
                "trophies": 677
              }
            }, {
              "tag": "#PJ80RC2PU",
              "name": "앎이파파",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 9,
                "trophies": 714
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T120502.000Z",
        "event": {
          "id": 15000413,
          "mode": "brawlBall",
          "map": "Sticky Notes"
        },
        "battle": {
          "mode": "brawlBall",
          "type": "ranked",
          "result": "defeat",
          "duration": 145,
          "trophyChange": -8,
          "starPlayer": {
            "tag": "#L9V0Y08GY",
            "name": "長居公園通り",
            "brawler": {
              "id": 16000035,
              "name": "GALE",
              "power": 10,
              "trophies": 703
            }
          },
          "teams": [
            [{
              "tag": "#L9V0Y08GY",
              "name": "長居公園通り",
              "brawler": {
                "id": 16000035,
                "name": "GALE",
                "power": 10,
                "trophies": 703
              }
            }, {
              "tag": "#PQCP9PRYV",
              "name": "쭈니",
              "brawler": {
                "id": 16000023,
                "name": "LEON",
                "power": 9,
                "trophies": 691
              }
            }, {
              "tag": "#YC22QGP8V",
              "name": "カントリーマアム",
              "brawler": {
                "id": 16000010,
                "name": "EL PRIMO",
                "power": 9,
                "trophies": 713
              }
            }],
            [{
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000009,
                "name": "DYNAMIKE",
                "power": 9,
                "trophies": 591
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 10,
                "trophies": 714
              }
            }, {
              "tag": "#JYGGY0V",
              "name": "Satousui",
              "brawler": {
                "id": 16000043,
                "name": "EDGAR",
                "power": 9,
                "trophies": 717
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T120214.000Z",
        "event": {
          "id": 15000413,
          "mode": "brawlBall",
          "map": "Sticky Notes"
        },
        "battle": {
          "mode": "brawlBall",
          "type": "ranked",
          "result": "defeat",
          "duration": 122,
          "trophyChange": -6,
          "starPlayer": {
            "tag": "#PPLQVY9UU",
            "name": "브롤 현질러",
            "brawler": {
              "id": 16000009,
              "name": "DYNAMIKE",
              "power": 9,
              "trophies": 593
            }
          },
          "teams": [
            [{
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000009,
                "name": "DYNAMIKE",
                "power": 9,
                "trophies": 597
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000044,
                "name": "COLONEL RUFFS",
                "power": 9,
                "trophies": 522
              }
            }, {
              "tag": "#LGJQVRC8",
              "name": "あーる",
              "brawler": {
                "id": 16000004,
                "name": "RICO",
                "power": 9,
                "trophies": 607
              }
            }],
            [{
              "tag": "#PPLQVY9UU",
              "name": "브롤 현질러",
              "brawler": {
                "id": 16000009,
                "name": "DYNAMIKE",
                "power": 9,
                "trophies": 593
              }
            }, {
              "tag": "#RUYGJC8P",
              "name": "サルの弟、ゴンザレス",
              "brawler": {
                "id": 16000011,
                "name": "MORTIS",
                "power": 9,
                "trophies": 598
              }
            }, {
              "tag": "#YP9CP9P9G",
              "name": "たまちゃん",
              "brawler": {
                "id": 16000020,
                "name": "FRANK",
                "power": 8,
                "trophies": 593
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T115953.000Z",
        "event": {
          "id": 15000413,
          "mode": "brawlBall",
          "map": "Sticky Notes"
        },
        "battle": {
          "mode": "brawlBall",
          "type": "ranked",
          "result": "defeat",
          "duration": 45,
          "trophyChange": -6,
          "starPlayer": {
            "tag": "#8VV0Q8Q20",
            "name": "PO42-",
            "brawler": {
              "id": 16000004,
              "name": "RICO",
              "power": 9,
              "trophies": 552
            }
          },
          "teams": [
            [{
              "tag": "#2CCQC8GGP",
              "name": "嘿！超神人",
              "brawler": {
                "id": 16000026,
                "name": "BIBI",
                "power": 9,
                "trophies": 546
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000044,
                "name": "COLONEL RUFFS",
                "power": 9,
                "trophies": 528
              }
            }, {
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000009,
                "name": "DYNAMIKE",
                "power": 9,
                "trophies": 604
              }
            }],
            [{
              "tag": "#889RCURPJ",
              "name": "⊙﹏⊙",
              "brawler": {
                "id": 16000018,
                "name": "DARRYL",
                "power": 8,
                "trophies": 564
              }
            }, {
              "tag": "#8VV0Q8Q20",
              "name": "PO42-",
              "brawler": {
                "id": 16000004,
                "name": "RICO",
                "power": 9,
                "trophies": 552
              }
            }, {
              "tag": "#UP920LV8",
              "name": "Zheyu",
              "brawler": {
                "id": 16000028,
                "name": "SANDY",
                "power": 9,
                "trophies": 549
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T115819.000Z",
        "event": {
          "id": 15000413,
          "mode": "brawlBall",
          "map": "Sticky Notes"
        },
        "battle": {
          "mode": "brawlBall",
          "type": "ranked",
          "result": "victory",
          "duration": 150,
          "trophyChange": 8,
          "starPlayer": {
            "tag": "#20CCPPY0",
            "name": "ToxicTrapper",
            "brawler": {
              "id": 16000049,
              "name": "BUZZ",
              "power": 9,
              "trophies": 703
            }
          },
          "teams": [
            [{
              "tag": "#9Q899QYU",
              "name": "最衬",
              "brawler": {
                "id": 16000002,
                "name": "BULL",
                "power": 10,
                "trophies": 574
              }
            }, {
              "tag": "#8VRQLJC8U",
              "name": "Jason",
              "brawler": {
                "id": 16000004,
                "name": "RICO",
                "power": 9,
                "trophies": 715
              }
            }, {
              "tag": "#2P20UCP2Y",
              "name": "roblox gamer",
              "brawler": {
                "id": 16000025,
                "name": "CARL",
                "power": 9,
                "trophies": 727
              }
            }],
            [{
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000036,
                "name": "NANI",
                "power": 9,
                "trophies": 724
              }
            }, {
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000009,
                "name": "DYNAMIKE",
                "power": 9,
                "trophies": 596
              }
            }, {
              "tag": "#20CCPPY0",
              "name": "ToxicTrapper",
              "brawler": {
                "id": 16000049,
                "name": "BUZZ",
                "power": 9,
                "trophies": 703
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T115525.000Z",
        "event": {
          "id": 15000413,
          "mode": "brawlBall",
          "map": "Sticky Notes"
        },
        "battle": {
          "mode": "brawlBall",
          "type": "ranked",
          "result": "defeat",
          "duration": 150,
          "trophyChange": -8,
          "starPlayer": {
            "tag": "#YG2RYGCGJ",
            "name": "noob",
            "brawler": {
              "id": 16000045,
              "name": "STU",
              "power": 11,
              "trophies": 725
            }
          },
          "teams": [
            [{
              "tag": "#92PGQP9Y",
              "name": "꧁Drͥagͣoͫnking꧂",
              "brawler": {
                "id": 16000011,
                "name": "MORTIS",
                "power": 11,
                "trophies": 733
              }
            }, {
              "tag": "#8PGGY8YG0",
              "name": "PLS☆77",
              "brawler": {
                "id": 16000009,
                "name": "DYNAMIKE",
                "power": 9,
                "trophies": 603
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000036,
                "name": "NANI",
                "power": 9,
                "trophies": 732
              }
            }],
            [{
              "tag": "#YG2RYGCGJ",
              "name": "noob",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 11,
                "trophies": 725
              }
            }, {
              "tag": "#RQVGYVL2",
              "name": "kywong",
              "brawler": {
                "id": 16000017,
                "name": "TARA",
                "power": 10,
                "trophies": 734
              }
            }, {
              "tag": "#9J9J2CCP",
              "name": "『会ɪͥᴠᴀͣɴͫ²🖤』",
              "brawler": {
                "id": 16000011,
                "name": "MORTIS",
                "power": 9,
                "trophies": 699
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T070800.000Z",
        "event": {
          "id": 15000007,
          "mode": "gemGrab",
          "map": "Hard Rock Mine"
        },
        "battle": {
          "mode": "gemGrab",
          "type": "teamRanked",
          "result": "defeat",
          "duration": 107,
          "trophyChange": 3,
          "starPlayer": {
            "tag": "#PY8LQJ09U",
            "name": "Nͥinͣjͫaᵍᵒᵈ",
            "brawler": {
              "id": 16000002,
              "name": "BULL",
              "power": 10,
              "trophies": 14
            }
          },
          "teams": [
            [{
              "tag": "#900JQJVVV",
              "name": "silverqueen",
              "brawler": {
                "id": 16000030,
                "name": "EMZ",
                "power": 9,
                "trophies": 13
              }
            }, {
              "tag": "#2R9JJVRP8",
              "name": "fernando.a.h",
              "brawler": {
                "id": 16000003,
                "name": "BROCK",
                "power": 10,
                "trophies": 13
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000019,
                "name": "PENNY",
                "power": 10,
                "trophies": 13
              }
            }],
            [{
              "tag": "#209P9UYG",
              "name": "Gr1mm",
              "brawler": {
                "id": 16000004,
                "name": "RICO",
                "power": 9,
                "trophies": 14
              }
            }, {
              "tag": "#YJPGYL92R",
              "name": "Shidori",
              "brawler": {
                "id": 16000017,
                "name": "TARA",
                "power": 9,
                "trophies": 14
              }
            }, {
              "tag": "#PY8LQJ09U",
              "name": "Nͥinͣjͫaᵍᵒᵈ",
              "brawler": {
                "id": 16000002,
                "name": "BULL",
                "power": 10,
                "trophies": 14
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T070559.000Z",
        "event": {
          "id": 15000007,
          "mode": "gemGrab",
          "map": "Hard Rock Mine"
        },
        "battle": {
          "mode": "gemGrab",
          "type": "teamRanked",
          "result": "defeat",
          "duration": 120,
          "starPlayer": null,
          "teams": [
            [{
              "tag": "#900JQJVVV",
              "name": "silverqueen",
              "brawler": {
                "id": 16000030,
                "name": "EMZ",
                "power": 9,
                "trophies": 13
              }
            }, {
              "tag": "#2R9JJVRP8",
              "name": "fernando.a.h",
              "brawler": {
                "id": 16000003,
                "name": "BROCK",
                "power": 10,
                "trophies": 13
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000019,
                "name": "PENNY",
                "power": 10,
                "trophies": 13
              }
            }],
            [{
              "tag": "#209P9UYG",
              "name": "Gr1mm",
              "brawler": {
                "id": 16000004,
                "name": "RICO",
                "power": 9,
                "trophies": 14
              }
            }, {
              "tag": "#YJPGYL92R",
              "name": "Shidori",
              "brawler": {
                "id": 16000017,
                "name": "TARA",
                "power": 9,
                "trophies": 14
              }
            }, {
              "tag": "#PY8LQJ09U",
              "name": "Nͥinͣjͫaᵍᵒᵈ",
              "brawler": {
                "id": 16000002,
                "name": "BULL",
                "power": 10,
                "trophies": 14
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T070126.000Z",
        "event": {
          "id": 15000306,
          "mode": "hotZone",
          "map": "Dueling Beetles"
        },
        "battle": {
          "mode": "hotZone",
          "type": "teamRanked",
          "result": "victory",
          "duration": 78,
          "trophyChange": 7,
          "starPlayer": {
            "tag": "#220YLR0L8",
            "name": "태풍처럼빠른브롤러",
            "brawler": {
              "id": 16000028,
              "name": "SANDY",
              "power": 9,
              "trophies": 13
            }
          },
          "teams": [
            [{
              "tag": "#L29U0YJ0P",
              "name": "僕、初心者",
              "brawler": {
                "id": 16000018,
                "name": "DARRYL",
                "power": 7,
                "trophies": 12
              }
            }, {
              "tag": "#8U22PJPGR",
              "name": "ち●ち●やないかーーい",
              "brawler": {
                "id": 16000005,
                "name": "SPIKE",
                "power": 7,
                "trophies": 12
              }
            }, {
              "tag": "#88CUYUY08",
              "name": "タクアン",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 9,
                "trophies": 12
              }
            }],
            [{
              "tag": "#PU8RPGUGU",
              "name": "友子に感謝",
              "brawler": {
                "id": 16000053,
                "name": "LOLA",
                "power": 10,
                "trophies": 12
              }
            }, {
              "tag": "#220YLR0L8",
              "name": "태풍처럼빠른브롤러",
              "brawler": {
                "id": 16000028,
                "name": "SANDY",
                "power": 9,
                "trophies": 13
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000004,
                "name": "RICO",
                "power": 9,
                "trophies": 13
              }
            }]
          ]
        }
      }, {
        "battleTime": "20220115T065955.000Z",
        "event": {
          "id": 15000306,
          "mode": "hotZone",
          "map": "Dueling Beetles"
        },
        "battle": {
          "mode": "hotZone",
          "type": "teamRanked",
          "result": "victory",
          "duration": 77,
          "starPlayer": null,
          "teams": [
            [{
              "tag": "#L29U0YJ0P",
              "name": "僕、初心者",
              "brawler": {
                "id": 16000018,
                "name": "DARRYL",
                "power": 7,
                "trophies": 12
              }
            }, {
              "tag": "#8U22PJPGR",
              "name": "ち●ち●やないかーーい",
              "brawler": {
                "id": 16000005,
                "name": "SPIKE",
                "power": 7,
                "trophies": 12
              }
            }, {
              "tag": "#88CUYUY08",
              "name": "タクアン",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 9,
                "trophies": 12
              }
            }],
            [{
              "tag": "#PU8RPGUGU",
              "name": "友子に感謝",
              "brawler": {
                "id": 16000053,
                "name": "LOLA",
                "power": 10,
                "trophies": 12
              }
            }, {
              "tag": "#220YLR0L8",
              "name": "태풍처럼빠른브롤러",
              "brawler": {
                "id": 16000028,
                "name": "SANDY",
                "power": 9,
                "trophies": 13
              }
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000004,
                "name": "RICO",
                "power": 9,
                "trophies": 13
              }
            }]
          ]
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
      // return moment(timestamp).format("YYYY MM DD");
    }
  }
}
</script>

<style scoped>

</style>
