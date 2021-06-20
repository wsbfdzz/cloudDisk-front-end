<template>
    <div>
        <button class="btn btn-danger" id="del" data-toggle="modal" data-target="#delFri">
            <i class="fa fa-trash" aria-hidden="true"></i>
            <span>删除好友</span>
        </button>
        <div class="modal fade" id="delFri" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">删除好友</h4>
                    </div>
                    <div class="modal-body">
                        <label for="del-f">用户名：</label>
                        <input type="text" id="del-f" class="form-control" placeholder="请输入待删除好友用户名" v-model="delFri">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="sendFriDel">删除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    props:{
        friList:[]
    },
    data() {
        return {
            delFri:""
        }
    },
    methods: {
        findIndexByName(name){
            for (let index = 0; index < this.friList.length; index++) {
                if(this.friList[index].usrName==name)
                    return index;
            }
            return -1;
        },
        sendFriDel:function(){
            if(this.delFri==""){
                alert("输入不得为空！")
                return;
            }
            var vue = this;
            var index=vue.findIndexByName(vue.delFri);
            axios({
                url:"delFri",
                method:"post",
                params:{
                    user: vue.delFri
                },
            }).then(function(res){
                        var data = res.data;
                        vue.$emit('fri-del',index);
                        if(data.status=="fail"){
                          alert(data.msg);
                        }
                        location.reload();
                    }).catch(function(err){
                      console.log(err);
                    });
            this.delFri = "";
        }
    },
}
</script>

<style lang="css">
    #del{
        margin-top: 15px;
        margin-left: -10px;
    }
</style>