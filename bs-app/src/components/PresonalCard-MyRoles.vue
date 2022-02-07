<template>
  <div>
    <!--排序-->
    <div style="margin: 8px 0 5px 0; text-align: center" v-if="personalBrawlers.length !== 0">
      <van-row>
        <van-col span="12">
          <a-select default-value = 1 style="width: 95%" @change="arrSortByKey">
            <a-select-option value = 1>
              默认排序
            </a-select-option>
            <a-select-option value = 2>
              按杯数升序
            </a-select-option>
            <a-select-option value = 3>
              按杯数降序
            </a-select-option>
            <a-select-option value = 4>
              按战力等级升序
            </a-select-option>
            <a-select-option value = 5>
              按战力等级降序
            </a-select-option>
          </a-select>
        </van-col>
        <van-col span="12">
          <a-select default-value = 'a' style="width: 95%" @change="arrSortByGears">
            <a-select-option value = 'a'>
              全部装备
            </a-select-option>
            <a-select-option value = 'b'>
              迅捷
            </a-select-option>
            <a-select-option value = 'c'>
              恢复
            </a-select-option>
            <a-select-option value = 'd'>
              强攻
            </a-select-option>
            <a-select-option value = 'e'>
              韧性
            </a-select-option>
            <a-select-option value = 'f'>
              护盾
            </a-select-option>
          </a-select>
        </van-col>
      </van-row>
    </div>

    <van-collapse v-model="activeNames">
      <van-collapse-item v-for="(item,index) in personalBrawlers" :key="index" :name="index" v-show="selectGear(item)">
        <!--标题-->
        <template #title>
          <div style="display: flex; flex-direction: row; align-items: center;">
            <img :src="require('../assets/brawlers/'+ item.id +'.png')" alt="" width="50vh" style="margin-right: 2vw">
            <span>{{item.name | brawlersName}}</span>
            <span style="margin-left: auto">
              <a-tag :color="item.power === 11? 'purple': item.power === 10? 'cyan': 'green'">
                Lv.{{item.power}}
              </a-tag>
              <a-tag color="orange">
                {{ item.trophies }}
              </a-tag>
            </span>
          </div>
        </template>
        <!--内容-->
        <div>
          <van-row>
            <van-col span="12">
              <a-descriptions>
                <a-descriptions-item label="战力等级">
                  <van-tag plain type="primary">Lv.{{ item.power }}</van-tag>
                </a-descriptions-item>
                <a-descriptions-item label="荣誉等级">
                  <span style="font-weight: bold">{{ item.rank }}</span>
                </a-descriptions-item>
                <a-descriptions-item label="当前奖杯">
                  <span style="font-weight: bold; color: rgb(242,181,30)">{{ item.trophies }}</span>
                </a-descriptions-item>
                <a-descriptions-item label="最高奖杯">
                  <span style="font-weight: bold; color: red">{{ item.highestTrophies }}</span>
                </a-descriptions-item>
              </a-descriptions>
            </van-col>
            <van-col span="12">
              <!--星辉之力-->
              <div v-if="item.starPowers.length !== 0" style="margin-bottom: 1vh">
                <div style="color: black; margin-bottom: 0.5em">星辉之力</div>
                <span v-for="(picItem, index) in item.starPowers" :key="index">
                <img :src="require('../assets/starPowersAndGadgets/'+ picItem.id +'.png')" alt="" width="30vh" style="margin-right: 15px">
                </span>
              </div>
              <!--武装配件-->
              <div v-if="item.gadgets.length !== 0" style="margin-bottom: 1vh">
                <div style="color: black; margin-bottom: 0.5em">武装配件</div>
                <span v-for="(picItem, index) in item.gadgets" :key="index">
                <img :src="require('../assets/starPowersAndGadgets/'+ picItem.id +'.png')" alt="" width="30vh" style="margin-right: 15px">
                </span>
              </div>
              <!--装备-->
              <div v-if="item.gears.length !== 0">
                <div style="color: black; margin-bottom: 0.5em">装备</div>
                <span v-for="(picItem, index) in item.gears" :key="index">
                <img :src="require('../assets/gears/'+ picItem.name + picItem.level +'.png')" alt="" width="35vh" style="margin-right: 15px">
                </span>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-collapse-item>
    </van-collapse>

    <div style="height: 10vh"></div>
  </div>
</template>
*
<script>
export default {
  name: "PresonalCard-MyRoles",
  data(){
    return{
      activeNames: [''],
      personalBrawlers: [],
      selectByGears: 'all'
    }
  },
  methods: {
    arrSortByKey(value) {
      var key
      var order
      if(value === '1'){
        key = 'id'
        order = true
      }
      else if(value === '2'){
        key = 'trophies'
        order = true
      }
      else if(value === '3'){
        key = 'trophies'
        order = false
      }
      else if(value === '4'){
        key = 'power'
        order = true
      }
      else if(value === '5'){
        key = 'power'
        order = false
      }
      return this.personalBrawlers.sort(function (a, b) {
        let value1 = a[key], value2 = b[key]
        if (order) {  //true升序
          return value1 - value2
        } else  {     //false降序
          return value2 - value1
        }
      })
    },
    arrSortByGears(value){
      if(value === 'a'){
        this.selectByGears = 'all'
      }
      else if(value === 'b'){
        this.selectByGears = 'SPEED'
      }
      else if(value === 'c'){
        this.selectByGears = 'HEALTH'
      }
      else if(value === 'd'){
        this.selectByGears = 'DAMAGE'
      }
      else if(value === 'e'){
        this.selectByGears = 'RESISTANCE'
      }
      else if(value === 'f'){
        this.selectByGears = 'SHIELD'
      }
    },
    selectGear(item){
      if(this.selectByGears === 'all'){
        return true
      }
      else{
        let name1, name2
        if('gears' in item){
          if(item.gears.length === 1){
            name1 = item.gears[0].name
            name2 = 'null'
          }
          else if(item.gears.length === 2){
            name1 = item.gears[0].name
            name2 = item.gears[1].name
          }
        }
        else{
          name1 = 'null'
          name2 = 'null'
        }
        if(this.selectByGears === 'SPEED'){
          return name1 === 'SPEED' || name2 === 'SPEED'
        }
        else if(this.selectByGears === 'HEALTH'){
          return name1 === 'HEALTH' || name2 === 'HEALTH'
        }
        else if(this.selectByGears === 'DAMAGE'){
          return name1 === 'DAMAGE' || name2 === 'DAMAGE'
        }
        else if(this.selectByGears === 'RESISTANCE'){
          return name1 === 'RESISTANCE' || name2 === 'RESISTANCE'
        }
        else if(this.selectByGears === 'SHIELD'){
          return name1 === 'SHIELD' || name2 === 'SHIELD'
        }
      }

    }
  },
  mounted() {
    this.$bus.$on('PersonalBrawlers',(data) => {
      this.personalBrawlers = data
    })
  },
  filters: {
    brawlersName(data){
      if(data === 'SHELLY') return '雪莉'
      else if(data === 'COLT') return '柯尔特'
      else if(data === 'BULL') return '公牛'
      else if(data === 'BROCK') return '布洛克'
      else if(data === 'RICO') return '瑞科'
      else if(data === 'SPIKE') return '斯派克'
      else if(data === 'BARLEY') return '巴利'
      else if(data === 'JESSIE') return '杰西'
      else if(data === 'DYNAMIKE') return '爆破麦克'
      else if(data === 'EL PRIMO') return '艾尔·普里莫'
      else if(data === 'MORTIS') return '莫提斯'
      else if(data === 'CROW') return '乌鸦'
      else if(data === 'POCO') return '波克'
      else if(data === 'BO') return '阿渤'
      else if(data === 'PIPER') return '佩佩'
      else if(data === 'PAM') return '帕姆'
      else if(data === 'TARA') return '塔拉'
      else if(data === 'DARRYL') return '达里尔'
      else if(data === 'PENNY') return '潘妮'
      else if(data === 'FRANK') return '弗兰肯'
      else if(data === 'GENE') return '吉恩'
      else if(data === 'TICK') return '迪克'
      else if(data === 'LEON') return '里昂'
      else if(data === 'ROSA') return '罗莎'
      else if(data === 'CARL') return '卡尔'
      else if(data === 'BIBI') return '比比'
      else if(data === '8-BIT') return '8比特'
      else if(data === 'SANDY') return '沙迪'
      else if(data === 'BEA') return '贝亚'
      else if(data === 'EMZ') return '艾魅'
      else if(data === 'MR. P') return 'P先生'
      else if(data === 'MAX') return '麦克斯'
      else if(data === 'JACKY') return '雅琪'
      else if(data === 'GALE') return '格尔'
      else if(data === 'NANI') return '纳妮'
      else if(data === 'SPROUT') return '芽芽'
      else if(data === 'SURGE') return '瑟奇'
      else if(data === 'COLETTE') return '科莱特'
      else if(data === 'AMBER') return '琥珀'
      else if(data === 'LOU') return '小罗'
      else if(data === 'BYRON') return '拜伦'
      else if(data === 'EDGAR') return '艾德加'
      else if(data === 'COLONEL RUFFS') return '拉夫上校'
      else if(data === 'STU') return '斯图'
      else if(data === 'BELLE') return '贝尔'
      else if(data === 'SQUEAK') return '史魁克'
      else if(data === 'GROM') return '格罗姆'
      else if(data === 'BUZZ') return '巴兹'
      else if(data === 'GRIFF') return '格里夫'
      else if(data === 'ASH') return '阿拾'
      else if(data === 'MEG') return '梅格'
      else if(data === 'LOLA') return '萝拉'
      else if(data === 'FANG') return '阿方'
      else if(data === 'NITA') return '妮塔'
    }
  }
}
</script>

<style>
img{
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
.van-cell{
  align-items: center
}
</style>
