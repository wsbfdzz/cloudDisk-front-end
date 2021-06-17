<template>
	<div>
		<div class="showpassd" align="center">
      <el-card>
        <p>当前密码为:{{password}}</p>
      </el-card>
		</div>

		<div class="changePassd" align="center">
      <el-card>
        <el-form name="changepassdForm">
          <h1>修改密码</h1>
          <el-form-item label="新密码">
            <el-input show-password v-model="newpassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button @click='cleanall'>取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
		</div>
	</div>
</template>
<script>
import axios from "axios";

  export default {
		name: "Password",
		data() {
			return {
				password: 123141241,
        newpassword: null
			}
		},
    methods: {

      cleanall(){
        this.newpassword=null
      },

      onSubmit(){
        axios.post('/modify',{
              type: 'password',
              value: this.newpassword
            })
            .then(response =>(
                this.$alert('修改成功!','修改成功'),
                this.state = response.data.status
            ))
            .catch(function (error) { // 请求失败处理
              window.alert('读取失败!');
              console.log(error);
            })
      }
    },
    mounted() {
      axios
          .get('/checklogin')
          .then(response => (
              this.password = response.data.msg.passwd
          ))
          .catch(function (error) { // 请求失败处理
            window.alert('读取失败!');
            console.log(error);
          });
    },
	}
</script>

<style scoped>
.el-card{
  width: 80%;
  height: auto;
  margin: 20px;
}
</style>
