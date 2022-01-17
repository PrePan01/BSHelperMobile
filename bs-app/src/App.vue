<template>
  <div id="app">
    <!--搜索框-->
    <van-search
        v-model="searchValue"
        shape="round"
        placeholder="请输入玩家标签"
        input-align="center"
        @search="search"
    />
    <PersonalCard v-if="tabberActive === 0"></PersonalCard>
    <!--底部导航-->
    <van-tabbar v-model="tabberActive">
      <van-tabbar-item icon="contact">个人名片</van-tabbar-item>
      <van-tabbar-item icon="underway-o">最近对战</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import axios from 'axios'
import PersonalCard from '@/components/PersonalCard'

export default {
  name: 'App',
  components: {
    PersonalCard
  },
  data() {
    return {
      tabberActive: 0, //激活的标签页
      searchValue: '', //搜索框
      res: {
        "tag": "#LLQ0U8PR",
        "name": "PLS☆PrePan",
        "nameColor": "0xffff9727",
        "icon": {
          "id": 28000035
        },
        "trophies": 33220,
        "highestTrophies": 33235,
        "highestPowerPlayPoints": 956,
        "expLevel": 234,
        "expPoints": 281702,
        "isQualifiedFromChampionshipChallenge": false,
        "3vs3Victories": 16601,
        "soloVictories": 587,
        "duoVictories": 456,
        "bestRoboRumbleTime": 5,
        "bestTimeAsBigBrawler": 0,
        "club": {
          "name": "Team Polaris",
          "tag": "#RQV28LYC",
          "role": "president"
        },
        "brawlers": [{
          "id": 16000000,
          "name": "SHELLY",
          "power": 9,
          "rank": 23,
          "trophies": 649,
          "highestTrophies": 654,
          "gears": [],
          "starPowers": [{
            "id": 23000076,
            "name": "SHELL SHOCK"
          }, {
            "id": 23000135,
            "name": "BAND-AID"
          }],
          "gadgets": [{
            "id": 23000255,
            "name": "FAST FORWARD"
          }, {
            "id": 23000288,
            "name": "CLAY PIGEONS"
          }]
        }, {
          "id": 16000001,
          "name": "COLT",
          "power": 9,
          "rank": 25,
          "trophies": 599,
          "highestTrophies": 779,
          "gears": [],
          "starPowers": [{
            "id": 23000077,
            "name": "SLICK BOOTS"
          }, {
            "id": 23000138,
            "name": "MAGNUM SPECIAL"
          }],
          "gadgets": [{
            "id": 23000273,
            "name": "SPEEDLOADER"
          }, {
            "id": 23000319,
            "name": "SILVER BULLET"
          }]
        }, {
          "id": 16000002,
          "name": "BULL",
          "power": 10,
          "rank": 25,
          "trophies": 574,
          "highestTrophies": 752,
          "gears": [{
            "id": 62000000,
            "name": "SPEED",
            "level": 3
          }],
          "starPowers": [{
            "id": 23000078,
            "name": "BERSERKER"
          }, {
            "id": 23000137,
            "name": "TOUGH GUY"
          }],
          "gadgets": [{
            "id": 23000272,
            "name": "T-BONE INJECTOR"
          }, {
            "id": 23000310,
            "name": "STOMPER"
          }]
        }, {
          "id": 16000003,
          "name": "BROCK",
          "power": 9,
          "rank": 23,
          "trophies": 652,
          "highestTrophies": 688,
          "gears": [],
          "starPowers": [{
            "id": 23000079,
            "name": "INCENDIARY"
          }, {
            "id": 23000150,
            "name": "ROCKET NO. 4"
          }],
          "gadgets": [{
            "id": 23000245,
            "name": "ROCKET LACES"
          }, {
            "id": 23000316,
            "name": "ROCKET FUEL"
          }]
        }, {
          "id": 16000004,
          "name": "RICO",
          "power": 9,
          "rank": 23,
          "trophies": 635,
          "highestTrophies": 657,
          "gears": [],
          "starPowers": [{
            "id": 23000080,
            "name": "SUPER BOUNCY"
          }, {
            "id": 23000156,
            "name": "ROBO RETREAT"
          }],
          "gadgets": [{
            "id": 23000246,
            "name": "MULTIBALL LAUNCHER"
          }, {
            "id": 23000409,
            "name": "BOUNCY CASTLE"
          }]
        }, {
          "id": 16000005,
          "name": "SPIKE",
          "power": 10,
          "rank": 25,
          "trophies": 705,
          "highestTrophies": 763,
          "gears": [{
            "id": 62000003,
            "name": "RESISTANCE",
            "level": 1
          }],
          "starPowers": [{
            "id": 23000081,
            "name": "FERTILIZE"
          }, {
            "id": 23000151,
            "name": "CURVEBALL"
          }],
          "gadgets": [{
            "id": 23000247,
            "name": "POPPING PINCUSHION"
          }, {
            "id": 23000406,
            "name": "LIFE PLANT"
          }]
        }, {
          "id": 16000006,
          "name": "BARLEY",
          "power": 9,
          "rank": 21,
          "trophies": 557,
          "highestTrophies": 580,
          "gears": [],
          "starPowers": [{
            "id": 23000082,
            "name": "MEDICAL USE"
          }, {
            "id": 23000158,
            "name": "EXTRA NOXIOUS"
          }],
          "gadgets": [{
            "id": 23000250,
            "name": "STICKY SYRUP MIXER"
          }, {
            "id": 23000293,
            "name": "HERBAL TONIC"
          }]
        }, {
          "id": 16000007,
          "name": "JESSIE",
          "power": 11,
          "rank": 25,
          "trophies": 724,
          "highestTrophies": 751,
          "gears": [{
            "id": 62000002,
            "name": "DAMAGE",
            "level": 2
          }, {
            "id": 62000004,
            "name": "SHIELD",
            "level": 2
          }],
          "starPowers": [{
            "id": 23000083,
            "name": "ENERGIZE"
          }, {
            "id": 23000149,
            "name": "SHOCKY"
          }],
          "gadgets": [{
            "id": 23000251,
            "name": "SPARK PLUG"
          }, {
            "id": 23000295,
            "name": "RECOIL SPRING"
          }]
        }, {
          "id": 16000008,
          "name": "NITA",
          "power": 9,
          "rank": 24,
          "trophies": 699,
          "highestTrophies": 708,
          "gears": [],
          "starPowers": [{
            "id": 23000084,
            "name": "BEAR WITH ME"
          }, {
            "id": 23000136,
            "name": "HYPER BEAR"
          }],
          "gadgets": [{
            "id": 23000249,
            "name": "BEAR PAWS"
          }, {
            "id": 23000314,
            "name": "FAUX FUR"
          }]
        }, {
          "id": 16000009,
          "name": "DYNAMIKE",
          "power": 9,
          "rank": 24,
          "trophies": 599,
          "highestTrophies": 717,
          "gears": [],
          "starPowers": [{
            "id": 23000085,
            "name": "DYNA-JUMP"
          }, {
            "id": 23000155,
            "name": "DEMOLITION"
          }],
          "gadgets": [{
            "id": 23000258,
            "name": "FIDGET SPINNER"
          }, {
            "id": 23000294,
            "name": "SATCHEL CHARGE"
          }]
        }, {
          "id": 16000010,
          "name": "EL PRIMO",
          "power": 10,
          "rank": 24,
          "trophies": 649,
          "highestTrophies": 748,
          "gears": [{
            "id": 62000000,
            "name": "SPEED",
            "level": 1
          }],
          "starPowers": [{
            "id": 23000086,
            "name": "EL FUEGO"
          }, {
            "id": 23000140,
            "name": "METEOR RUSH"
          }],
          "gadgets": [{
            "id": 23000264,
            "name": "SUPLEX SUPPLEMENT"
          }, {
            "id": 23000292,
            "name": "ASTEROID BELT"
          }]
        }, {
          "id": 16000011,
          "name": "MORTIS",
          "power": 10,
          "rank": 22,
          "trophies": 536,
          "highestTrophies": 608,
          "gears": [{
            "id": 62000003,
            "name": "RESISTANCE",
            "level": 2
          }],
          "starPowers": [{
            "id": 23000087,
            "name": "CREEPY HARVEST"
          }, {
            "id": 23000154,
            "name": "COILED SNAKE"
          }],
          "gadgets": [{
            "id": 23000265,
            "name": "COMBO SPINNER"
          }, {
            "id": 23000290,
            "name": "SURVIVAL SHOVEL"
          }]
        }, {
          "id": 16000012,
          "name": "CROW",
          "power": 10,
          "rank": 25,
          "trophies": 749,
          "highestTrophies": 761,
          "gears": [{
            "id": 62000003,
            "name": "RESISTANCE",
            "level": 3
          }],
          "starPowers": [{
            "id": 23000088,
            "name": "EXTRA TOXIC"
          }, {
            "id": 23000143,
            "name": "CARRION CROW"
          }],
          "gadgets": [{
            "id": 23000243,
            "name": "DEFENSE BOOSTER"
          }, {
            "id": 23000286,
            "name": "SLOWING TOXIN"
          }]
        }, {
          "id": 16000013,
          "name": "POCO",
          "power": 9,
          "rank": 23,
          "trophies": 649,
          "highestTrophies": 674,
          "gears": [],
          "starPowers": [{
            "id": 23000089,
            "name": "DA CAPO!"
          }, {
            "id": 23000144,
            "name": "SCREECHING SOLO"
          }],
          "gadgets": [{
            "id": 23000267,
            "name": "TUNING FORK"
          }, {
            "id": 23000350,
            "name": "PROTECTIVE TUNES"
          }]
        }, {
          "id": 16000014,
          "name": "BO",
          "power": 9,
          "rank": 25,
          "trophies": 624,
          "highestTrophies": 771,
          "gears": [],
          "starPowers": [{
            "id": 23000090,
            "name": "CIRCLING EAGLE"
          }, {
            "id": 23000148,
            "name": "SNARE A BEAR"
          }],
          "gadgets": [{
            "id": 23000263,
            "name": "SUPER TOTEM"
          }, {
            "id": 23000289,
            "name": "TRIPWIRE"
          }]
        }, {
          "id": 16000015,
          "name": "PIPER",
          "power": 9,
          "rank": 25,
          "trophies": 726,
          "highestTrophies": 757,
          "gears": [],
          "starPowers": [{
            "id": 23000091,
            "name": "AMBUSH"
          }, {
            "id": 23000152,
            "name": "SNAPPY SNIPING"
          }],
          "gadgets": [{
            "id": 23000268,
            "name": "AUTO AIMER"
          }, {
            "id": 23000291,
            "name": "HOMEMADE RECIPE"
          }]
        }, {
          "id": 16000016,
          "name": "PAM",
          "power": 9,
          "rank": 23,
          "trophies": 658,
          "highestTrophies": 664,
          "gears": [],
          "starPowers": [{
            "id": 23000092,
            "name": "MAMA'S HUG"
          }, {
            "id": 23000139,
            "name": "MAMA'S SQUEEZE"
          }],
          "gadgets": [{
            "id": 23000257,
            "name": "PULSE MODULATOR"
          }, {
            "id": 23000404,
            "name": "SCRAPSUCKER"
          }]
        }, {
          "id": 16000017,
          "name": "TARA",
          "power": 10,
          "rank": 25,
          "trophies": 699,
          "highestTrophies": 752,
          "gears": [{
            "id": 62000004,
            "name": "SHIELD",
            "level": 1
          }],
          "starPowers": [{
            "id": 23000093,
            "name": "BLACK PORTAL"
          }, {
            "id": 23000160,
            "name": "HEALING SHADE"
          }],
          "gadgets": [{
            "id": 23000266,
            "name": "PSYCHIC ENHANCER"
          }, {
            "id": 23000356,
            "name": "SUPPORT FROM BEYOND"
          }]
        }, {
          "id": 16000018,
          "name": "DARRYL",
          "power": 9,
          "rank": 22,
          "trophies": 524,
          "highestTrophies": 605,
          "gears": [],
          "starPowers": [{
            "id": 23000094,
            "name": "STEEL HOOPS"
          }, {
            "id": 23000157,
            "name": "ROLLING RELOAD"
          }],
          "gadgets": [{
            "id": 23000260,
            "name": "RECOILING ROTATOR"
          }, {
            "id": 23000313,
            "name": "TAR BARREL"
          }]
        }, {
          "id": 16000019,
          "name": "PENNY",
          "power": 10,
          "rank": 23,
          "trophies": 599,
          "highestTrophies": 676,
          "gears": [{
            "id": 62000002,
            "name": "DAMAGE",
            "level": 3
          }],
          "starPowers": [{
            "id": 23000099,
            "name": "LAST BLAST"
          }, {
            "id": 23000142,
            "name": "BALLS OF FIRE"
          }],
          "gadgets": [{
            "id": 23000248,
            "name": "POCKET DETONATOR"
          }, {
            "id": 23000287,
            "name": "CAPTAIN'S COMPASS"
          }]
        }, {
          "id": 16000020,
          "name": "FRANK",
          "power": 9,
          "rank": 25,
          "trophies": 699,
          "highestTrophies": 771,
          "gears": [],
          "starPowers": [{
            "id": 23000104,
            "name": "POWER GRAB"
          }, {
            "id": 23000153,
            "name": "SPONGE"
          }],
          "gadgets": [{
            "id": 23000261,
            "name": "ACTIVE NOISE CANCELING"
          }, {
            "id": 23000351,
            "name": "IRRESISTIBLE ATTRACTION"
          }]
        }, {
          "id": 16000021,
          "name": "GENE",
          "power": 9,
          "rank": 21,
          "trophies": 498,
          "highestTrophies": 586,
          "gears": [],
          "starPowers": [{
            "id": 23000109,
            "name": "MAGIC PUFFS"
          }, {
            "id": 23000159,
            "name": "SPIRIT SLAP"
          }],
          "gadgets": [{
            "id": 23000252,
            "name": "LAMP BLOWOUT"
          }, {
            "id": 23000352,
            "name": "VENGEFUL SPIRITS"
          }]
        }, {
          "id": 16000022,
          "name": "TICK",
          "power": 9,
          "rank": 24,
          "trophies": 665,
          "highestTrophies": 733,
          "gears": [],
          "starPowers": [{
            "id": 23000114,
            "name": "WELL OILED"
          }, {
            "id": 23000161,
            "name": "AUTOMA-TICK RELOAD"
          }],
          "gadgets": [{
            "id": 23000253,
            "name": "MINE MANIA"
          }, {
            "id": 23000355,
            "name": "LAST HURRAH"
          }]
        }, {
          "id": 16000023,
          "name": "LEON",
          "power": 9,
          "rank": 22,
          "trophies": 549,
          "highestTrophies": 603,
          "gears": [],
          "starPowers": [{
            "id": 23000119,
            "name": "SMOKE TRAILS"
          }, {
            "id": 23000141,
            "name": "INVISIHEAL"
          }],
          "gadgets": [{
            "id": 23000276,
            "name": "CLONE PROJECTOR"
          }, {
            "id": 23000408,
            "name": "LOLLIPOP DROP"
          }]
        }, {
          "id": 16000024,
          "name": "ROSA",
          "power": 9,
          "rank": 23,
          "trophies": 661,
          "highestTrophies": 685,
          "gears": [],
          "starPowers": [{
            "id": 23000124,
            "name": "PLANT LIFE"
          }, {
            "id": 23000147,
            "name": "THORNY GLOVES"
          }],
          "gadgets": [{
            "id": 23000242,
            "name": "GROW LIGHT"
          }, {
            "id": 23000348,
            "name": "UNFRIENDLY BUSHES"
          }]
        }, {
          "id": 16000025,
          "name": "CARL",
          "power": 9,
          "rank": 23,
          "trophies": 549,
          "highestTrophies": 695,
          "gears": [],
          "starPowers": [{
            "id": 23000129,
            "name": "POWER THROW"
          }, {
            "id": 23000145,
            "name": "PROTECTIVE PIROUETTE"
          }],
          "gadgets": [{
            "id": 23000262,
            "name": "HEAT EJECTOR"
          }, {
            "id": 23000317,
            "name": "FLYING HOOK"
          }]
        }, {
          "id": 16000026,
          "name": "BIBI",
          "power": 9,
          "rank": 22,
          "trophies": 599,
          "highestTrophies": 649,
          "gears": [],
          "starPowers": [{
            "id": 23000134,
            "name": "HOME RUN"
          }, {
            "id": 23000146,
            "name": "BATTING STANCE"
          }],
          "gadgets": [{
            "id": 23000275,
            "name": "VITAMIN BOOSTER"
          }]
        }, {
          "id": 16000027,
          "name": "8-BIT",
          "power": 9,
          "rank": 23,
          "trophies": 649,
          "highestTrophies": 674,
          "gears": [],
          "starPowers": [{
            "id": 23000168,
            "name": "BOOSTED BOOSTER"
          }, {
            "id": 23000181,
            "name": "PLUGGED IN"
          }],
          "gadgets": [{
            "id": 23000259,
            "name": "CHEAT CARTRIDGE"
          }, {
            "id": 23000318,
            "name": "EXTRA CREDITS"
          }]
        }, {
          "id": 16000028,
          "name": "SANDY",
          "power": 9,
          "rank": 25,
          "trophies": 696,
          "highestTrophies": 757,
          "gears": [],
          "starPowers": [{
            "id": 23000186,
            "name": "RUDE SANDS"
          }, {
            "id": 23000187,
            "name": "HEALING WINDS"
          }],
          "gadgets": [{
            "id": 23000270,
            "name": "SLEEP STIMULATOR"
          }, {
            "id": 23000405,
            "name": "SWEET DREAMS"
          }]
        }, {
          "id": 16000029,
          "name": "BEA",
          "power": 9,
          "rank": 25,
          "trophies": 699,
          "highestTrophies": 765,
          "gears": [],
          "starPowers": [{
            "id": 23000192,
            "name": "INSTA BEALOAD"
          }, {
            "id": 23000193,
            "name": "HONEYCOMB"
          }],
          "gadgets": [{
            "id": 23000271,
            "name": "HONEY MOLASSES"
          }, {
            "id": 23000312,
            "name": "RATTLED HIVE"
          }]
        }, {
          "id": 16000030,
          "name": "EMZ",
          "power": 9,
          "rank": 25,
          "trophies": 699,
          "highestTrophies": 797,
          "gears": [],
          "starPowers": [{
            "id": 23000198,
            "name": "BAD KARMA"
          }, {
            "id": 23000199,
            "name": "HYPE"
          }],
          "gadgets": [{
            "id": 23000274,
            "name": "FRIENDZONER"
          }]
        }, {
          "id": 16000031,
          "name": "MR. P",
          "power": 9,
          "rank": 22,
          "trophies": 549,
          "highestTrophies": 648,
          "gears": [],
          "starPowers": [{
            "id": 23000204,
            "name": "HANDLE WITH CARE"
          }, {
            "id": 23000205,
            "name": "REVOLVING DOOR"
          }],
          "gadgets": [{
            "id": 23000269,
            "name": "SERVICE BELL"
          }, {
            "id": 23000349,
            "name": "PORTER REINFORCEMENTS"
          }]
        }, {
          "id": 16000032,
          "name": "MAX",
          "power": 10,
          "rank": 23,
          "trophies": 574,
          "highestTrophies": 658,
          "gears": [{
            "id": 62000002,
            "name": "DAMAGE",
            "level": 1
          }],
          "starPowers": [{
            "id": 23000210,
            "name": "SUPER CHARGED"
          }, {
            "id": 23000211,
            "name": "RUN N GUN"
          }],
          "gadgets": [{
            "id": 23000254,
            "name": "PHASE SHIFTER"
          }, {
            "id": 23000311,
            "name": "SNEAKY SNEAKERS"
          }]
        }, {
          "id": 16000034,
          "name": "JACKY",
          "power": 9,
          "rank": 25,
          "trophies": 699,
          "highestTrophies": 752,
          "gears": [],
          "starPowers": [{
            "id": 23000222,
            "name": "COUNTER CRUSH"
          }, {
            "id": 23000223,
            "name": "HARDY HARD HAT"
          }],
          "gadgets": [{
            "id": 23000256,
            "name": "PNEUMATIC BOOSTER"
          }]
        }, {
          "id": 16000035,
          "name": "GALE",
          "power": 10,
          "rank": 22,
          "trophies": 554,
          "highestTrophies": 605,
          "gears": [{
            "id": 62000003,
            "name": "RESISTANCE",
            "level": 1
          }],
          "starPowers": [{
            "id": 23000228,
            "name": "BLUSTERY BLOW"
          }, {
            "id": 23000229,
            "name": "FREEZING SNOW"
          }],
          "gadgets": [{
            "id": 23000277,
            "name": "SPRING EJECTOR"
          }, {
            "id": 23000407,
            "name": "TWISTER"
          }]
        }, {
          "id": 16000036,
          "name": "NANI",
          "power": 9,
          "rank": 25,
          "trophies": 732,
          "highestTrophies": 750,
          "gears": [],
          "starPowers": [{
            "id": 23000234,
            "name": "AUTOFOCUS"
          }, {
            "id": 23000235,
            "name": "TEMPERED STEEL"
          }],
          "gadgets": [{
            "id": 23000278,
            "name": "WARP BLAST"
          }, {
            "id": 23000353,
            "name": "RETURN TO SENDER"
          }]
        }, {
          "id": 16000037,
          "name": "SPROUT",
          "power": 9,
          "rank": 25,
          "trophies": 593,
          "highestTrophies": 753,
          "gears": [],
          "starPowers": [{
            "id": 23000240,
            "name": "OVERGROWTH"
          }, {
            "id": 23000241,
            "name": "PHOTOSYNTHESIS"
          }],
          "gadgets": [{
            "id": 23000244,
            "name": "GARDEN MULCHER"
          }, {
            "id": 23000315,
            "name": "TRANSPLANT"
          }]
        }, {
          "id": 16000038,
          "name": "SURGE",
          "power": 10,
          "rank": 23,
          "trophies": 649,
          "highestTrophies": 677,
          "gears": [{
            "id": 62000001,
            "name": "HEALTH",
            "level": 3
          }],
          "starPowers": [{
            "id": 23000283,
            "name": "TO THE MAX!"
          }, {
            "id": 23000284,
            "name": "SERVE ICE COLD"
          }],
          "gadgets": [{
            "id": 23000285,
            "name": "POWER SURGE"
          }]
        }, {
          "id": 16000039,
          "name": "COLETTE",
          "power": 9,
          "rank": 25,
          "trophies": 649,
          "highestTrophies": 757,
          "gears": [],
          "starPowers": [{
            "id": 23000300,
            "name": "PUSH IT"
          }, {
            "id": 23000301,
            "name": "MASS TAX"
          }],
          "gadgets": [{
            "id": 23000302,
            "name": "NA-AH!"
          }]
        }, {
          "id": 16000040,
          "name": "AMBER",
          "power": 9,
          "rank": 25,
          "trophies": 749,
          "highestTrophies": 751,
          "gears": [],
          "starPowers": [{
            "id": 23000307,
            "name": "WILD FLAMES"
          }, {
            "id": 23000308,
            "name": "SCORCHIN' SIPHON"
          }],
          "gadgets": [{
            "id": 23000309,
            "name": "FIRE STARTERS"
          }]
        }, {
          "id": 16000041,
          "name": "LOU",
          "power": 10,
          "rank": 25,
          "trophies": 704,
          "highestTrophies": 755,
          "gears": [{
            "id": 62000004,
            "name": "SHIELD",
            "level": 1
          }],
          "starPowers": [{
            "id": 23000324,
            "name": "SUPERCOOL"
          }, {
            "id": 23000325,
            "name": "HYPOTHERMIA"
          }],
          "gadgets": [{
            "id": 23000326,
            "name": "ICE BLOCK"
          }, {
            "id": 23000400,
            "name": "CRYO SYRUP"
          }]
        }, {
          "id": 16000042,
          "name": "BYRON",
          "power": 11,
          "rank": 25,
          "trophies": 733,
          "highestTrophies": 769,
          "gears": [{
            "id": 62000001,
            "name": "HEALTH",
            "level": 2
          }, {
            "id": 62000003,
            "name": "RESISTANCE",
            "level": 3
          }],
          "starPowers": [{
            "id": 23000331,
            "name": "MALAISE"
          }, {
            "id": 23000332,
            "name": "INJECTION"
          }],
          "gadgets": [{
            "id": 23000333,
            "name": "SHOT IN THE ARM"
          }]
        }, {
          "id": 16000043,
          "name": "EDGAR",
          "power": 9,
          "rank": 24,
          "trophies": 657,
          "highestTrophies": 724,
          "gears": [],
          "starPowers": [{
            "id": 23000338,
            "name": "HARD LANDING"
          }, {
            "id": 23000339,
            "name": "FISTICUFFS"
          }],
          "gadgets": [{
            "id": 23000340,
            "name": "LET'S FLY"
          }, {
            "id": 23000403,
            "name": "HARDCORE"
          }]
        }, {
          "id": 16000044,
          "name": "COLONEL RUFFS",
          "power": 9,
          "rank": 21,
          "trophies": 528,
          "highestTrophies": 551,
          "gears": [],
          "starPowers": [{
            "id": 23000345,
            "name": "AIR SUPERIORITY"
          }, {
            "id": 23000346,
            "name": "FIELD PROMOTION"
          }],
          "gadgets": [{
            "id": 23000347,
            "name": "TAKE COVER"
          }, {
            "id": 23000402,
            "name": "AIR SUPPORT"
          }]
        }, {
          "id": 16000045,
          "name": "STU",
          "power": 10,
          "rank": 25,
          "trophies": 692,
          "highestTrophies": 757,
          "gears": [{
            "id": 62000002,
            "name": "DAMAGE",
            "level": 1
          }],
          "starPowers": [{
            "id": 23000362,
            "name": "ZERO DRAG"
          }, {
            "id": 23000363,
            "name": "GASO-HEAL"
          }],
          "gadgets": [{
            "id": 23000364,
            "name": "SPEED ZONE"
          }, {
            "id": 23000401,
            "name": "BREAKTHROUGH"
          }]
        }, {
          "id": 16000046,
          "name": "BELLE",
          "power": 10,
          "rank": 24,
          "trophies": 708,
          "highestTrophies": 748,
          "gears": [{
            "id": 62000004,
            "name": "SHIELD",
            "level": 1
          }],
          "starPowers": [{
            "id": 23000369,
            "name": "POSITIVE FEEDBACK"
          }, {
            "id": 23000370,
            "name": "GROUNDED"
          }],
          "gadgets": [{
            "id": 23000371,
            "name": "NEST EGG"
          }]
        }, {
          "id": 16000047,
          "name": "SQUEAK",
          "power": 9,
          "rank": 22,
          "trophies": 596,
          "highestTrophies": 603,
          "gears": [],
          "starPowers": [{
            "id": 23000376,
            "name": "CHAIN REACTION"
          }, {
            "id": 23000377,
            "name": "SUPER STICKY"
          }],
          "gadgets": [{
            "id": 23000378,
            "name": "WINDUP"
          }]
        }, {
          "id": 16000048,
          "name": "GROM",
          "power": 8,
          "rank": 15,
          "trophies": 317,
          "highestTrophies": 320,
          "gears": [],
          "starPowers": [],
          "gadgets": [{
            "id": 23000385,
            "name": "WATCHTOWER"
          }]
        }, {
          "id": 16000049,
          "name": "BUZZ",
          "power": 9,
          "rank": 21,
          "trophies": 575,
          "highestTrophies": 575,
          "gears": [],
          "starPowers": [{
            "id": 23000390,
            "name": "TOUGHER TORPEDO"
          }, {
            "id": 23000391,
            "name": "EYES SHARP"
          }],
          "gadgets": [{
            "id": 23000392,
            "name": "RESERVE BUOY"
          }]
        }, {
          "id": 16000050,
          "name": "GRIFF",
          "power": 9,
          "rank": 21,
          "trophies": 549,
          "highestTrophies": 556,
          "gears": [],
          "starPowers": [{
            "id": 23000397,
            "name": "KEEP THE CHANGE"
          }, {
            "id": 23000398,
            "name": "BUSINESS RESILIENCE"
          }],
          "gadgets": [{
            "id": 23000399,
            "name": "PIGGY BANK"
          }]
        }, {
          "id": 16000051,
          "name": "ASH",
          "power": 10,
          "rank": 23,
          "trophies": 674,
          "highestTrophies": 677,
          "gears": [{
            "id": 62000004,
            "name": "SHIELD",
            "level": 3
          }],
          "starPowers": [{
            "id": 23000414,
            "name": "FIRST BASH"
          }, {
            "id": 23000415,
            "name": "MAD AS HECK"
          }],
          "gadgets": [{
            "id": 23000416,
            "name": "CHILL PILL"
          }]
        }, {
          "id": 16000052,
          "name": "MEG",
          "power": 9,
          "rank": 22,
          "trophies": 631,
          "highestTrophies": 641,
          "gears": [],
          "starPowers": [{
            "id": 23000421,
            "name": "FORCE FIELD"
          }, {
            "id": 23000422,
            "name": "HEAVY METAL"
          }],
          "gadgets": [{
            "id": 23000423,
            "name": "JOLTING VOLTS"
          }]
        }, {
          "id": 16000053,
          "name": "LOLA",
          "power": 9,
          "rank": 16,
          "trophies": 339,
          "highestTrophies": 343,
          "gears": [],
          "starPowers": [{
            "id": 23000431,
            "name": "IMPROVISE"
          }, {
            "id": 23000432,
            "name": "SEALED WITH A KISS"
          }],
          "gadgets": [{
            "id": 23000433,
            "name": "FREEZE FRAME"
          }]
        }]
      }
    }
  },
  methods: {
    /*test() {
      axios({
        methods: 'GET',
        url: 'https://cr.is-a.dev/LLQ0U8PR',
      }).then((res) => {
        this.res = res
      })
    }*/
    search(){
      this.$bus.$emit('PersonalData',this.res)
      console.log('@@@ emit')
    }
  },
}
</script>

<style>

</style>
