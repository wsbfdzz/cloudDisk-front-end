<template>
  <el-menu style="display: flex" :default-active="activeIndex" mode="horizontal"
           @select="handleSelect" background-color="#373f51" text-color="#fff" active-text-color="#ffd04b">
    <el-menu-item index="home" :router=true>Home</el-menu-item>
    <el-menu-item index="disk" :router=true v-if="isLogin">Disk</el-menu-item>
    <el-menu-item index="center" :router=true v-if="isLogin">Center</el-menu-item>
    <el-menu-item index="manage" :router=true v-if="isLogin&&(user.auth==='admin')">Manage</el-menu-item>
    <el-dropdown class="icon_memu" index="5" @command="handleCommand">

      <el-avatar :size="40" :src="circleUrl"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="login" v-if="!isLogin">Login</el-dropdown-item>
        <el-dropdown-item command="info" :disabled="!isLogin">Info</el-dropdown-item>
        <el-dropdown-item command="logout" :disabled="!isLogin" @click.native="exit">logout</el-dropdown-item>
      </el-dropdown-menu>

    </el-dropdown>
  </el-menu>
</template>

<script>
import axios from 'axios'
export default {
  name: "NavMenu",
  props:{
    isLogin:{
      type:Boolean,
      default:function(){
        return false;
      }
    },
    user:{
      type:Object,
      default:function(){
        return {uuid:"",usrName:"",}
      }
    }
  },
  data() {
    return {
      activeIndex: 'home',
    };
  },
  computed:{
    circleUrl(){return 'avatar?user=' + this.user.usrName}
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key
      this.$router.push({name:keyPath})
    },
    handleCommand(command) {
      this.$router.push({name: command})
    },
    exit(){
      var vue = this;
      axios({
          url:"ExitLogin",
          method:"get"
      }).then(function(res){
            var data = res.data;
            if(data.status=="success"){
              alert("退出成功！");
              vue.$router.push('/home');
            }
        }).catch(function(err){
        console.log(err);
        });
    }
  },
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