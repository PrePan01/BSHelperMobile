<template>
  <!--加载动画-->
  <div>
    <div v-show="loading">
      <a-spin>
        <a-icon slot="indicator" type="loading" style="font-size: 44px" spin />
      </a-spin>
    </div>
    <!--链接搜索结果-->
    <div class="leftContainer clearFloat">
      <p class="songName">{{ '《' + songName + '》' }}</p>

      <div class="singerName">
        <a-popover>
          <template slot="title">
            <div style="font-size: 18px;font-weight: bold;margin:5px 0;">
              {{ singerName }}
            </div>
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
          {{'《' + albumName + '》' }}
        </span>
      </div>

      <!--下载按钮-->
      <div>
        <a-button
            type="primary"
            size="large"
            @click="downloadMp3"
            style="margin-right: 20px"
        >
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

      <iframe
          class="player"
          frameborder="no"
          border="0"
          marginwidth="0"
          marginheight="0"
          width=300
          height=86
          :src="player">
      </iframe>

      <!--评论-->
      <div class="comments">
        <p>热门评论</p>
        <a-list
            item-layout="horizontal"
            :data-source="hotComments"
            :split = "false"
            class="commentsList"
            :loading = "isCommentsLoading"
        >
          <!--评论列表-->
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

      <SimArtist class="simartist" v-if="false"></SimArtist>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import download from 'downloadjs'
import SimArtist from "@/components/CloudMusicDownload/SimArtist";

export default {
  name: "UrlSearchResult",
  components: {
    SimArtist
  },
  data(){
    return{
      searchId: '', //搜索的Id
      songName: '', //音乐名
      songPic: '',  //音乐图片
      singerName: '', //歌手名
      albumName: '',  //专辑名
      artistsId: '',  //歌手id，用来获取详细信息
      artistsPic: '', //歌手图片
      artistsInfo: '',  //歌手信息
      lyrics: '', //歌词
      player: '',
      isCommentsLoading: false, //热评加载状态
      hotComments: [ ], //热评结果
      visible: false,
      loading: false,
      indicator: <a-icon type="loading" style="font-size: 24px" spin />,
    }
  },
  methods:{
    searchSongId(){
      this.getNameAndPic()
      this.getMp3url()
      this.getHotComments()
    },

    // 获取音乐名与专辑封面
    getNameAndPic(){
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
        this.player = '//music.163.com/outchain/player?type=2&id=' + this.searchId + '&auto=0&height=66'
        //要等artistsId返回才能执行getArtist()方法
        this.$bus.$emit('sendArtistId',this.artistsId)
        this.getArtist()
      })
    },

    //获取歌手头像与简介
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
      this.loading = false
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
          axios({
            methods: 'GET',
            url: 'https://api.muxiaoguo.cn/api/163music',
            params: {
              id: this.searchId
            }
          }).then((res)=>{
            this.mp3link = res.data.data.mp3url
          })
        }
        else {
          this.br = res.data.data[0].br
          this.mp3link = res.data.data[0].url
        }
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
        this.isCommentsLoading = false
      })
    },

    //点击歌手名用关键词搜索
    searchArtist(){
      this.$bus.$emit('sendKeyWords', this.singerName)
      this.$bus.$emit('sendIsUrlSearchResultActive', false)
      this.$bus.$emit('sendIsKeywordsSearchResultActive', true)
    },

    //点击下载按钮直接下载音频
    downloadMp3(){
      download(this.mp3link)
    },

    //抽屉相关操作
    afterVisibleChange(val) {

    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },

  },

  mounted() {
    this.$bus.$on('sendSongId', (searchId) => {
      this.loading = true
      this.searchId = searchId
      this.searchSongId()
    })
  },

  watch: {
    albumName(newValue){
      this.$bus.$emit('sendIsUrlSearchResultActive', true)
      if(newValue === ''){
        this.$bus.$emit('sendIsUrlSearchResultActive', false)
      }
    }
  }

}
</script>

<style>
  .leftContainer{
    color: black;
    margin-top: 30px;
    margin-left: 20px;
  }
  .clearFloat::after{
    content: '';
    display: block;
    clear: both;
  }
  .songName{
    display: inline-block;
    font-size: 30px;
    font-weight: bold;
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
  .singerName{
    display: inline-block;
    font-size: 22px;
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
  .comments{
    width: 60vw;
  }
  .comments p{
    font-size: 28px;
    font-weight: bold;
    margin-top: 100px;
    margin-bottom: 20px;
    width: 112px;
    border-bottom: 2px solid rgb(221,0,27);
  }
  .commentsList{
    width: 800px;
    margin-top: -10px;
  }
  .ant-list-item-meta-title{
    font-size: 16px !important;
    font-weight: bold;
    margin-left: -5px;

  }
  .ant-list-item-meta-description{
    font-size: 16px !important;
    margin-left: -5px;
  }
  .ant-list-item-meta-avatar{
    margin-top: 4px;
  }
  .simartist{
    position: absolute;
    right: 100px;
    top: 700px;
    width: 16vw;
  }
  .player{
    margin-left: -10px;
    margin-top: 30px;
    z-index: 1000;
    box-shadow: 0 0 !important;
  }

</style>
