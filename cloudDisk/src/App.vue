<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
html,body,#app,.el-container {
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
}
.el-main {
  background-color: #f6f6f7;
}
</style>
