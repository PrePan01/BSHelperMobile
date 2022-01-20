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
    <PersonalCard v-show="tabberActive === 0"></PersonalCard>

    <recentEvents v-show="tabberActive === 1"></recentEvents>
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
import recentEvents from "@/components/recentEvents";

export default {
  name: 'App',
  components: {
    PersonalCard,recentEvents
  },
  data() {
    return {
      tabberActive: 0, //激活的标签页
      searchValue: '', //搜索框
      personalData: {
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
      },
      battleLogs: [
        {
          "battleTime": "20220119T145330.000Z",
          "event": {
            "id": 15000053,
            "mode": "heist",
            "map": "Hot Potato"
          },
          "battle": {
            "mode": "heist",
            "type": "teamRanked",
            "result": "victory",
            "duration": 94,
            "trophyChange": 9,
            "starPlayer": {
              "tag": "#2PG929LJP",
              "name": "PLS☆Valerio",
              "brawler": {
                "id": 16000027,
                "name": "8-BIT",
                "power": 9,
                "trophies": 13
              }
            },
            "teams": [
              [{
                "tag": "#2PG929LJP",
                "name": "PLS☆Valerio",
                "brawler": {
                  "id": 16000027,
                  "name": "8-BIT",
                  "power": 9,
                  "trophies": 13
                }
              }, {
                "tag": "#8PGGY8YG0",
                "name": "PLS☆77",
                "brawler": {
                  "id": 16000007,
                  "name": "JESSIE",
                  "power": 9,
                  "trophies": 13
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000008,
                  "name": "NITA",
                  "power": 9,
                  "trophies": 13
                }
              }],
              [{
                "tag": "#Y2JVJQ29J",
                "name": "☠️voron__star☠️",
                "brawler": {
                  "id": 16000002,
                  "name": "BULL",
                  "power": 9,
                  "trophies": 13
                }
              }, {
                "tag": "#228GGQ999",
                "name": "⚡️BlackYSR⚡️",
                "brawler": {
                  "id": 16000006,
                  "name": "BARLEY",
                  "power": 9,
                  "trophies": 13
                }
              }, {
                "tag": "#LGP9CRYQC",
                "name": "NuggetMan",
                "brawler": {
                  "id": 16000017,
                  "name": "TARA",
                  "power": 10,
                  "trophies": 13
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T145142.000Z",
          "event": {
            "id": 15000053,
            "mode": "heist",
            "map": "Hot Potato"
          },
          "battle": {
            "mode": "heist",
            "type": "teamRanked",
            "result": "victory",
            "duration": 59,
            "starPlayer": null,
            "teams": [
              [{
                "tag": "#2PG929LJP",
                "name": "PLS☆Valerio",
                "brawler": {
                  "id": 16000027,
                  "name": "8-BIT",
                  "power": 9,
                  "trophies": 13
                }
              }, {
                "tag": "#8PGGY8YG0",
                "name": "PLS☆77",
                "brawler": {
                  "id": 16000007,
                  "name": "JESSIE",
                  "power": 9,
                  "trophies": 13
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000008,
                  "name": "NITA",
                  "power": 9,
                  "trophies": 13
                }
              }],
              [{
                "tag": "#Y2JVJQ29J",
                "name": "☠️voron__star☠️",
                "brawler": {
                  "id": 16000002,
                  "name": "BULL",
                  "power": 9,
                  "trophies": 13
                }
              }, {
                "tag": "#228GGQ999",
                "name": "⚡️BlackYSR⚡️",
                "brawler": {
                  "id": 16000006,
                  "name": "BARLEY",
                  "power": 9,
                  "trophies": 13
                }
              }, {
                "tag": "#LGP9CRYQC",
                "name": "NuggetMan",
                "brawler": {
                  "id": 16000017,
                  "name": "TARA",
                  "power": 10,
                  "trophies": 13
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T144821.000Z",
          "event": {
            "id": 15000007,
            "mode": "gemGrab",
            "map": "Hard Rock Mine"
          },
          "battle": {
            "mode": "gemGrab",
            "type": "teamRanked",
            "result": "victory",
            "duration": 84,
            "trophyChange": 9,
            "starPlayer": {
              "tag": "#2PG929LJP",
              "name": "PLS☆Valerio",
              "brawler": {
                "id": 16000028,
                "name": "SANDY",
                "power": 10,
                "trophies": 13
              }
            },
            "teams": [
              [{
                "tag": "#YURYQJV8",
                "name": "潤羽るしあ",
                "brawler": {
                  "id": 16000008,
                  "name": "NITA",
                  "power": 9,
                  "trophies": 14
                }
              }, {
                "tag": "#PVRCURQ2Q",
                "name": "suppy1207745",
                "brawler": {
                  "id": 16000011,
                  "name": "MORTIS",
                  "power": 11,
                  "trophies": 14
                }
              }, {
                "tag": "#UPCUJRC9",
                "name": "fu",
                "brawler": {
                  "id": 16000049,
                  "name": "BUZZ",
                  "power": 10,
                  "trophies": 12
                }
              }],
              [{
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000053,
                  "name": "LOLA",
                  "power": 9,
                  "trophies": 13
                }
              }, {
                "tag": "#2PG929LJP",
                "name": "PLS☆Valerio",
                "brawler": {
                  "id": 16000028,
                  "name": "SANDY",
                  "power": 10,
                  "trophies": 13
                }
              }, {
                "tag": "#8PGGY8YG0",
                "name": "PLS☆77",
                "brawler": {
                  "id": 16000017,
                  "name": "TARA",
                  "power": 10,
                  "trophies": 13
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T144643.000Z",
          "event": {
            "id": 15000007,
            "mode": "gemGrab",
            "map": "Hard Rock Mine"
          },
          "battle": {
            "mode": "gemGrab",
            "type": "teamRanked",
            "result": "defeat",
            "duration": 109,
            "starPlayer": null,
            "teams": [
              [{
                "tag": "#YURYQJV8",
                "name": "潤羽るしあ",
                "brawler": {
                  "id": 16000008,
                  "name": "NITA",
                  "power": 9,
                  "trophies": 14
                }
              }, {
                "tag": "#PVRCURQ2Q",
                "name": "suppy1207745",
                "brawler": {
                  "id": 16000011,
                  "name": "MORTIS",
                  "power": 11,
                  "trophies": 14
                }
              }, {
                "tag": "#UPCUJRC9",
                "name": "fu",
                "brawler": {
                  "id": 16000049,
                  "name": "BUZZ",
                  "power": 10,
                  "trophies": 12
                }
              }],
              [{
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000053,
                  "name": "LOLA",
                  "power": 9,
                  "trophies": 13
                }
              }, {
                "tag": "#2PG929LJP",
                "name": "PLS☆Valerio",
                "brawler": {
                  "id": 16000028,
                  "name": "SANDY",
                  "power": 10,
                  "trophies": 13
                }
              }, {
                "tag": "#8PGGY8YG0",
                "name": "PLS☆77",
                "brawler": {
                  "id": 16000017,
                  "name": "TARA",
                  "power": 10,
                  "trophies": 13
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T144440.000Z",
          "event": {
            "id": 15000007,
            "mode": "gemGrab",
            "map": "Hard Rock Mine"
          },
          "battle": {
            "mode": "gemGrab",
            "type": "teamRanked",
            "result": "victory",
            "duration": 97,
            "starPlayer": null,
            "teams": [
              [{
                "tag": "#YURYQJV8",
                "name": "潤羽るしあ",
                "brawler": {
                  "id": 16000008,
                  "name": "NITA",
                  "power": 9,
                  "trophies": 14
                }
              }, {
                "tag": "#PVRCURQ2Q",
                "name": "suppy1207745",
                "brawler": {
                  "id": 16000011,
                  "name": "MORTIS",
                  "power": 11,
                  "trophies": 14
                }
              }, {
                "tag": "#UPCUJRC9",
                "name": "fu",
                "brawler": {
                  "id": 16000049,
                  "name": "BUZZ",
                  "power": 10,
                  "trophies": 12
                }
              }],
              [{
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000053,
                  "name": "LOLA",
                  "power": 9,
                  "trophies": 13
                }
              }, {
                "tag": "#2PG929LJP",
                "name": "PLS☆Valerio",
                "brawler": {
                  "id": 16000028,
                  "name": "SANDY",
                  "power": 10,
                  "trophies": 13
                }
              }, {
                "tag": "#8PGGY8YG0",
                "name": "PLS☆77",
                "brawler": {
                  "id": 16000017,
                  "name": "TARA",
                  "power": 10,
                  "trophies": 13
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T144053.000Z",
          "event": {
            "id": 15000160,
            "mode": "brawlBall",
            "map": "Field Goal"
          },
          "battle": {
            "mode": "brawlBall",
            "type": "ranked",
            "result": "defeat",
            "duration": 117,
            "trophyChange": -8,
            "starPlayer": {
              "tag": "#9YPPPPR0L",
              "name": "MONSTERADEEP",
              "brawler": {
                "id": 16000045,
                "name": "STU",
                "power": 10,
                "trophies": 759
              }
            },
            "teams": [
              [{
                "tag": "#908UGLVYL",
                "name": "3==D===>:(",
                "brawler": {
                  "id": 16000011,
                  "name": "MORTIS",
                  "power": 9,
                  "trophies": 696
                }
              }, {
                "tag": "#PRJQYY8J",
                "name": "GOLDENIX",
                "brawler": {
                  "id": 16000018,
                  "name": "DARRYL",
                  "power": 9,
                  "trophies": 770
                }
              }, {
                "tag": "#9YPPPPR0L",
                "name": "MONSTERADEEP",
                "brawler": {
                  "id": 16000045,
                  "name": "STU",
                  "power": 10,
                  "trophies": 759
                }
              }],
              [{
                "tag": "#2PG929LJP",
                "name": "PLS☆Valerio",
                "brawler": {
                  "id": 16000034,
                  "name": "JACKY",
                  "power": 9,
                  "trophies": 493
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000015,
                  "name": "PIPER",
                  "power": 9,
                  "trophies": 718
                }
              }, {
                "tag": "#8PGGY8YG0",
                "name": "PLS☆77",
                "brawler": {
                  "id": 16000030,
                  "name": "EMZ",
                  "power": 9,
                  "trophies": 591
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T143808.000Z",
          "event": {
            "id": 15000160,
            "mode": "brawlBall",
            "map": "Field Goal"
          },
          "battle": {
            "mode": "brawlBall",
            "type": "ranked",
            "result": "defeat",
            "duration": 105,
            "trophyChange": -8,
            "starPlayer": {
              "tag": "#P2GVL8YRV",
              "name": "Ooi",
              "brawler": {
                "id": 16000001,
                "name": "COLT",
                "power": 9,
                "trophies": 724
              }
            },
            "teams": [
              [{
                "tag": "#2PG929LJP",
                "name": "PLS☆Valerio",
                "brawler": {
                  "id": 16000034,
                  "name": "JACKY",
                  "power": 9,
                  "trophies": 498
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000015,
                  "name": "PIPER",
                  "power": 9,
                  "trophies": 726
                }
              }, {
                "tag": "#8PGGY8YG0",
                "name": "PLS☆77",
                "brawler": {
                  "id": 16000030,
                  "name": "EMZ",
                  "power": 9,
                  "trophies": 597
                }
              }],
              [{
                "tag": "#29UPRUGUR",
                "name": "bin",
                "brawler": {
                  "id": 16000004,
                  "name": "RICO",
                  "power": 9,
                  "trophies": 717
                }
              }, {
                "tag": "#P2GVL8YRV",
                "name": "Ooi",
                "brawler": {
                  "id": 16000001,
                  "name": "COLT",
                  "power": 9,
                  "trophies": 724
                }
              }, {
                "tag": "#8PUQU8QQC",
                "name": "frost",
                "brawler": {
                  "id": 16000011,
                  "name": "MORTIS",
                  "power": 11,
                  "trophies": 730
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T055934.000Z",
          "event": {
            "id": 15000160,
            "mode": "brawlBall",
            "map": "Field Goal"
          },
          "battle": {
            "mode": "brawlBall",
            "type": "ranked",
            "result": "victory",
            "duration": 130,
            "trophyChange": 8,
            "starPlayer": {
              "tag": "#8Q0PV08UU",
              "name": "佐佐佑佑",
              "brawler": {
                "id": 16000052,
                "name": "MEG",
                "power": 9,
                "trophies": 337
              }
            },
            "teams": [
              [{
                "tag": "#PLGUCC8QP",
                "name": "Friction_때씨",
                "brawler": {
                  "id": 16000049,
                  "name": "BUZZ",
                  "power": 4,
                  "trophies": 313
                }
              }, {
                "tag": "#LRC2YCJ0Q",
                "name": "꾹종TV 부계",
                "brawler": {
                  "id": 16000048,
                  "name": "GROM",
                  "power": 4,
                  "trophies": 318
                }
              }, {
                "tag": "#2PQU0V2U8",
                "name": "🏩おめでたい🏩",
                "brawler": {
                  "id": 16000032,
                  "name": "MAX",
                  "power": 7,
                  "trophies": 350
                }
              }],
              [{
                "tag": "#PY8U2J2GV",
                "name": "채으니",
                "brawler": {
                  "id": 16000039,
                  "name": "COLETTE",
                  "power": 5,
                  "trophies": 317
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000048,
                  "name": "GROM",
                  "power": 8,
                  "trophies": 317
                }
              }, {
                "tag": "#8Q0PV08UU",
                "name": "佐佐佑佑",
                "brawler": {
                  "id": 16000052,
                  "name": "MEG",
                  "power": 9,
                  "trophies": 337
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T055601.000Z",
          "event": {
            "id": 0,
            "map": null
          },
          "battle": {
            "mode": "heist",
            "type": "ranked",
            "result": "victory",
            "duration": 29,
            "starPlayer": {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000002,
                "name": "BULL",
                "power": 10,
                "trophies": 574
              }
            },
            "teams": [
              [{
                "tag": "#9G8U2GLJU",
                "name": "포켓몬 TV",
                "brawler": {
                  "id": 16000001,
                  "name": "COLT",
                  "power": 9,
                  "trophies": 547
                }
              }, {
                "tag": "#JY0PQ0GJ",
                "name": "黙っておれに付いてこい！",
                "brawler": {
                  "id": 16000009,
                  "name": "DYNAMIKE",
                  "power": 9,
                  "trophies": 547
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000002,
                  "name": "BULL",
                  "power": 10,
                  "trophies": 574
                }
              }],
              [{
                "tag": "#PRV99PL09",
                "name": "サイレンススズカ",
                "brawler": {
                  "id": 16000019,
                  "name": "PENNY",
                  "power": 9,
                  "trophies": 562
                }
              }, {
                "tag": "#JR2VG9P",
                "name": "🔥PRO_STAR🔥",
                "brawler": {
                  "id": 16000009,
                  "name": "DYNAMIKE",
                  "power": 9,
                  "trophies": 546
                }
              }, {
                "tag": "#Q90Y0992",
                "name": "lololo",
                "brawler": {
                  "id": 16000045,
                  "name": "STU",
                  "power": 9,
                  "trophies": 568
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T055515.000Z",
          "event": {
            "id": 0,
            "map": null
          },
          "battle": {
            "mode": "heist",
            "type": "ranked",
            "result": "victory",
            "duration": 34,
            "starPlayer": {
              "tag": "#PRV99PL09",
              "name": "サイレンススズカ",
              "brawler": {
                "id": 16000019,
                "name": "PENNY",
                "power": 9,
                "trophies": 562
              }
            },
            "teams": [
              [{
                "tag": "#20RRYLG8Y",
                "name": "junanan",
                "brawler": {
                  "id": 16000050,
                  "name": "GRIFF",
                  "power": 10,
                  "trophies": 524
                }
              }, {
                "tag": "#8Y8UUGCJU",
                "name": "담지노",
                "brawler": {
                  "id": 16000007,
                  "name": "JESSIE",
                  "power": 10,
                  "trophies": 574
                }
              }, {
                "tag": "#VJR89GVL",
                "name": "한국인",
                "brawler": {
                  "id": 16000002,
                  "name": "BULL",
                  "power": 9,
                  "trophies": 581
                }
              }],
              [{
                "tag": "#PRV99PL09",
                "name": "サイレンススズカ",
                "brawler": {
                  "id": 16000019,
                  "name": "PENNY",
                  "power": 9,
                  "trophies": 562
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000002,
                  "name": "BULL",
                  "power": 10,
                  "trophies": 574
                }
              }, {
                "tag": "#Q90Y0992",
                "name": "lololo",
                "brawler": {
                  "id": 16000045,
                  "name": "STU",
                  "power": 9,
                  "trophies": 568
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T055425.000Z",
          "event": {
            "id": 0,
            "map": null
          },
          "battle": {
            "mode": "heist",
            "type": "ranked",
            "result": "defeat",
            "duration": 22,
            "starPlayer": {
              "tag": "#9LQR0QYRV",
              "name": "암행어사 모티스",
              "brawler": {
                "id": 16000017,
                "name": "TARA",
                "power": 9,
                "trophies": 574
              }
            },
            "teams": [
              [{
                "tag": "#LYVQ002Q2",
                "name": "프로게이머",
                "brawler": {
                  "id": 16000025,
                  "name": "CARL",
                  "power": 7,
                  "trophies": 576
                }
              }, {
                "tag": "#9LQR0QYRV",
                "name": "암행어사 모티스",
                "brawler": {
                  "id": 16000017,
                  "name": "TARA",
                  "power": 9,
                  "trophies": 574
                }
              }, {
                "tag": "#P2YQCJQP",
                "name": "バルス",
                "brawler": {
                  "id": 16000001,
                  "name": "COLT",
                  "power": 10,
                  "trophies": 582
                }
              }],
              [{
                "tag": "#Q90Y0992",
                "name": "lololo",
                "brawler": {
                  "id": 16000045,
                  "name": "STU",
                  "power": 9,
                  "trophies": 568
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000002,
                  "name": "BULL",
                  "power": 10,
                  "trophies": 574
                }
              }, {
                "tag": "#82082Q0UQ",
                "name": "족발왕자",
                "brawler": {
                  "id": 16000013,
                  "name": "POCO",
                  "power": 10,
                  "trophies": 599
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T055345.000Z",
          "event": {
            "id": 0,
            "map": null
          },
          "battle": {
            "mode": "heist",
            "type": "ranked",
            "result": "victory",
            "duration": 7,
            "starPlayer": {
              "tag": "#8G2LY0VPQ",
              "name": "LostNoob",
              "brawler": {
                "id": 16000017,
                "name": "TARA",
                "power": 9,
                "trophies": 593
              }
            },
            "teams": [
              [{
                "tag": "#R0YL0GCQ",
                "name": "Rayner",
                "brawler": {
                  "id": 16000008,
                  "name": "NITA",
                  "power": 9,
                  "trophies": 603
                }
              }, {
                "tag": "#RUGVJC2L",
                "name": "RedBuLL",
                "brawler": {
                  "id": 16000012,
                  "name": "CROW",
                  "power": 11,
                  "trophies": 610
                }
              }, {
                "tag": "#L0UV2VP99",
                "name": "Kujo jotaro",
                "brawler": {
                  "id": 16000030,
                  "name": "EMZ",
                  "power": 7,
                  "trophies": 526
                }
              }],
              [{
                "tag": "#8G2LY0VPQ",
                "name": "LostNoob",
                "brawler": {
                  "id": 16000017,
                  "name": "TARA",
                  "power": 9,
                  "trophies": 593
                }
              }, {
                "tag": "#RUVP208U",
                "name": "avocadom",
                "brawler": {
                  "id": 16000043,
                  "name": "EDGAR",
                  "power": 9,
                  "trophies": 584
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000002,
                  "name": "BULL",
                  "power": 10,
                  "trophies": 574
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T055159.000Z",
          "event": {
            "id": 15000160,
            "mode": "brawlBall",
            "map": "Field Goal"
          },
          "battle": {
            "mode": "brawlBall",
            "type": "ranked",
            "result": "victory",
            "duration": 134,
            "trophyChange": 8,
            "starPlayer": {
              "tag": "#VPQJLC22",
              "name": "12",
              "brawler": {
                "id": 16000011,
                "name": "MORTIS",
                "power": 11,
                "trophies": 612
              }
            },
            "teams": [
              [{
                "tag": "#20CGV0C0Y",
                "name": "(っ'ヮ'c)わぁい",
                "brawler": {
                  "id": 16000038,
                  "name": "SURGE",
                  "power": 9,
                  "trophies": 606
                }
              }, {
                "tag": "#VPQJLC22",
                "name": "12",
                "brawler": {
                  "id": 16000011,
                  "name": "MORTIS",
                  "power": 11,
                  "trophies": 612
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000052,
                  "name": "MEG",
                  "power": 9,
                  "trophies": 624
                }
              }],
              [{
                "tag": "#8P9VYP8P8",
                "name": "你若假設被撕開",
                "brawler": {
                  "id": 16000009,
                  "name": "DYNAMIKE",
                  "power": 9,
                  "trophies": 604
                }
              }, {
                "tag": "#8VCUUCGGV",
                "name": "파이퍼",
                "brawler": {
                  "id": 16000026,
                  "name": "BIBI",
                  "power": 9,
                  "trophies": 623
                }
              }, {
                "tag": "#JGCLPLJP",
                "name": "VOGEL",
                "brawler": {
                  "id": 16000036,
                  "name": "NANI",
                  "power": 9,
                  "trophies": 618
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T054925.000Z",
          "event": {
            "id": 15000160,
            "mode": "brawlBall",
            "map": "Field Goal"
          },
          "battle": {
            "mode": "brawlBall",
            "type": "ranked",
            "result": "defeat",
            "duration": 86,
            "trophyChange": -7,
            "starPlayer": {
              "tag": "#8L8R9YJ9G",
              "name": "⛩|Qzm64🎋",
              "brawler": {
                "id": 16000038,
                "name": "SURGE",
                "power": 9,
                "trophies": 620
              }
            },
            "teams": [
              [{
                "tag": "#9V8GGGJ8L",
                "name": "めんでぃー",
                "brawler": {
                  "id": 16000032,
                  "name": "MAX",
                  "power": 10,
                  "trophies": 640
                }
              }, {
                "tag": "#8R8QPGJG",
                "name": "ヨミ",
                "brawler": {
                  "id": 16000035,
                  "name": "GALE",
                  "power": 9,
                  "trophies": 544
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000052,
                  "name": "MEG",
                  "power": 9,
                  "trophies": 631
                }
              }],
              [{
                "tag": "#9LYJ8U0PR",
                "name": "MortisYT",
                "brawler": {
                  "id": 16000021,
                  "name": "GENE",
                  "power": 10,
                  "trophies": 629
                }
              }, {
                "tag": "#8L8R9YJ9G",
                "name": "⛩|Qzm64🎋",
                "brawler": {
                  "id": 16000038,
                  "name": "SURGE",
                  "power": 9,
                  "trophies": 620
                }
              }, {
                "tag": "#8VQU288PV",
                "name": "おがみち",
                "brawler": {
                  "id": 16000025,
                  "name": "CARL",
                  "power": 9,
                  "trophies": 626
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T054726.000Z",
          "event": {
            "id": 15000160,
            "mode": "brawlBall",
            "map": "Field Goal"
          },
          "battle": {
            "mode": "brawlBall",
            "type": "ranked",
            "result": "defeat",
            "duration": 150,
            "trophyChange": -8,
            "starPlayer": {
              "tag": "#2CUQQ28V9",
              "name": "Friction_희준",
              "brawler": {
                "id": 16000011,
                "name": "MORTIS",
                "power": 10,
                "trophies": 721
              }
            },
            "teams": [
              [{
                "tag": "#9PVQPR8G2",
                "name": "브롤",
                "brawler": {
                  "id": 16000045,
                  "name": "STU",
                  "power": 8,
                  "trophies": 710
                }
              }, {
                "tag": "#20LL00YQU",
                "name": "이번딸만 킬러민재 지림",
                "brawler": {
                  "id": 16000043,
                  "name": "EDGAR",
                  "power": 9,
                  "trophies": 716
                }
              }, {
                "tag": "#2CUQQ28V9",
                "name": "Friction_희준",
                "brawler": {
                  "id": 16000011,
                  "name": "MORTIS",
                  "power": 10,
                  "trophies": 721
                }
              }],
              [{
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000046,
                  "name": "BELLE",
                  "power": 10,
                  "trophies": 716
                }
              }, {
                "tag": "#PPJQUPPUC",
                "name": "🔥Ðẚv¡ḓ⁶⁴🎋",
                "brawler": {
                  "id": 16000032,
                  "name": "MAX",
                  "power": 9,
                  "trophies": 717
                }
              }, {
                "tag": "#8YY92CJ09",
                "name": "ŃØÂH",
                "brawler": {
                  "id": 16000011,
                  "name": "MORTIS",
                  "power": 10,
                  "trophies": 679
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T054440.000Z",
          "event": {
            "id": 15000160,
            "mode": "brawlBall",
            "map": "Field Goal"
          },
          "battle": {
            "mode": "brawlBall",
            "type": "ranked",
            "result": "victory",
            "duration": 55,
            "trophyChange": 8,
            "starPlayer": {
              "tag": "#2QGYLCQGV",
              "name": "ぱんぱん",
              "brawler": {
                "id": 16000012,
                "name": "CROW",
                "power": 10,
                "trophies": 741
              }
            },
            "teams": [
              [{
                "tag": "#PGQQC8V8P",
                "name": "💫 アワビハンター 💫",
                "brawler": {
                  "id": 16000012,
                  "name": "CROW",
                  "power": 8,
                  "trophies": 727
                }
              }, {
                "tag": "#8YYP2CGUQ",
                "name": "ryouta0515",
                "brawler": {
                  "id": 16000011,
                  "name": "MORTIS",
                  "power": 9,
                  "trophies": 737
                }
              }, {
                "tag": "#2URVJV0QC",
                "name": "428",
                "brawler": {
                  "id": 16000001,
                  "name": "COLT",
                  "power": 9,
                  "trophies": 711
                }
              }],
              [{
                "tag": "#2QGYLCQGV",
                "name": "ぱんぱん",
                "brawler": {
                  "id": 16000012,
                  "name": "CROW",
                  "power": 10,
                  "trophies": 741
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000046,
                  "name": "BELLE",
                  "power": 10,
                  "trophies": 708
                }
              }, {
                "tag": "#PP9U0LGYC",
                "name": "まったり楽しもう♪",
                "brawler": {
                  "id": 16000026,
                  "name": "BIBI",
                  "power": 10,
                  "trophies": 726
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T054315.000Z",
          "event": {
            "id": 15000160,
            "mode": "brawlBall",
            "map": "Field Goal"
          },
          "battle": {
            "mode": "brawlBall",
            "type": "ranked",
            "result": "defeat",
            "duration": 116,
            "trophyChange": -4,
            "starPlayer": {
              "tag": "#2YGQJ08PL",
              "name": "노랭이",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 7,
                "trophies": 297
              }
            },
            "teams": [
              [{
                "tag": "#2YGQJ08PL",
                "name": "노랭이",
                "brawler": {
                  "id": 16000048,
                  "name": "GROM",
                  "power": 7,
                  "trophies": 297
                }
              }, {
                "tag": "#2PU08LC8J",
                "name": "測試魔人",
                "brawler": {
                  "id": 16000028,
                  "name": "SANDY",
                  "power": 10,
                  "trophies": 312
                }
              }, {
                "tag": "#2V2Q9GRQ0",
                "name": "{нубик}кубик}.",
                "brawler": {
                  "id": 16000017,
                  "name": "TARA",
                  "power": 7,
                  "trophies": 331
                }
              }],
              [{
                "tag": "#98GGU2UQC",
                "name": "2G4U",
                "brawler": {
                  "id": 16000016,
                  "name": "PAM",
                  "power": 6,
                  "trophies": 302
                }
              }, {
                "tag": "#989LCU0P",
                "name": "プロスピ",
                "brawler": {
                  "id": 16000036,
                  "name": "NANI",
                  "power": 4,
                  "trophies": 326
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000048,
                  "name": "GROM",
                  "power": 8,
                  "trophies": 321
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220119T054058.000Z",
          "event": {
            "id": 15000160,
            "mode": "brawlBall",
            "map": "Field Goal"
          },
          "battle": {
            "mode": "brawlBall",
            "type": "ranked",
            "result": "victory",
            "duration": 88,
            "trophyChange": 8,
            "starPlayer": {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 8,
                "trophies": 313
              }
            },
            "teams": [
              [{
                "tag": "#P092GJPCL",
                "name": "何理玉",
                "brawler": {
                  "id": 16000048,
                  "name": "GROM",
                  "power": 4,
                  "trophies": 320
                }
              }, {
                "tag": "#R0RJCJG2",
                "name": "Snowy",
                "brawler": {
                  "id": 16000050,
                  "name": "GRIFF",
                  "power": 9,
                  "trophies": 317
                }
              }, {
                "tag": "#YV99VCUL",
                "name": "NEKO",
                "brawler": {
                  "id": 16000004,
                  "name": "RICO",
                  "power": 6,
                  "trophies": 372
                }
              }],
              [{
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000048,
                  "name": "GROM",
                  "power": 8,
                  "trophies": 313
                }
              }, {
                "tag": "#R2Y0PV0V",
                "name": "Lilovia",
                "brawler": {
                  "id": 16000004,
                  "name": "RICO",
                  "power": 9,
                  "trophies": 361
                }
              }, {
                "tag": "#PQGUVJ8J2",
                "name": "RedShade",
                "brawler": {
                  "id": 16000040,
                  "name": "AMBER",
                  "power": 1,
                  "trophies": 366
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220118T032118.000Z",
          "event": {
            "id": 15000025,
            "mode": "brawlBall",
            "map": "Triple Dribble"
          },
          "battle": {
            "mode": "brawlBall",
            "type": "ranked",
            "result": "defeat",
            "duration": 117,
            "trophyChange": -4,
            "starPlayer": {
              "tag": "#8QGC92Y9R",
              "name": "SHOOTER_123",
              "brawler": {
                "id": 16000048,
                "name": "GROM",
                "power": 4,
                "trophies": 315
              }
            },
            "teams": [
              [{
                "tag": "#80CGG0UCR",
                "name": "Max Perfect",
                "brawler": {
                  "id": 16000036,
                  "name": "NANI",
                  "power": 7,
                  "trophies": 306
                }
              }, {
                "tag": "#9LGVQR89L",
                "name": "pro gamer",
                "brawler": {
                  "id": 16000017,
                  "name": "TARA",
                  "power": 6,
                  "trophies": 350
                }
              }, {
                "tag": "#LLQ0U8PR",
                "name": "PLS☆PrePan",
                "brawler": {
                  "id": 16000048,
                  "name": "GROM",
                  "power": 8,
                  "trophies": 317
                }
              }],
              [{
                "tag": "#2RCJLQ828",
                "name": "5uperBoi1",
                "brawler": {
                  "id": 16000052,
                  "name": "MEG",
                  "power": 7,
                  "trophies": 334
                }
              }, {
                "tag": "#8QGC92Y9R",
                "name": "SHOOTER_123",
                "brawler": {
                  "id": 16000048,
                  "name": "GROM",
                  "power": 4,
                  "trophies": 315
                }
              }, {
                "tag": "#20CV22JG8",
                "name": "RedFox",
                "brawler": {
                  "id": 16000021,
                  "name": "GENE",
                  "power": 6,
                  "trophies": 335
                }
              }]
            ]
          }
        }, {
          "battleTime": "20220117T090041.000Z",
          "event": {
            "id": 15000463,
            "mode": "duels",
            "map": "WARRIOR'S WAY"
          },
          "battle": {
            "mode": "duels",
            "type": "ranked",
            "result": "defeat",
            "duration": 144,
            "players": [{
              "tag": "#9Y9C80V2J",
              "name": "俺だけトロアップな件",
              "brawlers": [{
                "id": 16000012,
                "name": "CROW",
                "power": 9,
                "trophies": 559,
                "trophyChange": 3
              }, {
                "id": 16000029,
                "name": "BEA",
                "power": 9,
                "trophies": 528,
                "trophyChange": 2
              }, {
                "id": 16000023,
                "name": "LEON",
                "power": 10,
                "trophies": 724,
                "trophyChange": 3
              }]
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawlers": [{
                "id": 16000048,
                "name": "GROM",
                "power": 8,
                "trophies": 318,
                "trophyChange": -1
              }, {
                "id": 16000041,
                "name": "LOU",
                "power": 10,
                "trophies": 706,
                "trophyChange": -2
              }, {
                "id": 16000005,
                "name": "SPIKE",
                "power": 10,
                "trophies": 707,
                "trophyChange": -2
              }]
            }]
          }
        }, {
          "battleTime": "20220117T085121.000Z",
          "event": {
            "id": 15000463,
            "mode": "duels",
            "map": "WARRIOR'S WAY"
          },
          "battle": {
            "mode": "duels",
            "type": "ranked",
            "result": "defeat",
            "duration": 83,
            "players": [{
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawlers": [{
                "id": 16000048,
                "name": "GROM",
                "power": 8,
                "trophies": 319,
                "trophyChange": -1
              }, {
                "id": 16000041,
                "name": "LOU",
                "power": 10,
                "trophies": 708,
                "trophyChange": -2
              }, {
                "id": 16000015,
                "name": "PIPER",
                "power": 9,
                "trophies": 728,
                "trophyChange": -2
              }]
            }, {
              "tag": "#2J9Q8PGP",
              "name": "HSY|MUOL",
              "brawlers": [{
                "id": 16000031,
                "name": "MR. P",
                "power": 9,
                "trophies": 508,
                "trophyChange": 3
              }, {
                "id": 16000019,
                "name": "PENNY",
                "power": 9,
                "trophies": 575,
                "trophyChange": 2
              }, {
                "id": 16000022,
                "name": "TICK",
                "power": 9,
                "trophies": 725,
                "trophyChange": 3
              }]
            }]
          }
        }, {
          "battleTime": "20220117T084939.000Z",
          "event": {
            "id": 15000463,
            "mode": "duels",
            "map": "WARRIOR'S WAY"
          },
          "battle": {
            "mode": "duels",
            "type": "ranked",
            "result": "defeat",
            "duration": 85,
            "players": [{
              "tag": "#2UL0Y22UV",
              "name": "???",
              "brawlers": [{
                "id": 16000023,
                "name": "LEON",
                "power": 9,
                "trophies": 701,
                "trophyChange": 3
              }, {
                "id": 16000046,
                "name": "BELLE",
                "power": 8,
                "trophies": 602,
                "trophyChange": 3
              }, {
                "id": 16000011,
                "name": "MORTIS",
                "power": 9,
                "trophies": 718,
                "trophyChange": 2
              }]
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawlers": [{
                "id": 16000048,
                "name": "GROM",
                "power": 8,
                "trophies": 320,
                "trophyChange": -1
              }, {
                "id": 16000041,
                "name": "LOU",
                "power": 10,
                "trophies": 710,
                "trophyChange": -2
              }, {
                "id": 16000015,
                "name": "PIPER",
                "power": 9,
                "trophies": 730,
                "trophyChange": -2
              }]
            }]
          }
        }, {
          "battleTime": "20220117T084800.000Z",
          "event": {
            "id": 15000463,
            "mode": "duels",
            "map": "WARRIOR'S WAY"
          },
          "battle": {
            "mode": "duels",
            "type": "ranked",
            "result": "victory",
            "duration": 45,
            "players": [{
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawlers": [{
                "id": 16000048,
                "name": "GROM",
                "power": 8,
                "trophies": 317,
                "trophyChange": 3
              }, {
                "id": 16000041,
                "name": "LOU",
                "power": 10,
                "trophies": 708,
                "trophyChange": 2
              }, {
                "id": 16000015,
                "name": "PIPER",
                "power": 9,
                "trophies": 727,
                "trophyChange": 3
              }]
            }, {
              "tag": "#LUYY2RV8",
              "name": "vee",
              "brawlers": [{
                "id": 16000005,
                "name": "SPIKE",
                "power": 9,
                "trophies": 564,
                "trophyChange": -2
              }, {
                "id": 16000035,
                "name": "GALE",
                "power": 9,
                "trophies": 583,
                "trophyChange": -2
              }, {
                "id": 16000012,
                "name": "CROW",
                "power": 9,
                "trophies": 720,
                "trophyChange": -2
              }]
            }]
          }
        }, {
          "battleTime": "20220117T084659.000Z",
          "event": {
            "id": 15000463,
            "mode": "duels",
            "map": "WARRIOR'S WAY"
          },
          "battle": {
            "mode": "duels",
            "type": "ranked",
            "result": "victory",
            "duration": 74,
            "players": [{
              "tag": "#9VVYGVLGV",
              "name": "AEROxNEMESIS",
              "brawlers": [{
                "id": 16000001,
                "name": "COLT",
                "power": 8,
                "trophies": 511,
                "trophyChange": -2
              }, {
                "id": 16000003,
                "name": "BROCK",
                "power": 10,
                "trophies": 737,
                "trophyChange": -2
              }, {
                "id": 16000012,
                "name": "CROW",
                "power": 10,
                "trophies": 684,
                "trophyChange": -2
              }]
            }, {
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawlers": [{
                "id": 16000048,
                "name": "GROM",
                "power": 8,
                "trophies": 314,
                "trophyChange": 3
              }, {
                "id": 16000041,
                "name": "LOU",
                "power": 10,
                "trophies": 705,
                "trophyChange": 3
              }, {
                "id": 16000015,
                "name": "PIPER",
                "power": 9,
                "trophies": 725,
                "trophyChange": 2
              }]
            }]
          }
        }, {
          "battleTime": "20220117T084529.000Z",
          "event": {
            "id": 15000463,
            "mode": "duels",
            "map": "WARRIOR'S WAY"
          },
          "battle": {
            "mode": "duels",
            "type": "ranked",
            "result": "defeat",
            "duration": 141,
            "players": [{
              "tag": "#LLQ0U8PR",
              "name": "PLS☆PrePan",
              "brawlers": [{
                "id": 16000048,
                "name": "GROM",
                "power": 8,
                "trophies": 315,
                "trophyChange": -1
              }, {
                "id": 16000041,
                "name": "LOU",
                "power": 10,
                "trophies": 707,
                "trophyChange": -2
              }, {
                "id": 16000015,
                "name": "PIPER",
                "power": 9,
                "trophies": 727,
                "trophyChange": -2
              }]
            }, {
              "tag": "#URRJJ2YC",
              "name": "無敵戰神—睿哥",
              "brawlers": [{
                "id": 16000018,
                "name": "DARRYL",
                "power": 9,
                "trophies": 717,
                "trophyChange": 3
              }, {
                "id": 16000052,
                "name": "MEG",
                "power": 9,
                "trophies": 666,
                "trophyChange": 3
              }, {
                "id": 16000017,
                "name": "TARA",
                "power": 9,
                "trophies": 662,
                "trophyChange": 2
              }]
            }]
          }
        }],
    }
  },
  methods: {
    /*test() {
      axios({
        methods: 'GET',
        url: 'https://cr.is-a.dev/LLQ0U8PR',
      }).then((res) => {
        this.personalData = res
      })
    }*/
    //个人信息数据
    search(){
      this.$bus.$emit('PersonalData',this.personalData)
      this.$bus.$emit('myName',this.personalData.name)
      this.$bus.$emit('PersonalBrawlers',this.personalData.brawlers)
      this.$bus.$emit('BattleLogs',this.battleLogs)
    }
  },
}
</script>

<style>

</style>
