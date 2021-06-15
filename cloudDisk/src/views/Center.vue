<template>
	<!--  <div>-->
	<!--    333-->
	<!--  </div>-->
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
			<div align="center">
				<img class="head-portrait round-border" src="https://avatars2.githubusercontent.com/u/1176014?v=3&s=460"
					alt="My Picture">
			</div>
		</el-col>
	</el-row>

</template>

<script>
	import AccountNavMenu from "../components/AccountNavMenu.vue"
	export default {
		name: "Center",
		components: {
			AccountNavMenu
		},
		data() {
			return {
				headerUrl: require('../assets/bg.jpg'),
			}
		},
		methods: {
			goTo(path) {
				this.$router.replace(path);
			},
			switchTable(key) {
				this.table = key
			}
		}
	};
</script>

<style scoped>
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

	.headCol {
		margin-top: 10px;
		flex: 1;
		display: flex;
		flex-direction: column;
		height: 100%;
		/*background-color: #2c3e50;*/
	}

	#headimg {
		margin-top: 10px;
	}

	.headContainer {
		/*text-align: center;*/
		/*top: 10px;*/
		/*border-radius: 30px;*/
		position: relative;
		top: 30px;
		/*width:30%;*/
		/*height:30%;*/
	}

	.col-sm-6 {
		overflow: hidden;
		float: left;
	}

	.round-border {
		border-color: green;
		border-width: 0px;
		border-style: solid;
		border-radius: 50%;
	}

	.head-portrait {
		width: 80%;
		padding: 20px;
		margin: 20px;
		float: left;
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
</style>
