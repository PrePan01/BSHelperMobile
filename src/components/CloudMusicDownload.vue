<template>

  <div id="CMD" v-loading="loading">

    <!--搜索框切换-->
    <div class="inputSwitchValue">
      <el-switch
          style="display: block"
          v-model="inputSwitchValue"
          active-color="rgb(24,144,255)"
          inactive-color="rgb(24,144,255)"
          active-text="链接搜索"
          inactive-text="关键词搜索">
      </el-switch>
    </div>

    <!--链接搜索输入框-->
    <div v-if="inputSwitchValue">
      <!--链接搜索-->
      <a-input-search placeholder="请输入网易云音乐链接" size="large" v-model="searchUrl"  @search="search">
        <a-button slot="enterButton" >
          搜索
        </a-button>
      </a-input-search>
      <!--右侧抽屉-->
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
    </div>

    <!--关键词搜索输入框-->
    <div v-if="!inputSwitchValue">
      <a-input-search placeholder="请输入关键词" size="large" v-model="keyWords"  @search="searchkeyWord">
        <a-button slot="enterButton" >
          搜索
        </a-button>
      </a-input-search>
    </div>

    <!--链接搜索结果-->
    <div v-if="isLinkSearchActive" class="leftContainer clearFloat">
      <p class="songName">《{{songName}}》</p>

      <div class="singerName">
        <a-popover>
          <template slot="title">
            <div style="font-size: 18px;font-weight: bold;margin:5px 0;">{{ singerName }}</div>
          </template>
          <template slot="content">
            <div>
              <img :src="artistsPic" alt="暂无图片" style="width: 400px;display: inline-block;vertical-align: top;">
              <div style="display: inline-block;vertical-align: top;margin-left: 20px">
                <span style="font-weight: bold;font-size: 17px">歌手简介：</span>
                <div style="font-size: 15px;width: 500px;word-break: break-word;">
                  {{ artistsInfo }}
                </div>
              </div>
            </div>
          </template>
          <a-button size="large" type="link" style="font-size: 26px;color: rgb(24,144,255)" @click="searchArtist">
            {{ singerName }}
          </a-button>
        </a-popover>
      </div>

      <img :src="songPic" alt="暂无封面" class="songPic">
      <div style="margin-bottom: 40px; margin-top: -15px;">
        <span class="album">专辑</span>
        <span style="font-size: 16px">
          《{{albumName}}》
        </span>
      </div>

      <!--下载按钮-->
      <div>
        <a-button type="primary" size="large" @click="downloadMp3" style="margin-right: 20px">
            下载音频
        </a-button>

        <a-button @click="showDrawer" size="large">
          查看歌词
        </a-button>
        <a-drawer
            :title=" this.songName +'歌词' "
            placement="right"
            :closable="false"
            :visible="visible"
            :after-visible-change="afterVisibleChange"
            @close="onClose"
            width="500"
        >
          <p style="white-space: pre-line;font-size: 18px">{{ this.lyrics }}</p>

        </a-drawer>
      </div>



      <!--评论-->
      <div class="comments">
        <p>热门评论</p>
        <a-list
            item-layout="horizontal"
            :data-source="hotComments"
            :split = "false"
            class="commentssList"
            :loading = "isCommentsLoading"
        >
          <a-list-item slot="renderItem" slot-scope="item" style="padding: 16px 0">
            <a-list-item-meta
                :description = item.content
            >
              <a slot="title">{{ item.user.nickname }}</a>
              <a-avatar
                  slot="avatar"
                  :src= item.user.avatarUrl
                  shape="square"
                  :size="45"
              />
            </a-list-item-meta>
          </a-list-item>

        </a-list>

      </div>
    </div>

    <!--关键词搜索结果-->
    <div v-if="isKeywordsSearchActive" class="keywordsSearchResults">
      <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }" :data-source="keyWordsResults">

        <a-list-item slot="renderItem" slot-scope="item">
          <a-card style="padding-bottom: 0">
            <!--自定义标题-->
            <template slot="title">
              <span class="toDetailTitle">
                {{ item.name }}
                <br>
                <span style="font-weight: lighter;font-size: 18px;margin-bottom: -10px">{{ item.ar[0].name }}</span>
              </span>
              <span>
              <a-button type="link" block class="toDetailBtn" @click="tokeyWordsResultsItem(item.id)">查看 ></a-button>
              </span>
            </template>
            <div style="margin-top: 10px">
              <div id="keywordsD">
                <img :src="item.al.picUrl" alt="暂无图片" id="keywordsPic">
              </div>
            </div>
          </a-card>
        </a-list-item>
      </a-list>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
import download from 'downloadjs'

export default {
  name: "CloudMusicDownload",
  data(){
    return{
      searchUrl: '',
      keyWords:'',  //关键词搜索
      searchId: '',
      songName: '',
      songPic: '',
      mp3link: '',
      singerName: '',
      albumName: '',
      lyrics: '',
      artistsId:'', //歌手Id
      artistsPic:'',  //歌手图片
      artistsInfo: '',
      br:'',  //码率
      hotComments: [ ],
      keyWordsResults: [ ],
      isLinkSearchActive: false,
      isKeywordsSearchActive: false,
      // isQuery: false,
      visible: false,
      inputSwitchValue : true, //true：链接搜索
      loading: false,
      isCommentsLoading: false
    }
  },
  methods: {
    //关键词搜索
    searchkeyWord(){
      if(this.keyWords !== ''){
        this.loading = true
        axios({
          methods: 'GET',
          url: 'https://cloud-music-api-lyart.vercel.app/cloudsearch',
          params: {
            keywords: this.keyWords
          }
        }).then((res)=>{
          this.keyWordsResults = res.data.result.songs
        })
      }
    },

    //点击歌手名搜索
    searchArtist(){
      this.keyWords = this.singerName
      this.searchkeyWord()
    },

    //进入关键词搜索条目
    tokeyWordsResultsItem(id){
      this.searchId = id
      this.getNameAndPic()
      this.getHotComments()
      this.mp3link=''
      this.getMp3url()
    },

    // 获取链接中的音乐ID
    getSongId(){
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
    },

    // 获取音乐名与专辑封面
    getNameAndPic(){
      this.loading = true
      axios({
        methods: 'GET',
        url: 'https://api.muxiaoguo.cn/api/163music',
        params: {
          id: this.searchId
        }
      }).then((res)=>{
        this.songName = res.data.data.songName
        this.songPic = res.data.data.albumPicurl
        this.singerName = res.data.data.songArtists
        this.albumName = res.data.data.albumName
        this.artistsId = res.data.data.artistsId
        this.lyrics = res.data.data.lyrics
        this.loading = false
        this.getArtist()
      })
    },

    //获取下载地址
    getMp3url(){
      axios({
        methods: 'GET',
        url: 'https://cloud-music-api-lyart.vercel.app/song/url',
        params: {
          id: this.searchId
        }
      }).then((res)=>{
        if(res.data.data[0].br === 0){
          this.getMp3urlBackup()
        }
        else {
          this.br = res.data.data[0].br
          this.mp3link = res.data.data[0].url
        }
      })
    },

    //备用获取下载地址
    getMp3urlBackup(){
      axios({
        methods: 'GET',
        url: 'https://api.muxiaoguo.cn/api/163music',
        params: {
          id: this.searchId
        }
      }).then((res)=>{
        this.mp3link = res.data.data.mp3url
      })
    },

    //歌手头像与简介
    getArtist(){
      axios({
        methods: 'GET',
        url: 'https://cloud-music-api-lyart.vercel.app/artist/detail',
        params: {
          id: this.artistsId
        }
      }).then((res)=>{
        this.artistsPic = res.data.data.artist.cover
        this.artistsInfo = res.data.data.artist.briefDesc
      })
    },

    //获取热评
    getHotComments(){
      this.isCommentsLoading = true
      axios({
        methods: 'GET',
        url:'https://cloud-music-api-lyart.vercel.app/comment/music',
        params: {
          id: this.searchId
        }
      }).then((res)=>{
        this.hotComments = res.data.hotComments
        this.loading = false
        this.isCommentsLoading = false
      })
    },

    //链接搜索
    search(){
      this.getSongId()
      if(this.searchId !== ''){
        this.getNameAndPic()
        this.getHotComments()
        this.getMp3url()
      }
    },

    //直接下载音频
    downloadMp3(){
      download(this.mp3link)
    },

    //抽屉
    afterVisibleChange(val) {

    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },

  watch: {
    //监听歌曲名，歌曲详情面板
    mp3link(newValue){
      if(newValue !== undefined){
        this.isLinkSearchActive = true
        this.isKeywordsSearchActive = false
        this.searchUrl = ''
        this.loading = false
      }
    },
    //监听关键词搜索结果，歌曲列表面板
    keyWordsResults(newValue){
      if(newValue !== undefined){
        this.isLinkSearchActive = false
        this.isKeywordsSearchActive = true
        this.loading = false
      }
    },
    /*hotComments(){
      this.isCommentsLoading = false
    }*/
  }
}
</script>

<style scoped>
  .inputSwitchValue{
    margin-bottom: 20px;
  }
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
    display: inline-block;
    float: right;
    margin: 10px 100px 10px 30px;
    width: 300px;
    box-shadow: 5px 5px 5px #888888;
    transition: all 0.5s;
  }
  .songPic:hover{
    width: 600px;
    transition: all 0.5s;
  }
  .drawerPic{
    width: 600px;
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
  .clearFloat::after{
    content: '';
    display: block;
    clear: both;
  }
  .comments{
    width: 60vw;
  }
  .comments p{
    font-size: 28px;
    font-weight: bold;
    margin-top: 170px;
    margin-bottom: 5px;
    width: 112px;
    border-bottom: 2px solid rgb(221,0,27);
  }
  .commentsList{
    width: 800px;
    margin-top: -10px;
  }
  .ant-list-item-meta-title{
    font-size: 18px !important;
    line-height: 26px !important;
  }
  .ant-list-item-meta-description{
    font-size: 16px !important;
  }
  .ant-list-item-meta-avatar{
    margin-top: 4px;
  }
  .keywordsSearchResults{
    margin-top: 20px;
  }
  #keywordsD{
    display: flex;
    /*height: 34vh;*/
    overflow: hidden;
    flex-direction: row;
    justify-content: space-around
  }
  #keywordsPic{
    flex-shrink: 1;
    /*width: 85%;*/
    height: 34vh;
    width: 34vh;
    border-radius: 15px;
  }
  .toDetailBtn{
    float: right;
    right: 20px;
    width: 45px;
  }
  .toDetailTitle{
    display: inline-block;
    font-weight: bold;
    font-size: 20px;
    width: 150px !important;
    /*超出span部分显示省略号*/
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    word-break:keep-all;
  }
</style>
