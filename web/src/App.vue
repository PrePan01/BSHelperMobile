<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider v-model="collapsed" collapsible @collapse="changeLogoClass" width="230">
        <div :class="logoClass" class="logo" @click="toDefault">PrePan小助手</div>
        <a-menu theme="dark" mode="inline">
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="smile" /><span>荒野乱斗国际服查询</span></span>
            <a-menu-item key="1" @click="toBSPersonalCard">
              个人名片
            </a-menu-item>
            <a-menu-item key="2" @click="toRecentEvents">
              最近对战
            </a-menu-item>
            <a-menu-item key="3" @click="toDownload">
              下载
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="plus-circle" /><span>其他工具</span></span>
            <a-menu-item key="3" @click="cmd">
              <a-icon type="pie-chart" />
              <span>网易云音频下载</span>
            </a-menu-item>
            <a-menu-item key="4" @click="mt">
              <a-icon type="desktop" />
              <span>组队小助手（开发中）</span>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>

      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-alert message="未适配移动端，建议使用PC访问" type="info" show-icon closable/>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
          </a-breadcrumb>
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>

    <Suggestion class="Suggestion"></Suggestion>

    <div class="backTop">
      <a-back-top />
    </div>

    <Footer></Footer>
  </div>

</template>

<script>
import Suggestion from "@/components/Suggestion";
import Footer from "@/components/Footer";

//百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?fb1e2c3d5ac65a2dbdd77d08a2397c2b";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

export default {
  name: 'App',
  components: {
    Suggestion, Footer
  },
  data() {
    return {
      collapsed: false,
      logoClass: 'logoClassFalse'
    };
  },
  methods: {
    //路由跳转
    toDefault(){
      this.$router.push('/')
    },
    cmd(){
      this.$router.push('/cloudmusicdownload')
    },
    mt(){
      this.$router.push('/make-team')
    },
    toBSPersonalCard(){
      this.$router.push('/bsPersonalCard')
    },
    toRecentEvents(){
      this.$router.push('/recentEvents')
    },
    toDownload(){
      this.$router.push('/bsDownload')
    },
    changeLogoClass() {
      if(this.collapsed){
        this.logoClass = 'logoClassTrue'
      }
      else{
        this.logoClass = 'logoClassFalse'
      }
    }
  }
}
</script>

<style>
  #components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    background: none !important;
    color: white;
    text-align: center;
  }
  .logoClassFalse{
    font-size: 22px;
    transition: all 0.3s;
  }
  .logoClassTrue{
    font-size: 14px;
    transition: all 0.2s;
    margin-bottom: 25px !important;
  }
  .Suggestion{
    position: fixed;
    left: 10px;
    bottom: 90px;
  }
  .ant-back-top{
    right: 52px !important;
    bottom: 30px !important;
  }
  .logo{
    color: lightskyblue !important;
    background-color: #fff;
  }
  .logo:hover{
    cursor: pointer;
  }

  ::-webkit-scrollbar{
    width: 6px;
    height: 5px;
    background-color: #ffffff;
    display: block;
  }

  /*轨道*/
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0);
    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0);
    border-radius: 10px;
    background-color: #ffffff;
  }

  /*滑块*/
  ::-webkit-scrollbar-thumb{
    height: 10px;
    border-radius: 6px;
    box-shadow: inset 0 0 2px rgba(0, 0, 0, .1);
    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, .1);
    background-color: rgba(210,210,210, 1);
  }
</style>
