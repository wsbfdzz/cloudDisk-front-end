import Vue from "vue";
import Main from "../views/Main";
import Router from "vue-router";
import Home from "../views/Home";
import Disk from "../views/Disk";
import Center from "../views/Center";
import Login from "../views/Login";
import Info from "../views/Info";
import Account from "../views/Account";
import History from "../views/History";
import Password from "../views/Password";

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		component: Main,
		name: 'main',
		redirect: '/home',
		children: [{
			path: '/home',
			component: Home,
			name: 'home'
		}, {
			path: '/disk',
			component: Disk,
			name: 'disk'
		}, {
			path: '/center',
			component: Center,
			name: 'center',
			redirect: '/account',
			children:[
				{
					path: '/account',
					component: Account,
					name: 'account'
				}, {
					path: '/history',
					component: History,
					name: 'history'
				}, {
					path: '/password',
					component: Password,
					name: 'password'
				}
			]
		}, {
			path: '/info',
			component: Info,
			name: 'info'
		}, ]
	}, {
		path: '/login',
		component: Login,
		name: 'login'
	}, ]
})
