<template>
  <div>
    <van-list>
      <!--id-->
      <van-divider :style="{color: 'rgb(26,82,197)', fontWeight: 'bold', marginTop: '4vh', fontSize: '2em'}">{{ personalData.name }}</van-divider>
      <h3 style="text-align: center;color: rgb(26,82,197); font-size: 1.5em;margin-top: -5px">({{ personalData.tag }})</h3>
      <!--分栏-->
      <van-row>
        <!--左边列-->
        <van-col span="12">
          <van-cell>
            <!--奖杯数-->
            <a-statistic style="margin-top: 1vh" :value="personalData.trophies" valueStyle="color: rgb(242,181,30);font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/icon_trophy_medium.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">奖杯数</span>
                </div>
              </template>
            </a-statistic>
            <!--等级-->
            <a-statistic style="margin-top: 3vh" :value="personalData.expLevel" valueStyle="color: rgb(35,143,242);font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/icon_player_level.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">等级</span>
                </div>
              </template>
            </a-statistic>
            <!--3v3胜场-->
            <a-statistic style="margin-top: 3vh" :value="personalData['3vs3Victories']" valueStyle="color: rgb(35,143,242);font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/3vs3.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">3v3胜场</span>
                </div>
              </template>
            </a-statistic>
            <!--双鸡胜场-->
            <a-statistic style="margin-top: 3vh" :value="personalData.duoVictories" valueStyle="color: rgb(35,143,242);font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/icon_showdownplus.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">双鸡胜场</span>
                </div>
              </template>
            </a-statistic>

          </van-cell>
        </van-col>
        <!--右边列-->
        <van-col span="12">
          <van-cell>
            <!--最高奖杯数-->
            <a-statistic style="margin-top: 1vh" :value="personalData.highestTrophies" valueStyle="color: red;font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/icon_trophy_medium.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">最高奖杯数</span>
                </div>
              </template>
            </a-statistic>
            <!--冠军挑战赛-->
            <a-statistic style="margin-top: 3vh" :value="personalData.isQualifiedFromChampionshipChallenge === false? '×': '√'" valueStyle="color: rgb(35,143,242);font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/icon_championship.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">冠军挑战赛</span>
                </div>
              </template>
            </a-statistic>
            <!--单鸡胜场-->
            <a-statistic style="margin-top: 3vh" :value="personalData.soloVictories" valueStyle="color: rgb(35,143,242);font-weight: bold;font-size: 2em">
              <template slot="title">
                <div>
                  <img src="~@/assets/Vector Smart Object-7.png" alt=""
                       style="height: 3vh;vertical-align: middle;margin-right: 2vw"
                  >
                  <span style="font-size: 1.5em;vertical-align: middle;color: black;">单鸡胜场</span>
                </div>
              </template>
            </a-statistic>

          </van-cell>
        </van-col>
      </van-row>
      <!--战队-->
      <van-cell>
        <a-statistic style="margin-top: 1vh" :value="personalData.club.name === undefined? '未加入战队': personalData.club.name+'('+personalData.club.tag+')'" valueStyle="color: rgb(35,143,242);font-weight: bold;font-size: 1.8em">
          <template slot="title">
            <div>
              <img src="~@/assets/icon_club_league.png" alt=""
                   style="height: 3vh;vertical-align: middle;margin-right: 2vw"
              >
              <span style="font-size: 1.5em;vertical-align: middle;color: black;">战队</span>
            </div>
          </template>
        </a-statistic>
      </van-cell>
    </van-list>
    <div style="height: 10vh"></div>
  </div>
</template>

<script>
export default {
  name: "PersonalCard-PersonalData",
  data(){
    return{
      personalData: {},
    }
  },
  mounted(){
    //接收个人信息数据
    this.$bus.$on('PersonalData', (data) => {
      this.personalData = data
    })
  }
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
