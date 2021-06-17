<template>
	<!--  <div>-->
	<!--    333-->
	<!--  </div>-->
<!--  <div v-if="stat === 'success'">-->
    <el-row style="height: 100%">
      <el-col :span="3" style="display: flex;flex: 1;flex-direction: column;height: 100%">
        <account-nav-menu @func="switchTable"></account-nav-menu>
      </el-col>



      <el-col :span="15">
        <router-view></router-view>
      </el-col>
      <el-col :span="6">
        <!--        <el-image :src="require('../assets/bg.jpg')" fit="scale-down" id="headimg">-->

        <!--        </el-image>-->
        <div align="center" v-if="imageUrl !== ''">
          <el-avatar id="head" src="https://avatars2.githubusercontent.com/u/1176014?v=3&s=460" class="head-portrait" shape="square" :size="200"></el-avatar>
          <!--				<img class="head-portrait round-border" src="https://avatars2.githubusercontent.com/u/1176014?v=3&s=460"-->
          <!--					alt="My Picture">-->
        </div>
        <div align="center" v-else>
          <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-col>
    </el-row>
<!--  </div>-->

<!--  <div v-else>-->
<!--    <h1 style="margin: auto">请先登录！</h1>-->
<!--  </div>-->


</template>
<script>
	import AccountNavMenu from "../components/AccountNavMenu.vue"
  import Vue from "vue";
  import axios from "axios";
  new Vue({
  })
	export default {
		name: "Center",
		components: {
			AccountNavMenu
		},
		data() {
			return {
				headerUrl: require('../assets/bg.jpg'),
        imageUrl: '',
        stat: null
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
    //   axios
    //       .get('https://www.runoob.com/try/ajax/json_demo.json')
    //       .then(
    //           response => (this.rnfo = response.data.sites)
    //       )
    //       .catch(function (error) { // 请求失败处理
    //         window.alert('读取失败!');
    //         console.log(error);
    //       });
      axios
          .get('/checklogin')
          .then(response => (
              this.stat = response.data.status
          ))
          .catch(function (error) {
            window.alert('读取失败!');
            console.log(error);
          });
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
</style>
