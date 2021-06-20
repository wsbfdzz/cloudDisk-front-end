<template>
    <div>
        <button class="btn btn-primary" id="add" data-toggle="modal" data-target="#inputFri">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span>添加好友</span>
        </button>
        <div class="modal fade" id="inputFri" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">好友申请</h4>
                    </div>
                    <div class="modal-body">
                        <label for="req-f">用户名：</label>
                        <input type="text" id="req-f" class="form-control" placeholder="请输入申请好友用户名" v-model="reqFri">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="sendFriReq">提交申请</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            reqFri:""
        }
    },
    methods: {
        sendFriReq:function(){
            if(this.reqFri=="")
                alert("输入不得为空！")
            var vue = this;
            axios({
                url:"reqFri",
                method:"post",
                params:{
                    user: vue.reqFri
                },
            }).then(function(res){
                        var data = res.data;
                        vue.$emit('fri-add');
                        if(data.status=="fail"){
                          alert(data.msg);
                        }
                    }).catch(function(err){
                      console.log(err);
                    });
            this.reqFri = "";
        }
    },
}
</script>

<style lang="css">
    #add{
        margin-top: 15px;
        margin-left: 20px;
    }
</style>