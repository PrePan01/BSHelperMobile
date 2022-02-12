<template>
  <div>
    {{event}}
    {{name}}
  </div>
</template>

<script>
export default {
  name: "EventsDetails",
  data(){
    return{
      event: '',
      name: ''
    }
  },
  mounted(){
    this.event = this.$route.query.event
    this.name = this.$route.query.name
  }
}
</script>

<style scoped>

</style>
