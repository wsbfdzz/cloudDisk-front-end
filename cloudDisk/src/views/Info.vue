<template>
  <el-row style="height: 100%">
    <el-col :span="3" style="display: flex;flex: 1;flex-direction: column;height: 100%">
      <info-nav-menu @func="switchTable"></info-nav-menu>
    </el-col>
    <el-col :span="21">
      <router-view :user="user"></router-view>
    </el-col>
  </el-row>
</template>

<script>
import InfoNavMenu from "../components/InfoNavMenu.vue"
export default {
  name: "Info",
  components: {
    InfoNavMenu
  },
  props:{
    user:{
      type:Object,
      default:function(){
        return {uuid:"",usrName:"",}
      }
    }
  },
  methods: {
    switchTable(key) {
      this.table = key
    },
    
  },
  mounted() {

  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-plus/lib/theme-chalk/index.css");

.el-col {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.el-menu-vertical-demo2 {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.head-portrait {
  margin-top: 40px;
}

.el-main {
  padding: 0;
}

.el-menu-vertical-demo {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.avatar-uploader .el-upload {
  border: 1px dashed #0c0a0a;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: white;
  margin-top: 40px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin-top: 40px;
}
.el-card {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: column;
  flex: 1
}
.el-container {
  padding: 8%;
  flex-direction: column;
}
</style>