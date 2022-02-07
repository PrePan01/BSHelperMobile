<template>
  <div>
    <!--标题头-->
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="排行榜"
        @back="onClickLeft"
    />
    <!--导航条-->
    <van-tabs v-model="active">
      <van-tab title="英雄排行">
        <BrawlersRecord></BrawlersRecord>
      </van-tab>
      <van-tab title="玩家排行">
        <PlayerRecord></PlayerRecord>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import BrawlersRecord from '@/components/MorePageComponents/RecordList/BrawlersRecord'
import PlayerRecord from '@/components/MorePageComponents/RecordList/PlayerRecord'

export default {
  name: "RecordList",
  components: {
    BrawlersRecord, PlayerRecord
  },
  data(){
    return{
      active: 0
    }
  },
  methods: {
    onClickLeft(){
      this.$router.push('/')
      this.$bus.$emit('tabberActive', 2)
    },
  },
}
</script>

<style scoped>

</style>
