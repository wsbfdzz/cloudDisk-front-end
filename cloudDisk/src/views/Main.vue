<template>
  <el-container>
    <el-header style="height: auto">
      <NavMenu :isLogin="isLogin" :user="user"></NavMenu>
    </el-header>
    <el-main>
      <router-view :user="user"/>
    </el-main>
  </el-container>
</template>

<script>
import NavMenu from "../components/NavMenu";
import axios from 'axios'

export default {
  name: "Main",
  components: {
    NavMenu
  },
  data() {
    return {
      isLogin:false,
      user:{
        uuid:"",
        usrName:"",
      }
    }
  },
  mounted() {
    var vue = this;
    axios.get("checklogin").then(function(res){
                      var data = res.data;
                      if(data.status=="success"){
                          vue.isLogin = true;
                          vue.user = data.msg;
                      }
                  }).catch(function(err){
                    console.log(err);
                  })
  },
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