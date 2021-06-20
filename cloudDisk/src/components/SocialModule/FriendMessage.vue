<template>
    <li class=" text-left">
        <div class="message-data">
            <span class="message-data-name"><i class="fa fa-circle online"></i> {{msg.date}}</span>
            <span class="message-data-time">{{msg.sender}}</span>
        </div>
        <div class="message my-message">
            <i class="fa fa-file-text fa-5x" aria-hidden="true" v-if="isFile"></i>
            <span v-if="!isFile" class="text-left">
                {{msg.msg}}
            </span>
            <div v-if="isFile" class="file-msg">
                <a :href="'download?no=' + msg.msg.fileNo + '&token=' + msg.msg.token">
                    {{msg.msg.fileName}}
                </a>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    props:{
        msg:{
            type:Object,
            default:function(){
                return {type:"", sender:"", date:"", msg:""};
            }
        }
            
    },
    data() {
        return {
            isFile:false
        }
    },
    created() {
        if(this.msg.type=='file'){
            this.isFile=true;
        }
    },
}
</script>

<style lang="css">
    .file-msg{
        text-align: center;
        vertical-align:middle;
    }
</style>