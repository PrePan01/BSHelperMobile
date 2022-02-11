<template>
  <div>
    <!--标题头-->
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="当前活动"
        @back="onClickLeft"
    />
    <div v-for="(item, index) in activeEvents" :key="index" class="activeEvents">
      <!--宝石-->
      <div v-if="item.slot.name === 'Gem Grab'" style="border: 3px solid black; margin-bottom: 20px">
        <div style="background-color: rgb(216,82,255);" class="eventsCard">
          <div class="timeCard">
            <div style="color: white">
              <div style="float: right;margin-right: 10px">结束时间：{{item.endTime | dateFormatter}}</div>
            </div>
          </div>
          <div class="eventsName">
            <img src="@/assets/gameModes/gemGrab.png" alt="" width="50vw" style="margin-left: 10px">
            <span style="margin-left: 10px">
              <div class="eventsTitle">宝石争霸</div>
              <div class="mapTitle">
                {{item.map.name}}
              </div>
            </span>
          </div>
        </div>
      </div>

      <!--足球-->
      <div v-if="item.slot.name === 'Daily Events' && item.map.gameMode.name === 'Brawl Ball'" style="border: 3px solid black; margin-bottom: 20px">
        <div style="background-color: rgb(154,177,253);" class="eventsCard">
          <div class="timeCard">
            <div style="color: white">
              <div style="float: right;margin-right: 10px">结束时间：{{item.endTime | dateFormatter}}</div>
            </div>
          </div>
          <div class="eventsName">
            <img src="@/assets/gameModes/brawlBall.png" alt="" width="52vw" style="margin-left: 10px">
            <span style="margin-left: 10px">
              <div class="eventsTitle">乱斗足球</div>
              <div class="mapTitle">
                {{item.map.name}}
              </div>
            </span>
          </div>
        </div>
      </div>

      <!--热区-->
      <div v-if="(item.slot.name === 'Team Events' || item.slot.name === 'Team Events 2') && item.map.gameMode.name === 'Hot Zone'" style="border: 3px solid black; margin-bottom: 20px">
        <div style="background-color: rgb(226,59,79);" class="eventsCard">
          <div class="timeCard">
            <div style="color: white">
              <div style="float: right;margin-right: 10px">结束时间：{{item.endTime | dateFormatter}}</div>
            </div>
          </div>
          <div class="eventsName">
            <img src="@/assets/gameModes/hotZone.png" alt="" width="40vw" style="margin-left: 15px">
            <span style="margin-left: 10px">
              <div class="eventsTitle">热区争夺</div>
              <div class="mapTitle">
                {{item.map.name}}
              </div>
            </span>
          </div>
        </div>
      </div>

      <!--赏金猎人-->
      <div v-if="(item.slot.name === 'Team Events' || item.slot.name === 'Team Events 2') && item.map.gameMode.name === 'Bounty'" style="border: 3px solid black; margin-bottom: 20px">
        <div style="background-color: rgb(0,206,254);" class="eventsCard">
          <div class="timeCard">
            <div style="color: white">
              <div style="float: right;margin-right: 10px">结束时间：{{item.endTime | dateFormatter}}</div>
            </div>
          </div>
          <div class="eventsName">
            <img src="@/assets/gameModes/bounty.png" alt="" width="40vw" style="margin-left: 15px">
            <span style="margin-left: 10px">
              <div class="eventsTitle">赏金猎人</div>
              <div class="mapTitle">
                {{item.map.name}}
              </div>
            </span>
          </div>
        </div>
      </div>

      <!--机甲攻坚战-->
      <div v-if="(item.slot.name === 'Team Events' || item.slot.name === 'Team Events 2') && item.map.gameMode.name === 'Siege'" style="border: 3px solid black; margin-bottom: 20px">
        <div style="background-color: rgb(239,78,49);" class="eventsCard">
          <div class="timeCard">
            <div style="color: white">
              <div style="float: right;margin-right: 10px">结束时间：{{item.endTime | dateFormatter}}</div>
            </div>
          </div>
          <div class="eventsName">
            <img src="@/assets/gameModes/siege.png" alt="" width="40vw" style="margin-left: 15px">
            <span style="margin-left: 10px">
              <div class="eventsTitle">机甲攻坚战</div>
              <div class="mapTitle">
                {{item.map.name}}
              </div>
            </span>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from "moment"

export default {
  name: "Events",
  data(){
    return{
      activeEvents: [],
      upcomingEvents: []
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/')
      this.$bus.$emit('tabberActive', 2)
    },
    getData() {
      axios({
        methods: 'GET',
        url: 'https://api.brawlapi.com/v1/events'
      }).then((res) => {
        this.activeEvents = res.data.active
        this.upcomingEvents = res.data.upcoming
      })
    }
  },
  mounted(){
    this.getData()
  },
  filters: {
    //时间转换过滤器
    dateFormatter(data) {
      var utcDate = data.replace(/:/g,'').replace(/-/g,'')
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
      return moment(timestamp * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
  }
}
</script>

<style scoped>
.activeEvents{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.timeCard{
  height: 3vh;
  width: 90vw;
  background-color: black;
  color: white;
}
.eventsCard{
  height: 11vh;
  width: 90vw;
}
.eventsName{
  display: flex;
  height: 8vh;
  width: 90vw;
  flex-direction: row;
  align-items: center;
}
.eventsTitle{
  color: white;
  font-size: 22px;
  text-shadow: 0 2px 2px black;
}
.mapTitle{
  color: white;
  font-size: 16px;
  text-shadow: 0 2px 2px black;
}
</style>
