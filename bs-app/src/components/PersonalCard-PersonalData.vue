<template>
  <div>
    <h1 style="font-size: 24px">{{ playName }}</h1>
    <van-row>
      <van-col span="12">
        <a-card>
          <template slot="title">
            <div class="cardTitle">
              <img src="~@/assets/icon_trophy_medium.png" alt="" style="height: 8vw;margin-right: 3vw">
              <span>奖杯数</span>
            </div>
          </template>
          <a-statistic
              :value="trophies"
              :value-style="{ color: '#cf1322', fontSize: '2em' }"
          >
            <template #suffix>
              <a-icon :type="trophies < highestTrophies? 'arrow-down' : 'arrow-up'" style="font-size: 1em;"/>
              <span style="font-size: 1.4em" v-show="trophies < highestTrophies">({{ highestTrophies - trophies  }})</span>
            </template>
          </a-statistic>
        </a-card>
      </van-col>
      <van-col span="12">
        <a-card>
          <template slot="title">
            <div class="cardTitle">
              <img src="~@/assets/icon_trophy_medium.png" alt="" style="height: 30px;">
              <span>最高奖杯数</span>
            </div>
          </template>
          <a-statistic
              :value="highestTrophies"
              :value-style="{ color: '#cf1322', fontSize: '40px' }"
          >
          </a-statistic>
      </a-card>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "PersonalCard-PersonalData",
  data(){
    return{
      personalData: {},
      playName: '',
      trophies: '',
      highestTrophies: ''
    }
  },
  mounted(){
    //接收个人信息数据
    this.$bus.$on('PersonalData', (data) => {
      this.personalData = data
      this.playName = '@' + data.name
      this.trophies = data.trophies
      this.highestTrophies = data.highestTrophies
    })
  }
}
</script>

<style scoped>

</style>
