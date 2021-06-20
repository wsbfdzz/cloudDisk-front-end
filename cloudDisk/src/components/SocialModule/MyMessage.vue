<template>
    <li class="clearfix">
        <div class="message-data text-right">
            <span class="message-data-time" >{{msg.date}}</span> &nbsp; &nbsp;
            <span class="message-data-name" >{{msg.sender}}</span> <i class="fa fa-circle me"></i>
        </div>
        <div class="message other-message text-left">
            <i class="fa fa-file-text fa-5x" aria-hidden="true" v-if="isFile"></i>
            <span v-if="!isFile" class="text-left">
                {{msg.msg}}
            </span>
            <span v-if="isFile">
                <a class="file-msg" :href="'download?no=' + msg.msg.fileNo + '&token=' + msg.msg.token">
                    {{msg.msg.fileName}}
                </a>
            </span>
        </div>
    </li>
</template>

<script>
export default {
    props:{
        msg:{
            type: Object,
            default:function(){
                return {type:"", sender:"", date:"", msg:""};
            }
        }
    },
    data() {
        return {
            isFile:false,
            formatMsg:null
        }
    },
    created() {
        if(this.msg.type=='file'){
                this.isFile=true;
            }
            else{
                this.isFile=false;
            }
    },
}
</script>

<style lang="css">
    span {
        text-align: center;
    }
    .file-msg{
        text-decoration-line: none;
        display: flex;
        align-items:center;
    }
</style>