<template>
  <div>
    <van-popup v-model="showPop" position="bottom" :style="{ height: '60%' }" close-icon-position="top-right" @close="closePop">
      <iframe
          ref="ifr"
          height = 100%
          width = 100%
          src="https://wj.qq.com/s2/10412556/bf33/"
          frameborder="0"
          allowfullscreen
          sandbox="allow-same-origin allow-scripts allow-modals allow-downloads allow-forms allow-popups">
      </iframe>
    </van-popup>
    <!--标题头-->
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240);height: 8vh"
        title="皮肤图鉴"
        :sub-title="'数据更新时间 '+updateTime"
        @back="onClickLeft"
    ></a-page-header>

    <!--贡献名单-->
    <a-button type="Default" class="contribute" @click="openContribute = true">
      贡献名单
    </a-button>
    <van-popup v-model="openContribute" position="top" :style="{ height: '30%' }" class="contribute-container">
      <h2>皮肤数据贡献名单</h2>
      <span v-for="(item, index) in contributor" :key="index" class="contributor">{{ item }}</span>
      <h4>感谢每一位提交更新数据的小伙伴！</h4>
    </van-popup>

    <div>
      <van-row>
        <van-col span="5" style="height: 92vh;overflow: scroll">
          <div>
            <img
                :class="index === brawlActiveIndex? 'brawlActive': ''"
                style="max-width: 95%;"
                v-for="(item, index) in this.brawlersList"
                :key="index"
                :src="require('@/assets/brawlers/'+ item +'.png')"
                alt=""
                @click="brawlActiveIndex = index;"
            >
          </div>
        </van-col>
        <van-col span="19" style="height: 92vh;overflow: scroll;border-right: 5px">
          <div class="nameTitle">
            <div class="nameTitle-brawlerName">
              {{brawlActiveIndex | brawlersName}}
            </div>
            <div style="font-size: 22px">
              共{{skinsData[brawlActiveIndex].length}}款皮肤
            </div>
          </div>
          <div v-for="(item, index) in skinsData[brawlActiveIndex]" :key="index">
              <template>
                <a-card hoverable style="width: 90%;margin: 2vh auto;">
                  <template slot="title" >
                    <div class="name">
                      {{ item[1] }}
                    </div>
                  </template>
                  <van-image
                      slot="cover"
                      :src="'https://prepan.top/bs_m/img/skins/' + brawlActiveIndex + '/' + item[0] + '.png'"
                      style="width: 70%;margin: 2vh auto 0 auto"

                  >
                    <template v-slot:loading>
                      <a-spin>
                        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
                      </a-spin>
                    </template>
                  </van-image>
                  <!--动作-->
                  <template slot="actions" class="ant-card-actions">
                    <a-icon type="info-circle" @click="openNotification(item[1],item[5])"/>
                    <a-icon type="edit" @click="showPop = true"/>
                    <div v-if="item[6]" style="color: lightcoral">已绝版</div>
                    <div v-if="!item[6]" style="color: lightseagreen">未绝版</div>

                  </template>
                  <a-card-meta>
                    <!--描述-->
                    <template slot="description">
                      <div class="detailItem">
                        <img :src="require('@/assets/' + item[2] + '.png')" alt="" v-if="item[2] !== 'free' && item[2] !== 'rmb' " style="width: 26px;margin-right: 5px">
                        <span class="price">{{ item[3]===''?'免费':item[3] }}</span>
                      </div>
                      <div class="detailItem" v-if="item[2]==='gems'">
                        <div v-if="item[4]===''">
                          <span class="priceL">史低：{{ item[4]===''?'暂无数据':item[4] }}</span>
                        </div>
                        <div v-else class="detailItem" >
                          <span class="priceL">史低：</span>
                          <img :src="require('@/assets/' + item[2] + '.png')" alt="" v-if="item[2] !== 'free'" style="width: 26px;margin-right: 5px">
                          <span class="priceL">{{ item[4] }}</span>
                        </div>
                      </div>
                    </template>
                  </a-card-meta>
                </a-card>
              </template>
        </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
// import skinData from '@/assets/skinData.json'
import axios from "axios";

export default {
  name: "Skins",
  data(){
    return{
      brawlersList: [],
      chooseBrawlerData: [],
      brawlActiveIndex: 0,
      skinsData: [],
      showPop: false,
      updateTime: "",
      openContribute: false,
      contributor: []
    }
  },
  methods: {
    onClickLeft(){
      this.$router.push('/')
      this.$bus.$emit('tabberActive', 2)
    },
    openNotification(name,msg) {
      this.$notification.open({
        message: name,
        description: msg,
      });
    },
    createBrawlersList(){
      let num = 0
      for(let i = 0; i <= 57; i++,num++){
        if(num===33 || num===55) num++
        this.brawlersList[i] = 16000000 + num
      }
    },
    closePop(){
      this.$refs.ifr.src = "https://wj.qq.com/s2/10412556/bf33/"
    }
  },
  created() {
    this.createBrawlersList()
    axios({
      methods:'GET',
      url: '/demo/skinData.json'
    }).then( res => {
      this.updateTime = res.data[0][0]
      this.contributor = res.data[0][1]
      this.skinsData = res.data[1]
    })
    // this.skinsData = skinData
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
.brawlActive{
  border-style: inset;
}

.nameTitle{
  font-size: 32px;
  font-weight: bold;
  color: black;
  margin: 12px auto -6px auto;
  text-align: center;
}
.nameTitle-brawlerName{
  text-decoration: underline;
  text-decoration-color: #3976E3;
  text-decoration-thickness: 6px;
}
.name{
  font-size: 30px;
  font-weight: bold;
  word-break: break-all;
  white-space: normal;
}
.detailItem {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.price{
  font-size: 26px;
  color: black;
  font-weight: bold;
  line-height: 30px;
}
.priceL{
  font-size: 22px;
  color: black;
}
.contribute {
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 10;
}
.contribute-container {
  padding: 20px;
}
.contribute-container h4 {
  margin: 20px 0 0 0;
}
.contributor {
  margin: 10px 15px 10px 0;
}
</style>
