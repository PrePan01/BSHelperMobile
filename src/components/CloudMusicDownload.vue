<template>
  <div id="CMD">
    <a-input-search placeholder="请输入网易云音乐链接" size="large" v-model="searchUrl"  @search="search">
      <a-button slot="enterButton" >
        搜索
      </a-button>
    </a-input-search>
    <!--抽屉-->
    <a-button type="link" @click="showDrawer">
      什么是网易云音乐链接？
    </a-button>
    <a-drawer
        title="网易云音乐链接"
        placement="right"
        :closable="false"
        :visible="visible"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
        width="700px"
    >
      <img src="https://s4.ax1x.com/2021/12/30/T2Vlyn.png" alt="" style="margin-bottom: 20px">
      <p>PC客户端分享</p>
      <img src="https://s4.ax1x.com/2021/12/30/T2V1Lq.png" alt="" class="drawerPic">
      <p>网页链接</p>
      <img src="https://s4.ax1x.com/2021/12/30/T2V8e0.jpg" alt="" class="drawerPic">
      <p>移动端分享（无需只保留链接）</p>
    </a-drawer>
    <!--左容器-->
    <div v-if="isActive" class="leftContainer">
      <p class="songName">《{{songName}}》</p>
      <p class="singerName">{{ singerName }}</p>
      <img :src="songPic" alt="暂无封面" class="songPic">
      <div style="margin-bottom: 40px; margin-top: -15px;">
        <span class="album">专辑</span>
        <span style="font-size: 16px">《{{albumName}}》</span>
      </div>
      <div>
        <a :href="mp3link" :download="mp3link">
          <a-button type="primary" size="large">
            下载音频
          </a-button>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "CloudMusicDownload",
  data(){
    return{
      searchUrl: '',
      searchId: '',
      songName: '',
      songPic: '',
      mp3link: '',
      singerName: '',
      albumName: '',
      isActive: false,
      visible: false,
    }
  },
  methods: {
    search(){
      var n = this.searchUrl.indexOf("song?id")
      var i = 0 // eslint-disable-line no-unused-vars

      if(n === -1){
        n = this.searchUrl.indexOf("/song/")
        if( n === -1){
          alert('请输入正确地址')
        }
        else{
          this.searchId = this.searchUrl.slice(n+6)
          for(let char of this.searchId){
            i++
            if(char === '&' || char === null)
              break;
          }
          this.searchId = this.searchId.slice(0,i-1)
          console.log(this.searchId)
        }
      }
      else{
        this.searchId = this.searchUrl.slice(n+8)
        for(let char of this.searchId){
          i++
          if(char === '&' || char === null)
            break;
        }
        this.searchId = this.searchId.slice(0,i-1)
      }
      axios({
        methods: 'GET',
        url: 'https://api.muxiaoguo.cn/api/163music',
        params: {
          id: this.searchId
        }
      }).then((res)=>{
        this.songName = res.data.data.songName
        this.songPic = res.data.data.albumPicurl
        this.mp3link = res.data.data.mp3url
        this.singerName = res.data.data.songArtists
        this.albumName = res.data.data.albumName
      })
      this.searchUrl = ''
    },
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
  watch: {
    songName(newValue){
        if(newValue !== undefined){
          this.isActive = true
        }
    }
  }
}
</script>

<style scoped>
  .leftContainer{
    color: black;
    margin-top: 30px;
    margin-left: 20px;
  }
  .songName{
    display: inline-block;
    font-size: 30px;
    font-weight: bold;
  }
  .singerName{
    display: inline-block;
    font-size: 22px;
    margin-bottom: 20px;
  }
  .songPic{
    margin-top: 10px;
    margin-bottom: 10px;
    width: 300px;
    float: right;
    margin-right: 150px;
    box-shadow: 5px 5px 5px #888888;
    transition: all 0.5s;
  }
  .songPic:hover{
    width: 600px;
    transition: all 0.5s;
  }
  .drawerPic{
    width: 700px;
    margin-bottom: 20px;
  }
  .album{
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid rgb(221,0,27);
    color: rgb(221,0,27);
    padding: 5px;
    width: 20px;
    height: 5px;
    margin-right: 5px;
  }
</style>