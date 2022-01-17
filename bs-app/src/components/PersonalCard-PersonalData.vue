<template>
  <div>
    <h1 style="font-size: 24px">{{ playName }}</h1>
  </div>
</template>

<script>
export default {
  name: "PersonalCard-PersonalData",
  data(){
    return{
      personalData: {},
      playName: ''
    }
  },
  mounted(){
    this.$bus.$on('PersonalData', (data) => {
      this.personalData = data
      this.playName = '@' + data.name
      console.log(data)
    })
  }
}
</script>

<style scoped>

</style>
