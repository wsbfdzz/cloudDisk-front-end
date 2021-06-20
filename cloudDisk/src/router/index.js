import Vue from "vue";
import Main from "../views/Main";
import Router from "vue-router";
import Home from "../views/Home";
import Disk from "../views/Disk";
import Center from "../views/Center";
import Login from "../views/Login";
import Info from "../views/Info";
import InfoAccount from "../components/InfoAccount";
import InfoPassword from "../components/InfoPassword";
import Manage from "../views/Manage";

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [{
        path: '/',
        component: Main,
        name: 'main',
        redirect: '/home',
        children: [{
            path: '/home',
            component: Home,
            name: 'home'
        },{
            path: '/disk',
            component: Disk,
            name: 'disk'
        },{
            path: '/center',
            component: Center,
            name: 'center'
        },{
            path: '/info',
            component: Info,
            name: 'info',
            redirect: '/infoAccount',
            children: [{
                path: '/infoAccount',
                component: InfoAccount,
                name: 'infoAccount'
            },{
                path: '/infoPassword',
                component: InfoPassword,
                name: 'infoPassword'
            }]
        },{
            path: '/manage',
            component: Manage,
            name: 'manage'
        }]
    },{
        path: '/login',
        component: Login,
        name: 'login'
    }]
})

