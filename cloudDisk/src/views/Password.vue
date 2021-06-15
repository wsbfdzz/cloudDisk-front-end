<template>
	<div>
		<div class="showpassd">
			<p>当前密码为:{{password}}</p>
		</div>
		<div class="changePassd">
			<form name="changepassdForm">
				<table align="center">
					<caption>修改密码</caption>
					<tr>
						<td>新密码:</td>
						<td>
              <input type="password" name="change"/>
<!--							<input type="password" name="change"></input>-->
						</td>
					</tr>
					<tr>
						<td colspan="1" style="text-align: center; padding: 5px; margin: auto">
							<form id="form1" name="myForm" method="post" action="www.baidu.com" target="_blank">
								<input type="submit" value="提交" />
								<input type="reset" value="重置" />
							</form>
						</td>
					</tr>
				</table>
			</form>
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
	}
</script>

<style scoped>
.showpassd{
  text-align: center;
}
</style>
