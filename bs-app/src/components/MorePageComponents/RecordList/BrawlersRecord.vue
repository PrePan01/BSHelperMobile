<template>
  <div>
    <!--加载遮罩-->
    <van-overlay :show="showOverlay" z-index="100">
      <div class="wrapper">
        <van-loading color="#1989fa" />
      </div>
    </van-overlay>

    <div>
      <van-row>
        <van-col span="4" style="height: 87vh;overflow: scroll">
          <div>
            <img
                :class="index === brawlActiveIndex? 'brawlActive': ''"
                style="max-width: 95%;"
                v-for="(item, index) in this.brawlersList"
                :key="index"
                :src="require('@/assets/brawlers/'+ item +'.png')"
                alt=""
                @click="chooseBrawlerData = brawlersRecordData.data[item];brawlActiveIndex = index"
            >
          </div>
        </van-col>
        <van-col span="20" style="height: 87vh;overflow: scroll;border-right: 5px">
          <a-list :data-source="chooseBrawlerData" style="margin: 10px 10px 0 5px">
            <a-list-item slot="renderItem" slot-scope="item">
              <span class="name" @click="searchPlayer(item.player.tag)" style="color: rgb(57,118,227)">{{ item.player.name }}</span>
              <img src="@/assets/icon_trophy_small.png" alt="" width="22vw" style="margin-right: 5px">
              <span style="display: inline-block;margin-right: 10vw;font-size: 16px">{{ item.best }}</span>
              <span style="float: right;text-align: center">
                <div style="display: inline-block">
                  <div>达成时间</div>
                  <div>{{ item.achieved_at | dateFormatter }}</div>
                </div>
              </span>
            </a-list-item>
          </a-list>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: "BrawlersRecord",
  data(){
    return{
      brawlersRecordData: {},
      brawlersList: [],
      chooseBrawlerData: [],
      brawlActiveIndex: 0,
      showOverlay: false
    }
  },
  methods: {
    getData(){
      this.showOverlay = true
      axios({
        methods: 'GET',
        url: 'https://api.brawlapi.com/v1/records'
      }).then((res) => {
        this.brawlersRecordData = res
        this.showOverlay = false
      })
    },
    createBrawlersList(){
      let num = 0
      for(let i = 0; i <= 53; i++,num++){
        if(num===33) num++
        this.brawlersList[i] = 16000000 + num
      }
    },
    searchPlayer(data){
      this.$router.push('/')
      this.$bus.$emit('tabberActive', 0)
      this.$bus.$emit('onSearch',data)
    }
  },
  created(){
    this.createBrawlersList()
  },
  mounted(){
    this.getData()
  },
  filters: {
    dateFormatter(data) {
      return data.slice(0,10)
    }
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
.brawlActive{
  border-style: inset;
}
.name{
  width: 30vw;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
