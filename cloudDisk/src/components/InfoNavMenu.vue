<template>
	<el-menu default-active="activeIndex" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
		@select="handleSelect" active-text-color="#ffd04b">
		<el-menu-item index="infoAccount" :router=true>
			<span slot="title">我的账户</span>
		</el-menu-item>
		<el-menu-item index="infoPassword" :router=true>
			<span slot="title">登陆密码</span>
		</el-menu-item>
		<!-- <el-menu-item index="infoHistory" :router=true>
			<span slot="title">操作记录</span>
		</el-menu-item> -->
	</el-menu>
</template>

<script>
	export default {
		name: "AccountNavMenu",
		data() {
			return {
				activeIndex: 'account',
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				this.activeIndex = key
				console.log(key)
				// this.$emit('func', key)
				this.$router.push({
					name: keyPath
				})
			},
			handleCommand(command) {
				this.$router.push({
					name: command
				})
			}
		}
	}
</script>

<style>
	.el-col {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.el-menu-vertical-demo {
		height: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
