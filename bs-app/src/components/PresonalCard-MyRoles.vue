<template>
  <div>
    <!--排序-->
    <van-dropdown-menu v-if="personalBrawlers.length !== 0">
      <van-dropdown-item v-model="dropdownValue" :options="dropdownOption" @change="dropdownValue === 1?arrSortByKey(['id', true]) :arrSortByKey(dropdownValue)"/>
    </van-dropdown-menu>

    <van-collapse v-model="activeNames">
      <van-collapse-item v-for="(item,index) in personalBrawlers" :key="index" :name="index">
        <!--标题-->
        <template #title>
          <div>
            <img :src="require('../assets/brawlers/'+ item.id +'.png')" alt="" width="50vh" style="margin-right: 3vw">
            <a-tag color="green">
             Lv.{{item.power}}
            </a-tag>
            <a-tag color="orange">
              {{ item.trophies }}
            </a-tag>
          </div>
        </template>
        <!--内容-->
        <div>
          <van-row>
            <van-col span="12">
              <a-descriptions>
                <a-descriptions-item label="战力等级">
                  {{ item.power }}
                </a-descriptions-item>
                <a-descriptions-item label="荣誉等级">
                  {{ item.rank }}
                </a-descriptions-item>
                <a-descriptions-item label="当前奖杯">
                  {{ item.trophies }}
                </a-descriptions-item>
                <a-descriptions-item label="最高奖杯">
                  {{ item.highestTrophies }}
                </a-descriptions-item>
                <a-descriptions-item label="最高奖杯">
                  {{ item.highestTrophies }}
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
                <img :src="require('../assets/gears/'+ picItem.name + picItem.level +'.png')" alt="" width="30vh" style="margin-right: 15px">
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
      dropdownValue: 1,
      dropdownOption: [
        { text: '默认排序', value: 1 },
        { text: '按杯数升序', value: ['trophies', true] },
        { text: '按杯数降序', value: ['trophies', false] },
        { text: '按战力等级升序', value: ['power', true] },
        { text: '按战力等级降序', value: ['power', false] },
      ],
    }
  },
  methods: {
    arrSortByKey([key, order]) {
      return this.personalBrawlers.sort(function (a, b) {
        let value1 = a[key], value2 = b[key]
        if (order) {  //true升序
          return value1 - value2
        } else  {     //false降序
          return value2 - value1
        }
      })
    }
  },
  mounted() {
    this.$bus.$on('PersonalBrawlers',(data) => {
      this.personalBrawlers = data
    })
  },

}
</script>

<style scoped>
img{
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
</style>
