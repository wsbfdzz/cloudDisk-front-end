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
            <el-input type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Password",
		data() {
			return {
				password: 123141241,
			}
		},
    methods: {
      onSubmit(){
        console.log("submit")
      }
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
