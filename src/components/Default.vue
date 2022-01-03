<template>
  <div class="welcome">
    <i class="iconfont icon-gongju-"></i>
    <p class="head">欢迎使用PrePan小助手！</p>
    <!--更新日志-->
    <div>
      <el-button type="text" @click="dialogTableVisible = true">更新日志</el-button>

      <el-dialog title="更新日志" :visible.sync="dialogTableVisible">

        <el-timeline>
          <el-timeline-item timestamp="2022/1/3" placement="top">
            <el-card class="updataCard">
              <h3>优化</h3>
              <p>重构项目结构，优化加载速度</p>
              <p>修复bug</p>
            </el-card>
          </el-timeline-item>


          <el-timeline-item timestamp="2022/1/1" placement="top">
            <el-card class="updataCard">
              <h3>新增</h3>
              <p>歌手简介</p>
              <p>点击歌手名直接搜索</p>
              <p>查看歌词</p>
              <h3>优化</h3>
              <p>音频下载默认下载能获取到的最高音质</p>
              <p>点击下载按钮直接拉取下载，不跳转浏览器页面预览</p>

            </el-card>
          </el-timeline-item>

          <el-timeline-item timestamp="2021/12/31" placement="top">
            <el-card class="updataCard">
              <h3>新增</h3>
              <p>关键词搜索</p>
              <p>建议收集</p>
              <p>欢迎页</p>
              <p>音乐详情页热门评论</p>
              <p>回到顶部按钮</p>
              <h3>优化</h3>
              <p>全新侧边栏</p>
              <p>加载中动画</p>
              <p>音乐详情页布局</p>
            </el-card>
          </el-timeline-item>

          <el-timeline-item timestamp="2021/12/29" placement="top">
            <el-card class="updataCard">
              <h3>新增</h3>
              <p>[网易云音频下载] 栏目</p>
              <p>根据网易云链接搜索、下载音频功能</p>
            </el-card>
          </el-timeline-item>

          <el-timeline-item timestamp="2021/12/28" placement="top">
            <el-card class="updataCard">
              <h3>项目开启</h3>
            </el-card>
          </el-timeline-item>
        </el-timeline>

      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Default",
  data() {
    return{
      dialogTableVisible: false,
    }
  },
  methods: {

  },
}
</script>

<style scoped>
@import "//at.alicdn.com/t/font_3113095_vc2hf2m7zl.css";
.welcome{
  text-align: center;
}
.head{
  font-size: 40px;
  color: black;
  font-weight: bold;
  text-align: center;
}
.icon-gongju-{
  font-size: 140px;
  color: rgb(0,21,41);
}
.updataCard h3{
  font-weight: bold;
}
</style>
