<template>
<div class="bar">
    <li class="clearfix">
        <img :src="`avatar?user=${name}`" alt="avatar"/>
        <div class="about">
        <div class="name">{{name}}</div>
        </div>
        <span class="badge" v-if="unread!=0">{{unread}}</span>
    </li>
</div>
    
</template>

<script>
export default {
    props:{
        name:{
            type:Boolean,
            default:function(){
                return "";
            }
        },
        unread:{
            type:Boolean,
            default:function(){
                return 0;
            }
        },
        isChange:{
            type:Boolean,
            default:function(){
                return false;
            }
        }
    }
}
</script>

<style>
    .name {
        color:white
    }
    img {
        width: 50px;
        height: 50px;
    }
    .bar :hover{
        background-color: rgb(26, 29, 54);
    }
    .bar li{
        padding: 15px;

    }
</style>