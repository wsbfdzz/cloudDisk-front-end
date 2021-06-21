<template>
<div class="modal fade" id="dir-select" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content file-select">
            <div class="modal-header">
                <button type="button" class="close" ref="dirClose" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">文件分享</h4>
            </div>
            <div class="modal-body">
                <table class="table">
                    <tbody>
                       <tr class="text-left file-option" v-for="(item, index) in dirList" :key="index" :tabindex="index" @click="selectIndex=index;isSelect=true;">
                            <td>
                                <i class="fa fa-folder" aria-hidden="true" v-if="item.type=='dir'" ></i> 
                                {{item.name}}
                            </td>
                        </tr> 
                    </tbody>
                    
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" :class="{'disabled':!isSelect, 'btn':true, 'btn-info':true}" @click="move">确定</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
</template>

<script>
export default {
    props:{
        isFlush:{
            type:Boolean,
            default:function(){
                return false;
            }
        },
        itemList:{
            type:Array,
            default:function(){
                return [];
            }
        },
        select:{
            type:Array,
            default:function(){
                return [];
            }
        }
    },
    watch:{
        isFlush:function(){
            this.isSelect = false;
            var vue = this;
            this.dirList = this.itemList.filter((item)=>{return (item.type==='dir')&&(vue.select[0].no!=item.no)})
        },
    },
    data() {
        return {
            isSelect:false,
            selectIndex:null,
            dirList:[]
        }
    },
    methods: {
        move:function(){
            this.$emit('move',this.dirList[this.selectIndex]);
            this.$refs.dirClose.click();
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
