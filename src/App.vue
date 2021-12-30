<template>
  <div id="app">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo">PrePan小助手</div>
        <a-menu theme="dark" mode="inline">
          <a-menu-item key="1" @click="cmd">
            <a-icon type="customer-service" />
            <span>网易云音频下载</span>
          </a-menu-item>
          <a-menu-item key="2" @click="mt">
            <a-icon type="message" />
            <span>组队小助手</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <a-layout-content
            :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    cmd(){
      this.$router.push('/cloudmusicdownload')
    },
    mt(){
      this.$router.push('/make-team')
    }
  }
}
</script>

<style>
  .logo{
    font-size: 22px;
    color: white;
    background: none !important;
    text-align: center;
  }
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
