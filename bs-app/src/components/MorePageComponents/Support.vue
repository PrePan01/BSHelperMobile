<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240);height: 8vh"
        title="支持赞助"
        @back="onClickLeft"
    />
    <a-carousel>
      <div>
        <img src="https://www.png8.com/imgs/2022/06/27/fe037005175bed06.jpg" alt="" style="width: 100%;height: 100%">
      </div>
      <div>
        <img src="https://www.png8.com/imgs/2022/06/27/9ffbada1db2cc682.png" alt="" style="width: 100%;height: 100%">
      </div>
    </a-carousel>
    <h1 style="text-align: center;font-size: 20px;padding: 5px 20px">服务器费用是一笔不小的开销，由衷感谢每一位赞助的朋友！</h1>
    <a-table :columns="columns" :data-source="data" bordered style="width: 100vw" :pagination="false">
      <template slot="title">
        赞助名单
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: "Support",
  data() {
    return {
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
        },
        {
          title: '金额',
          dataIndex: 'money',
        }
      ],
      data: [
        /*{
          key: '1',
          name: 'John',
          money: '300',
        },*/
      ]
    }
  },
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
