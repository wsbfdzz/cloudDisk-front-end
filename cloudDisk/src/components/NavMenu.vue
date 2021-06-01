<template>
  <el-menu style="display: flex" :default-active="activeIndex" mode="horizontal"
           @select="handleSelect" background-color="#373f51" text-color="#fff" active-text-color="#ffd04b">
    <el-menu-item index="home" :router=true>Home</el-menu-item>
    <el-menu-item index="disk" :router=true>Disk</el-menu-item>
    <el-menu-item index="center" :router=true>Center</el-menu-item>
    <el-dropdown class="icon_memu" index="5" @command="handleCommand">

      <el-avatar :size="40" :src="circleUrl"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="login">Login</el-dropdown-item>
        <el-dropdown-item command="info">Info</el-dropdown-item>
        <el-dropdown-item command="logout" disabled>logout</el-dropdown-item>
      </el-dropdown-menu>

    </el-dropdown>
  </el-menu>
</template>

<script>
export default {
  name: "NavMenu",
  data() {
    return {
      activeIndex: 'home',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key
      this.$router.push({name:keyPath})
    },
    handleCommand(command) {
      this.$router.push({name: command})
    }
  }
}
</script>

<style scoped>
  .icon_memu {
    display: inline-flex;
    align-self: center;
    margin-left: auto;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: solid 1px rgb(55, 63, 81)
  }
</style>