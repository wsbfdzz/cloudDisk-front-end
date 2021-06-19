<template>
  <el-row style="height: 100%">
    <el-col :span="3" style="display: flex;flex: 1;flex-direction: column;height: 100%">
      <info-nav-menu @func="switchTable"></info-nav-menu>
    </el-col>
    <el-col :span="21">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
import InfoNavMenu from "../components/InfoNavMenu.vue"
import axios from "axios";
export default {
  name: "Info",
  components: {
    InfoNavMenu
  },
  data() {
    return {
      imageUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      stat: null,
      username: null
    }
  },
  methods: {
    switchTable(key) {
      this.table = key
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      axios.post('/upavatar',{
        file: file
      }).then(function (response) {
        if (response.data.status==='success'){
          this.$alert('上传成功!');
        }else{
          window.alert('上传失败!');
        }
      }).catch(function (error) {
        console.log(error);
        window.alert('上传失败!');
      });
      // return isJPG && isLt2M;
    }
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