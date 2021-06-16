<template>
	<div>

		<div class="account" align="center">
      <el-card>
        <p>UID:{{uid}}</p>
        <p>用户名:{{username}}</p>
      </el-card>
		</div>

		<div class="edit" align="center">
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
		</div>
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
		name: "Account",
		data() {
			return {
				uid: 12345,
        username: "zxypro",
        state: null,
        newusrname: null
			}
		},
    methods: {
      onSubmit(){
        // eslint-disable-next-line no-undef
        axios.post('/modify',{
          type: 'username',
          value: this.newusrname
        })
            .then(response =>(
                this.state = response.data.status,
                    window.alert('修改成功!')
        ))
            .catch(function (error) { // 请求失败处理
              console.log(error);
              window.alert('读取失败!');
            })
      }
    },
    mounted() {
      axios
          .get('/checklogin')
          .then(response => (
              window.alert('修改成功!'),
              this.uid = response.data.msg.uuid,
              this.username = response.data.msg.usrName
          ))
          .catch(function (error) {
            window.alert('读取失败!');
            console.log(error);
          });
    },
  })
</script>

<style scoped>
.el-card{
  width: 80%;
  height: auto;
  margin: 20px;
}
</style>
