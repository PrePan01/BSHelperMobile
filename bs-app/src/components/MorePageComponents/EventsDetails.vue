<template>
  <div>
    <!--加载遮罩-->
    <van-overlay :show="showOverlay" z-index="100">
      <div class="wrapper">
        <van-loading color="#1989fa" />
      </div>
    </van-overlay>
    <!--标题头-->
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        :title="name | eventsName"
        :sub-title="mapName"
        @back="onClickLeft"
    >
    </a-page-header>
    <a-popover>
      <template slot="content">
        <img :src="require('@/assets/maps/'+ 'supercell-'+ mapName.toLowerCase().replace(/\s/g,'-') + '-thumb' +'.png')" alt="" width="300px">
      </template>
      <a-button style="position: absolute;z-index: 3;right: 20px;top: 18px">
        查看地图
      </a-button>
    </a-popover>
    <!--表格-->
    <a-table :columns="columns" :data-source="stats" :pagination="false" :scroll="{ y: '85vh' }">
      <span slot="brawler" slot-scope="brawler">
        <img :src="require('@/assets/brawlers/'+ brawler +'.png')" alt="" width="50vh">
      </span>
      <span slot="winRate" slot-scope="winRate">
        {{winRate.toFixed(2)}}%
      </span>
      <span slot="useRate" slot-scope="useRate">
        {{useRate.toFixed(2)}}%
      </span>
      <span slot="starRate" slot-scope="starRate">
        {{starRate.toFixed(2)}}%
      </span>
    </a-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "EventsDetails",
  data(){
    return{
      event: '',  //active: 当前活动
      name: '',  //模式名称,
      mapName: '', //地图名称
      stats: [], //英雄胜率数据
      teamStats: [], //队伍胜率数据，
      columns: [
        {
          title: '英雄',
          dataIndex: 'brawler',
          key: 'brawler',
          scopedSlots: { customRender: 'brawler' },
          width: 80
        },
        {
          title: '胜率',
          dataIndex: 'winRate',
          key: 'winRate',
          scopedSlots: { customRender: 'winRate' },
          sorter: (a, b) => a.winRate - b.winRate,
        },
        {
          title: '使用率',
          dataIndex: 'useRate',
          key: 'useRate',
          scopedSlots: { customRender: 'useRate' },
          sorter: (a, b) => a.useRate - b.useRate,
        },
        {
          title: 'MVP率',
          dataIndex: 'starRate',
          key: 'starRate',
          scopedSlots: { customRender: 'starRate' },
          sorter: (a, b) => a.starRate - b.starRate,
        },
      ],
      showOverlay: false
    }
  },
  methods: {
    onClickLeft(){
      this.$router.push('/events')
      this.stats = []
      this.teamStats = []
    },
    getData() {
      this.showOverlay = true
      axios({
        methods: 'GET',
        url: 'https://api.brawlapi.com/v1/events'
      }).then((res) => {
        if(this.event === 'active'){
          for(let i in res.data.active){
            if(res.data.active[i].map.gameMode.name === this.name){
              this.stats = res.data.active[i].map.stats
              this.teamStats = res.data.active[i].map.teamStats
              this.mapName = res.data.active[i].map.name
              break
            }
          }
        }
        else{
          for(let i in res.data.upcoming){
            if(res.data.upcoming[i].map.gameMode.name === this.name){
              this.stats = res.data.upcoming[i].map.stats
              this.teamStats = res.data.upcoming[i].map.teamStats
              this.mapName = res.data.upcoming[i].map.name
              break
            }
          }
        }
        this.showOverlay = false
      })
    }
  },
  filters: {
    eventsName(data){
      if(data === 'Gem Grab') return '宝石争霸'
      else if(data === 'Brawl Ball') return '乱斗足球'
      else if(data === 'Hot Zone') return '热区争夺'
      else if(data === 'Bounty') return '赏金猎人'
      else if(data === 'Siege') return '机甲攻坚战'
      else if(data === 'Knockout') return '乱斗淘汰赛'
      else if(data === 'Heist') return '金库攻防'
    }
  },
  watch: {
    '$route'(val){
      this.name = val.query.name
      this.event = val.query.event
      this.getData()
    }
  },
  mounted(){
    this.name = this.$route.query.name
    this.event = this.$route.query.event
    this.getData()
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
