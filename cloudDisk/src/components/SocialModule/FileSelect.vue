<template>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content file-select">
            <div class="modal-header">
                <button type="button" class="close" ref="fileClose" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">文件分享</h4>
            </div>
            <div class="modal-body">
                <table class="table">
                    <tbody>
                       <tr class="text-left file-option" v-for="(item, index) in itemList" :key="index" :tabindex="index" @click="selectIndex=index; if(item.type=='dir') getItemList(item.no);">
                            <td>
                                <i class="fa fa-file" aria-hidden="true" v-if="item.type=='file'"></i>
                                <i class="fa fa-folder" aria-hidden="true" v-if="item.type=='dir'" ></i> 
                                {{item.name}}
                            </td>
                        </tr> 
                    </tbody>
                    
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" :class="{'disabled':!isSelect, 'btn':true, 'btn-info':true}" @click="shareFile">确定</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
</template>

<script>
import axios from 'axios'
export default {
    props:{
        isFlush:{
            type:Boolean,
            default:function(){
                return false;
            }
        },
        user:{
            type:Boolean,
            default:function(){
                return {uuid:"", usrName:"", dirNo:null};
            }
        },
        fri:null
    },
    data() {
        return {
            isSelect:false,
            itemList:[],
            selectIndex:null
        }
    },
    watch:{
        selectIndex:function(val){
            if(val!=null && this.itemList[val].type=="file")
                this.isSelect = true;
            else
                this.isSelect = false;
        },
        isFlush:function(){
            this.isSelect = false;
            this.getItemList(this.user.dirNo);
        },
    },
    methods: {
        getItemList(dirNo){
            var vue = this;
            //获取itemList
            axios({
                    url:"getFileList",
                    method:"post",
                    params:{
                        path:dirNo
                    }
                }).then(function(res){
                        var data = res.data;
                        if(data.status=="success"){
                            var items = data.msg;
                            if(items && items.length!=0)
                                vue.itemList = items;
                        }
                        else if(data.status=="fail"){
                            alert(data.msg)
                        }
                    }).catch(function(err){
                        console.log(err);
                    });
        },
        shareFile:function(){
            if(!this.isSelect) return;
            var file = this.itemList[this.selectIndex];
            var vue = this;
            axios({
                url:"share",
                method:"post",
                params:{
                    user: vue.fri.uuid,
                    fileNo: file.no,
                    fileName: file.name,
                    token: file.token
                }
            }).then(function(res){
                    var data = res.data;
                    if(data.status=="success"){
                        alert("文件分享成功！");
                    }
                    else if(data.status=="fail"){
                        alert(data.msg)
                    }
                }).catch(function(err){
                    console.log(err);
                })
            var formatMsg = {
                    type:"file",
                    sender:file.usr,
                    date:new Date().format("yyyy-MM-dd hh:mm:ss"),
                    msg:{
                        fileNo:file.no,
                        fileName:file.name,
                        date:file.date,
                        token:file.token
                    }
                };
            this.$emit('file-selected', formatMsg);
            // $('#myModal').modal('hide');
            this.$refs.fileClose.click();
        }
    }
}
</script>

<style lang="css">
    .file-select>.modal-body {
        height: 250px;
        overflow-y: scroll;
    }
    .file-option:focus{
    background-color: #f2f2f2;
    }
    .file-option:hover{
    background-color: #f6f6f6;
    }
</style>
