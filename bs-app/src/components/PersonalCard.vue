<template>
  <div>
    <van-tabs v-model="tabsActive" :lazy-render=false >
      <van-tab title="个人数据">
        <PersonalCard_PersonalData></PersonalCard_PersonalData>
      </van-tab>
      <van-tab title="我的角色">
        <PersonalCard_MyRoles></PersonalCard_MyRoles>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PersonalCard_PersonalData from '@/components/PersonalCard-PersonalData'
import PersonalCard_MyRoles from '@/components/PresonalCard-MyRoles'
export default {
  name: "PersonalCard",
  components:{
    PersonalCard_PersonalData, PersonalCard_MyRoles
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
