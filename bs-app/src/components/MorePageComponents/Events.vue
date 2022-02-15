<template>
  <div>
    <!--标题头-->
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="天梯活动"
        @back="onClickLeft"
    />
    <!--加载遮罩-->
    <van-overlay :show="showOverlay" z-index="100">
      <div class="wrapper">
        <van-loading color="#1989fa" />
      </div>
    </van-overlay>
    <!--当前活动-->
    <van-divider
        :style="{ color: 'rgb(2,77,196)', borderColor: 'rgb(2,77,196)', padding: '0 16px', fontSize: '19px' }"
    >
      当前活动
    </van-divider>
    <div v-for="(item) in activeEvents" :key="item.id" class="activeEvents">
      <!--宝石-->
      <div class="eachEvents" v-if="item.slot.name === 'Gem Grab'" @click="$router.push({path: '/eventsdetails', query: {event: 'active', name: 'Gem Grab'}})">
        <div class="eventsCard">
          <div class="timeCard">
            <div style="color: white">
              <div style="float: right;margin-right: 10px">结束时间：{{item.endTime | dateFormatter}}</div>
            </div>
          </div>
          <div style="background-color: rgb(216,82,255)" class="eventsName">
            <img src="@/assets/gameModes/gemGrab.png" alt="" width="50vw" style="margin-left: 10px">
            <span style="margin-left: 10px">
              <div class="eventsTitle">宝石争霸</div>
              <div class="mapTitle">
                {{item.map.name}}
              </div>
            </span>
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>

      <!--足球-->
      <div class="eachEvents" v-if="item.slot.name === 'Daily Events' && item.map.gameMode.name === 'Brawl Ball'" @click="$router.push({path: '/eventsdetails', query: {event: 'active', name: 'Brawl Ball'}})">
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
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>

      <!--热区-->
      <div class="eachEvents" v-if="(item.slot.name === 'Team Events' || item.slot.name === 'Team Events 2') && item.map.gameMode.name === 'Hot Zone'" @click="$router.push({path: '/eventsdetails', query: {event: 'active', name: 'Hot Zone'}})" >
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
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>

      <!--赏金猎人-->
      <div class="eachEvents" v-if="(item.slot.name === 'Team Events' || item.slot.name === 'Team Events 2') && item.map.gameMode.name === 'Bounty'" @click="$router.push({path: '/eventsdetails', query: {event: 'active', name: 'Bounty'}})">
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
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>

      <!--机甲攻坚战-->
      <div class="eachEvents" v-if="(item.slot.name === 'Team Events' || item.slot.name === 'Team Events 2') && item.map.gameMode.name === 'Siege'" @click="$router.push({path: '/eventsdetails', query: {event: 'active', name: 'Siege'}})">
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
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>

      <!--乱斗淘汰赛-->
      <div class="eachEvents" v-if="(item.slot.name === 'Team Events' || item.slot.name === 'Team Events 2') && item.map.gameMode.name === 'Knockout'" @click="$router.push({path: '/eventsdetails', query: {event: 'active', name: 'Knockout'}})">
        <div style="background-color: rgb(247,131,28);" class="eventsCard">
          <div class="timeCard">
            <div style="color: white">
              <div style="float: right;margin-right: 10px">结束时间：{{item.endTime | dateFormatter}}</div>
            </div>
          </div>
          <div class="eventsName">
            <img src="@/assets/gameModes/knockout.png" alt="" width="49vw" style="margin-left: 12px">
            <span style="margin-left: 10px">
              <div class="eventsTitle">乱斗淘汰赛</div>
              <div class="mapTitle">
                {{item.map.name}}
              </div>
            </span>
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>

      <!--金库攻防-->
      <div class="eachEvents" v-if="(item.slot.name === 'Team Events' || item.slot.name === 'Team Events 2') && item.map.gameMode.name === 'Heist'" @click="$router.push({path: '/eventsdetails', query: {event: 'active', name: 'Heist'}})">
        <div style="background-color: rgb(247,131,28);" class="eventsCard">
          <div class="timeCard">
            <div style="color: white">
              <div style="float: right;margin-right: 10px">结束时间：{{item.endTime | dateFormatter}}</div>
            </div>
          </div>
          <div class="eventsName">
            <img src="@/assets/gameModes/heist.png" alt="" width="40vw" style="margin-left: 15px">
            <span style="margin-left: 10px">
              <div class="eventsTitle">金库攻防</div>
              <div class="mapTitle">
                {{item.map.name}}
              </div>
            </span>
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>

    </div>

    <!--即将到来-->
    <van-divider
        :style="{ color: 'rgb(2,77,196)', borderColor: 'rgb(2,77,196)', padding: '0 16px', fontSize: '19px' }"
    >
      即将到来
    </van-divider>
    <div v-for="(item) in upcomingEvents" :key="item.id" class="activeEvents">

      <!--宝石-->
      <div class="eachEvents" v-if="item.slot.name === 'Gem Grab'" @click="$router.push({path: '/eventsdetails', query: {event: 'upcoming', name: 'Gem Grab'}})">
        <div class="eventsCard">
          <div class="timeCard">
            <div style="color: white">
              <div style="float: right;margin-right: 10px">结束时间：{{item.endTime | dateFormatter}}</div>
            </div>
          </div>
          <div style="background-color: rgb(216,82,255)" class="eventsName">
            <img src="@/assets/gameModes/gemGrab.png" alt="" width="50vw" style="margin-left: 10px">
            <span style="margin-left: 10px">
              <div class="eventsTitle">宝石争霸</div>
              <div class="mapTitle">
                {{item.map.name}}
              </div>
            </span>
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>

      <!--足球-->
      <div class="eachEvents" v-if="item.slot.name === 'Daily Events' && item.map.gameMode.name === 'Brawl Ball'" @click="$router.push({path: '/eventsdetails', query: {event: 'upcoming', name: 'Brawl Ball'}})">
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
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>

      <!--热区-->
      <div class="eachEvents" v-if="(item.slot.name === 'Team Events' || item.slot.name === 'Team Events 2') && item.map.gameMode.name === 'Hot Zone'" @click="$router.push({path: '/eventsdetails', query: {event: 'upcoming', name: 'Hot Zone'}})" >
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
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>

      <!--赏金猎人-->
      <div class="eachEvents" v-if="(item.slot.name === 'Team Events' || item.slot.name === 'Team Events 2') && item.map.gameMode.name === 'Bounty'" @click="$router.push({path: '/eventsdetails', query: {event: 'upcoming', name: 'Bounty'}})">
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
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>

      <!--机甲攻坚战-->
      <div class="eachEvents" v-if="(item.slot.name === 'Team Events' || item.slot.name === 'Team Events 2') && item.map.gameMode.name === 'Siege'" @click="$router.push({path: '/eventsdetails', query: {event: 'upcoming', name: 'Siege'}})">
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
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>

      <!--乱斗淘汰赛-->
      <div class="eachEvents" v-if="(item.slot.name === 'Team Events' || item.slot.name === 'Team Events 2') && item.map.gameMode.name === 'Knockout'" @click="$router.push({path: '/eventsdetails', query: {event: 'upcoming', name: 'Knockout'}})">
        <div style="background-color: rgb(247,131,28);" class="eventsCard">
          <div class="timeCard">
            <div style="color: white">
              <div style="float: right;margin-right: 10px">结束时间：{{item.endTime | dateFormatter}}</div>
            </div>
          </div>
          <div class="eventsName">
            <img src="@/assets/gameModes/knockout.png" alt="" width="49vw" style="margin-left: 12px">
            <span style="margin-left: 10px">
              <div class="eventsTitle">乱斗淘汰赛</div>
              <div class="mapTitle">
                {{item.map.name}}
              </div>
            </span>
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>

      <!--金库攻防-->
      <div class="eachEvents" v-if="(item.slot.name === 'Team Events' || item.slot.name === 'Team Events 2') && item.map.gameMode.name === 'Heist'" @click="$router.push({path: '/eventsdetails', query: {event: 'upcoming', name: 'Heist'}})">
        <div style="background-color: rgb(247,131,28);" class="eventsCard">
          <div class="timeCard">
            <div style="color: white">
              <div style="float: right;margin-right: 10px">结束时间：{{item.endTime | dateFormatter}}</div>
            </div>
          </div>
          <div class="eventsName">
            <img src="@/assets/gameModes/heist.png" alt="" width="40vw" style="margin-left: 15px">
            <span style="margin-left: 10px">
              <div class="eventsTitle">金库攻防</div>
              <div class="mapTitle">
                {{item.map.name}}
              </div>
            </span>
            <i class="iconfont icon-qianwang-xiayibu" style="margin-left: auto;margin-right: 20px;font-size: 22px;color: white"></i>
          </div>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
import axios from 'axios'
import moment from "moment"
import { Notify } from 'vant';

export default {
  name: "Events",
  data(){
    return{
      activeEvents: [],
      upcomingEvents: [],
      showOverlay: false
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/')
      this.$bus.$emit('tabberActive', 2)
    },
    getData() {
      this.showOverlay = true
      axios({
        methods: 'GET',
        url: 'https://api.brawlapi.com/v1/events'
      }).then((res) => {
        this.activeEvents = res.data.active
        this.upcomingEvents = res.data.upcoming
        this.showOverlay = false
      }).catch(err => {
        console.log(err)
        Notify({ type: 'danger', message: '数据请求异常，请稍后再试' });
        this.showOverlay = false
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
@import 'https://at.alicdn.com/t/font_3113095_qorhzfdtpio.css';

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
  padding-top: 1px;
}
.eventsCard{
  height: 12vh;
  width: 90vw;
}
.eventsName{
  display: flex;
  height: 9vh;
  width: 90vw;
  flex-direction: row;
  align-items: center;
  border: 3px solid black;
  border-top: none;
}
.eventsTitle{
  color: white;
  -webkit-text-stroke: 0.7px black;
  font-weight: bold;
  font-size: 22px;
  text-shadow: 0 2px 2px black;
}
.mapTitle{
  color: white;
  -webkit-text-stroke: 0.7px black;
  font-weight: bold;
  font-size: 16px;
  text-shadow: 0 2px 2px black;
  margin-top: -4px;
}
.eachEvents{
  box-shadow: 2px 2px 1px black;
  margin-bottom: 20px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
