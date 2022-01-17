<template>
  <div>
    <van-tabs v-model="tabsActive">
      <van-tab title="个人数据">
        <PersonalCard_PersonalData></PersonalCard_PersonalData>
      </van-tab>
      <van-tab title="我的角色">内容 2</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PersonalCard_PersonalData from '@/components/PersonalCard-PersonalData'
export default {
  name: "PersonalCard",
  components:{
    PersonalCard_PersonalData
  },
  data(){
    return{
      tabsActive: 0,
    }
  }
}
</script>

<style scoped>

</style>
