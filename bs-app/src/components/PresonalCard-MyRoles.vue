<template>
  <div>
    <!--前三-->
    <div v-if="personalBrawlers.length!==0" style="width: 95vw; margin: 2px auto;border: 1px solid rgb(232,232,232);padding: 5px 5px 20px 5px">
      <div v-if="personalBrawlers.length!==0" style="text-align: center;margin-top: 10px;display: flex;justify-content: space-around;align-items: flex-end">
        <div style="display: inline-block">
          <img :src="('https://prepan.top/bsAssets/pins/top/'+ topBrawlers[1].id +'top.png')" alt="" width="70vw" class="topBrawlers">
          <img :src="('https://prepan.top/bsAssets/pins/top/top2.png')" alt="" width="35vw" class="topIcon">
          <div style="margin-top: 5px">
            <img style="vertical-align: middle;margin-right: 3px" :src="require('../assets/icon_trophy_medium.png')" alt="" width="20vw">
            <span style="color: black;font-size: 18px;vertical-align: middle">{{topBrawlers[1].trophies}}</span>
          </div>
        </div>
        <div style="display: inline-block">
          <img :src="('https://prepan.top/bsAssets/pins/top/'+ topBrawlers[0].id +'top.png')" alt="" width="85vw" class="topBrawlers">
          <img :src="('https://prepan.top/bsAssets/pins/top/top1.png')" alt="" width="40vw" class="topIcon">
          <div style="margin-top: 5px">
            <img style="vertical-align: middle;margin-right: 3px" :src="require('../assets/icon_trophy_medium.png')" alt="" width="20vw">
            <span style="color: black;font-size: 18px;vertical-align: middle">{{topBrawlers[0].trophies}}</span>
          </div>
        </div>
        <div style="display: inline-block">
          <img :src="('https://prepan.top/bsAssets/pins/top/'+ topBrawlers[2].id +'top.png')" alt="" width="60vw" class="topBrawlers">
          <img :src="('https://prepan.top/bsAssets/pins/top/top3.png')" alt="" width="30vw" class="topIcon">
          <div style="margin-top: 5px">
            <img style="vertical-align: middle;margin-right: 3px" :src="require('../assets/icon_trophy_medium.png')" alt="" width="20vw">
            <span style="color: black;font-size: 18px;vertical-align: middle">{{topBrawlers[2].trophies}}</span>
          </div>
        </div>
      </div>
    </div>

    <!--排序-->
    <div style="margin: 8px 1vw 5px 2vw;text-align: center" v-if="personalBrawlers.length !== 0">
      <van-row>
        <van-col span="9">
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
        <van-col span="9">
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
              洞察
            </a-select-option>
            <a-select-option value = 'f'>
              护盾
            </a-select-option>
          </a-select>
        </van-col>
        <van-col span="6">
          <div class="brawlersNum">
            <span style="border: 1px solid #d9d9d9;padding: 3px 5px;border-radius: 4px;color: rgb(57,118,227)">{{brawlsNum}}</span>
            <span> / 60</span>
          </div>
        </van-col>
      </van-row>
    </div>

    <!--列表-->
    <van-collapse v-model="activeNames">
      <van-collapse-item v-for="(item,index) in personalBrawlers" :key="index" :name="index" v-show="selectGear(item)">
        <!--标题-->
        <template #title>
          <div style="display: flex; flex-direction: row; align-items: center;">
            <img :src="('https://prepan.top/bsAssets/brawlers/' + item.id +'.png')" alt="" width="52px" style="margin-right: 2vw">
            <div style="display: flex;flex-direction: column;align-items: flex-start">
              <span style="font-size: 18px;margin-bottom: 4px">{{item.name | brawlersName}}</span>
              <a-tag :color="item.power === 11? 'purple': item.power === 10? 'cyan': 'green'">
                Lv.{{item.power}}
              </a-tag>
            </div>
            <span style="margin-left: auto;padding-right: 40px">
              <div style="display: inline-block;width: 120px">
                <a-progress :strokeWidth="8" :percent="item.trophies / item.highestTrophies * 100" status="active" strokeColor="rgb(255,190,32)">
                <template #format="">
                  <span style="color: black">
                    <span style="font-weight: bold;font-size: 16px;color: rgb(255,190,32)">{{ item.trophies }}</span>
                    /
                    <span>{{item.highestTrophies}}</span>
                  </span>
                </template>
              </a-progress>
              </div>
            </span>
          </div>
        </template>
        <!--内容-->
        <div style="padding-left: 16px">
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
                <img :src="('https://prepan.top/bsAssets/starPowersAndGadgets/'+ picItem.id +'.png')" alt="" width="30vh" style="margin-right: 15px">
                </span>
              </div>
              <!--武装配件-->
              <div v-if="item.gadgets.length !== 0" style="margin-bottom: 1vh">
                <div style="color: black; margin-bottom: 0.5em">武装配件</div>
                <span v-for="(picItem, index) in item.gadgets" :key="index">
                <img :src="('https://prepan.top/bsAssets/starPowersAndGadgets/' + picItem.id +'.png')" alt="" width="30vh" style="margin-right: 15px">
                </span>
              </div>
              <!--装备-->
              <div v-if="item.gears.length !== 0">
                <div style="color: black; margin-bottom: 0.5em">装备</div>
                <span v-for="(picItem, index) in item.gears" :key="index">
                <img :src="('https://prepan.top/bsAssets/gears/'+ picItem.name + picItem.level +'.png')" alt="" width="35vh" style="margin-right: 15px">
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
      selectByGears: 'all',
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
        this.selectByGears = 'VISION'
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
        let gears = item.gears
        if(gears.length === 0){
          return false
        }
        else{
          for(let i in gears){
            if(gears[i].name === this.selectByGears){
              return true
            }
            if(i === gears.length && gears[i].name !== this.selectByGears){
              return false
            }
          }
        }

      }

    },
  },
  mounted() {
    this.$bus.$on('PersonalBrawlers',(data) => {
      this.personalBrawlers = data
    })
  },
  computed: {
    brawlsNum: {
      get(){
        let arr = [0,0,0,0,0,0] //迅捷 恢复 强攻 韧性 护盾 所有 SPEED HEALTH DAMAGE RESISTANCE SHIELD
        arr[5] = this.personalBrawlers.length
        let brawlers = this.personalBrawlers
        for(let i in brawlers){
          for(let j in brawlers[i].gears){
            let name = brawlers[i].gears[j].name
            if(name === 'SPEED') arr[0]++
            else if(name === 'HEALTH') arr[1]++
            else if(name === 'DAMAGE') arr[2]++
            else if(name === 'VISION') arr[3]++
            else if(name === 'SHIELD') arr[4]++
          }
        }
        if(this.selectByGears === 'all'){
          return arr[5]
        }
        else if(this.selectByGears === 'SPEED'){
          return arr[0]
        }
        else if(this.selectByGears === 'HEALTH'){
          return arr[1]
        }
        else if(this.selectByGears === 'DAMAGE'){
          return arr[2]
        }
        else if(this.selectByGears === 'VISION'){
          return arr[3]
        }
        else if(this.selectByGears === 'SHIELD'){
          return arr[4]
        }
        return 0
      }

    },
    topBrawlers: {
      get(){
        let beforeSortData = []
        for(let i in this.personalBrawlers){
          beforeSortData[i] = this.personalBrawlers[i]
        }
        let sortedData = beforeSortData.sort(function (a, b){
          return b.trophies - a.trophies
        })
        return sortedData.slice(0,3)
      }
    },
    getStarPowers(){
      return function (data){
        try{
          require('https://prepan.top/bsAssets/starPowersAndGadgets/'+ data.id +'.png')
          return data.id
        }
        catch (e) {
          return 'default'
        }
      }
    }
  }
}
</script>

<style>
@import "https://at.alicdn.com/t/font_3113095_3ehy5zd7ou7.css";
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
.brawlersNum{
  font-size: 18px;
  height: 32px;
  line-height: 32px;
  font-weight: bold;
}
.topIcon{
  margin: 0 auto;
  display: block;
}
.topBrawlers{
  margin-bottom: 5px;
}
</style>
