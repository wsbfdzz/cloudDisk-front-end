<template>
  <div style="display: flex;flex: 1">
    <el-col :span="16" style="flex: 1">
          <el-card>
            <p>UID:{{uid}}</p>
            <p>用户名:{{username}}</p>
          </el-card>

          <el-card>
            <!--        <el-form name="myForm" ref="form" :model="form" label-width="80px">-->
            <el-form name="myForm">
              <h1>修改用户名</h1>
              <el-form-item label="新用户名">
                <!--              <el-input v-model="form.name"></el-input>-->
                <el-input v-model="newusrname"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">修改</el-button>
              </el-form-item>
            </el-form>
          </el-card>
<!--      -->
    </el-col>
    <el-col :span="8" style="flex: 1">
        <el-container>
          <el-card align="center">
            <el-upload class="avatar-uploader" action="upavatar" :show-file-list="false"
                       accept="image/jpeg,image/gif,image/png,image/jpg" multiple :limit="1" :on-success="upSuccess" :on-error="upError">
                       <!-- :before-upload="beforeAvatarUpload" -->
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">请上传图片格式文件</div>
            </el-upload>
          </el-card>
        </el-container>
    </el-col>
  </div>
</template>

<!--<script>-->

<!--export default {-->
<!--  name: "Account",-->
<!--  uid: 1234-->
<!--}-->
<!--</script>-->
<script type="text/javascript">
// eslint-disable-next-line no-undef,no-unused-vars

import axios from "axios";

export default ({
  name: "InfoAccount",
  props:{
    user:{
      type:Object,
      default:function(){
        return {uuid:"",usrName:"",}
      }
    }
  },
  data() {
    return {
      newusrname: null
    }
  },
  computed:{
    uid(){return this.user.uuid},
    username(){return this.user.usrName},
    imageUrl(){return 'avatar?user=' + this.user.usrName}, 
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      axios.post('upavatar',{
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
    },
    upSuccess(){
      alert('上传成功');
      location.reload();
    },
    upError(){
      alert('上传失败');
    },
    onSubmit(){
      axios({
          url:"modify",
          method:"post",
          params:{
            type:'username',
            value:this.newusrname
          }
      }).then(function(res){
            var data = res.data;
            if(data.status=="success"){
              alert("修改成功！");
              location.reload();
            }
        }).catch(function(err){
        console.log(err);
        });
    }
  }
})
</script>

<style scoped>
.el-card {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: column;
  flex: 1;
  margin:40px
}
.el-container {
  flex-direction: column;
}
</style>
