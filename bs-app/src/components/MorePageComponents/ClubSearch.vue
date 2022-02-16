<template>
  <div>
    <!--标题头-->
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="战队查询"
        @back="onClickLeft"
    />
    <!--加载遮罩-->
    <van-overlay :show="showOverlay" z-index="100">
      <div class="wrapper">
        <van-loading color="#1989fa" />
      </div>
    </van-overlay>
    <!--搜索框-->
    <van-search
        v-model="clubTag"
        placeholder="请输入战队标签 (无需#)"
        input-align="center"
        @search="search"
    />
    <!--搜索结果-->
    <div v-if="clubData !== ''">
      <!--卡片-->
      <a-card style="margin: 0 12px 0 12px; border: 1px solid #d9d9d9; border-radius: 4px;" :bordered="false">
        <template slot="title">
          <van-row type="flex" align="center">
            <van-col span="16">
              <div class="clubName" style="font-size: 1.6em; font-weight: bold; color: #3976E3;">
                {{ clubData.name }}
              </div>
              <div style="font-size: 1.2em; font-weight: bold; color: #3976E3;">
                {{ clubData.tag }}
              </div>
            </van-col>
            <van-col span="8" >
              <div>
                <img src="@/assets/icon_trophy_medium.png" alt="" width="30vw" style="margin-right: 5px">
                <span style="font-size: 1em">{{ clubData.trophies }}</span>
              </div>
            </van-col>
          </van-row>
        </template>
        <h3><b>所需奖杯：</b>{{ clubData.requiredTrophies }}</h3>
        <h3><b>类型：</b>{{ clubData.type | inviteType }}</h3>
        <h3><b>成员：</b>{{ clubData.members.length }} / 30</h3>
        <h3>{{ clubData.description }}</h3>
      </a-card>
      <a-list
          style="margin: 10px 12px 0 12px"
          :bordered="true"
          item-layout="horizontal"
          :data-source="clubData.members"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <van-row>
            <span style="width: 60vw;display:inline-block; font-weight: bold;font-size: 16px">
              {{ item.name }}
            </span>
            <span>
              <img src="@/assets/icon_trophy_small.png" alt="" style="width: 20px;display: inline-block;vertical-align: middle">
              <span style="color: rgb(250,187,31); font-weight: bold;margin-left: 5px;font-size: 16px;vertical-align: middle">{{ item.trophies }}</span>
            </span>
          </van-row>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "ClubSearch",
  data(){
    return{
      clubTag: '',
      clubData: '',
      showOverlay: false,

    }
  },
  methods: {
    onClickLeft(){
      this.$router.push('/')
      this.$bus.$emit('tabberActive', 2)
    },
    search(){
      this.showOverlay = true
      axios({
        methods: 'GET',
        url: '/playStatsApi/clubs/' + this.clubTag,
      }).then((res) =>{
        this.clubData = res.data
        this.showOverlay = false
      })
    },
  },
  filters: {
    inviteType(data){
      if(data === 'closed') return '不可加入'
      else if(data === 'inviteOnly') return '需要批准'
      else if(data === 'open') return '自由加入'
    }
  }
}
</script>

<style scoped>
.clubName{
  width: 50vw;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-break:keep-all;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
