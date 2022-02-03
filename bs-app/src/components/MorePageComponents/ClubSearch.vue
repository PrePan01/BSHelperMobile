<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="战队查询"
        @back="onClickLeft"
    />
    即将上线，敬请期待
  </div>
</template>

<script>
export default {
  name: "ClubSearch",
  methods: {
    onClickLeft(){
      this.$router.push('/')
      this.$bus.$emit('tabberActive', 2)
    },
  }
}
</script>

<style scoped>

</style>
