<template>
  <div>
    <!--主标题-->
    <h1 style="font-size: 36px;font-weight: bold">战队查询</h1>
    <!--搜索框-->
    <div>
      <a-input-search
          prefix="#"
          placeholder="请输入战队标签"
          enter-button="查询"
          size="large"
          @search="onSearch"
          v-model="searchInput"
          style="width: 50vw;"
          @keyup="upperCase"
      />
    </div>

  </div>
</template>

<script>
export default {
  name: "ClubSearch"
}
</script>

<style scoped>

</style>
