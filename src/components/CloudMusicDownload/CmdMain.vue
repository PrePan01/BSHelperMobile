<template>
  <div>
    <!--搜索框切换按钮-->
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

    <!--链接输入框-->
    <div v-show="inputSwitchValue">
      <!--链接搜索-->
      <a-input-search
          placeholder="请输入网易云音乐链接"
          size="large"
          v-model="searchUrl"
          @search="search"
      >
        <a-button slot="enterButton">
          <i class="iconfont icon-sousuo"></i>
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

    <!--关键词输入框-->
    <div v-show="!inputSwitchValue">
      <a-input-search placeholder="请输入关键词" size="large" v-model="keyWords"  @search="searchkeyWord">
        <a-button slot="enterButton" >
          <i class="iconfont icon-sousuo"></i>
        </a-button>
      </a-input-search>
    </div>

    <!--关键词搜索结果-->
    <KeywordsSearchResult v-show="isKeywordsSearchResultActive" />
    <UrlSearchResult v-show="isUrlSearchResultActive" />

  </div>
</template>

<script>
import KeywordsSearchResult from "@/components/CloudMusicDownload/KeywordsSearchResult";
import UrlSearchResult from "@/components/CloudMusicDownload/UrlSearchResult";

export default {
  name: "CmdMain",
  components:{
    UrlSearchResult,
    KeywordsSearchResult
  },
  data(){
    return{
      visible: false, //抽屉是否出现
      inputSwitchValue : true, //切换搜索框 true为链接搜索
      keyWords:'',  //关键词搜索
      searchUrl: '',  //链接搜索
      searchId: '', //音乐id
      isKeywordsSearchResultActive: false,  //关键词搜索界面展示
      isUrlSearchResultActive: false,  //链接搜索界面展示
    }
  },
  methods:{
    //判断链接是否合法、获取链接中音乐id
    getSongId(){
      var n = this.searchUrl.indexOf("song?id")
      var i = 0

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
          this.searchSongId()
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

    //链接搜索
    search(){
      this.getSongId()
      if(this.searchId !== ''){
        this.$bus.$emit('sendSongId', this.searchId)
        this.isKeywordsSearchResultActive = false
      }
    },

    //关键词搜索
    searchkeyWord(){
      if(this.keyWords !== ''){
        this.$bus.$emit('sendKeyWords', this.keyWords)
        this.isUrlSearchResultActive = false
        this.isKeywordsSearchResultActive = true
      }
    },

    //抽屉相关操作
    showDrawer() {
      this.visible = true;
    },
    afterVisibleChange(val) {

    },
    onClose() {
      this.visible = false;
    },
  },

  mounted() {
    //调整关键词搜索面板
    this.$bus.$on('sendIsKeywordsSearchResultActive', (res) => {
      this.isKeywordsSearchResultActive = res
    })
    //调整链接搜索面板
    this.$bus.$on('sendIsUrlSearchResultActive', (res) => {
      this.isUrlSearchResultActive = res
    })

  }
}
</script>

<style scoped>
@import '//at.alicdn.com/t/font_3113095_ffolbjphywl.css';

  .inputSwitchValue{
    margin-bottom: 20px;
  }
</style>
