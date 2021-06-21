<template>
  <el-menu default-active="All" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
           @select="handleSelect" active-text-color="#ffd04b">
    <el-menu-item index="All">
      <i class="el-icon-menu"></i>
      <span slot="title">All</span>
    </el-menu-item>
    <el-menu-item index="Pic">
      <i class="el-icon-picture"></i>
      <span slot="title">Pic</span>
    </el-menu-item>
    <el-menu-item index="Doc">
      <i class="el-icon-document"></i>
      <span slot="title">Doc</span>
    </el-menu-item>
    <el-menu-item index="Vedio">
      <i class="el-icon-video-camera-solid"></i>
      <span slot="title">Vedio</span>
    </el-menu-item>
    <el-menu-item index="Music">
      <i class="el-icon-headset"></i>
      <span slot="title">Music</span>
    </el-menu-item>
    <el-menu-item index="Other">
      <i class="el-icon-folder-opened"></i>
      <span slot="title">Other</span>
    </el-menu-item>
    <el-menu-item index="Trash" v-if="!isAdmin">
      <i class="el-icon-delete-solid"></i>
      <span slot="title">Trash</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import axios from 'axios'
export default {
  name: "DiskNavMenu",
  data() {
    return {
      isAdmin:false
    }
  },
  methods: {
    jumpToTable(){
      this.$emit('func',this.msg)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key
      console.log(key)
      this.$emit('func', key)
    },
    handleCommand(command) {
      this.$router.push({name: command})
    },
  },
  mounted() {
    var vue = this;
    axios.get("checklogin").then(function(res){
              var data = res.data;
              if(data.status=="success"){
                  vue.isAdmin = (data.msg.auth==='admin')
              }
          }).catch(function(err){
            console.log(err);
          })
  },
}
</script>

<style scoped>
  .el-col {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .el-menu-vertical-demo {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>