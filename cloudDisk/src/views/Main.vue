<template>
  <el-container>
    <el-header>
      <NavMenu></NavMenu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import NavMenu from "../components/NavMenu";
export default {
  name: "Main",
  components: {
    NavMenu
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #373f51;
    padding-right: 10%;
    padding-left: 20%;
  }
  .el-main {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

</style>