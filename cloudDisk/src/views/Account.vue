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
              <el-input></el-input>
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
	export default {
		name: "Account",
		data() {
			return {
				uid: 12345,
        username: "zxypro"
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
