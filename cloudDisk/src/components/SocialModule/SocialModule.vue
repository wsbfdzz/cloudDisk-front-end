<template>
    <div class="main-container clearfix" id="social-module">
      <div class="people-list" id="people-list">
        <div class="row">
          <add-friend class="text-left col-md-6" v-on:fri-add="friAdd"/>
          <delete-friend class="text-left col-md-6" :friList="friendsList" v-on:fri-del="friDel"/>
        </div>
        <ul class="list">
          <friend-bar v-for="(friend, index) in friendsList" :key="index" :unread="unread[index]" :name="friend.usrName" :isChange="isChange" @click.native="SwitchToChat(index)"/>
        </ul>
      </div>
      <chat-page :current-fri="friendsList[currentFriend]" :user="user" :newMessage="newMsgToCur"/>
    </div>
</template>

<script>
import friendBar from './FriendBar.vue'
import chatPage from './ChatPage.vue'
import addFriend from './addFriend.vue'
import deleteFriend from './deleteFriend.vue'
import axios from 'axios'

export default {
  components: {
    friendBar,
    chatPage,
    addFriend,
    deleteFriend
  },
  props:{
    user:{
      auth: "",
      avatar: "",
      dirNo: null,
      passwd: "",
      usrName: "",
      uuid: ""
    },
    newMessage:null
  },
  data() {
    return {
        friendsList: [{
          uuid:"",
          usrName:""
        }],
        currentFriend:null,
        newMsgToCur:null,
        unread:[],
        //isChange解决vue对于列表更新无法及时监听到并重新渲染的问题
        isChange:false
    }
  },
  watch:{
    newMessage:function(val){
      if(val.body.src!=this.friendsList[this.currentFriend].usrName){
        var newMsgIndex = this.findIndexByName(val.body.src);
        if(newMsgIndex>=0){
          this.unread[newMsgIndex]++;
          localStorage.unread=JSON.stringify(this.unread);
          //isChange解决vue对于列表更新无法及时监听到并重新渲染的问题
          this.isChange = !this.isChange; 
        }
      }
      else
        this.newMsgToCur = val;
    }
  },
  methods: {
      SwitchToChat:function(index){
        this.currentFriend = index;
        this.unread[index]=0;
        localStorage.unread=JSON.stringify(this.unread);
      },
      findIndexByName(name){
        for (let index = 0; index < this.friendsList.length; index++) {
          if(this.friendsList[index].usrName==name)
            return index;
        }
        return -1;
      },
      getFriList:function(){
        // //获取好友列表
        var vue = this;
        axios.get("getFriList").then(function(res){
            var data = res.data;
            if(data.status=="success"){
                vue.friendsList = data.msg;
                if(vue.friendsList.length>0){
                  vue.currentFriend = 0;
                  var ur = localStorage.getItem('unread');
                  if(ur) 
                    vue.unread = JSON.parse(ur);
                  else
                    for(let i = 0; i < vue.friendsList.length; i++)
                      vue.unread.push(0);
                }
                else
                  alert("你的列表里暂时没有好友")
            }
            else if(data.status=="fail"){
                alert(data.msg)
            }
        }).catch(function(err){
            console.log(err);
        });
      },
      friDel:function(index){
        if(index>=0){
          this.unread.splice(index,1);
          console.log(this.unread);
          localStorage.unread=JSON.stringify(this.unread);
        }
      },
      friAdd:function(){
        this.unread.push(0);
        console.log(this.unread);
        localStorage.unread=JSON.stringify(this.unread);
      },
  },
  created() {
    this.getFriList();
  },
}
</script>

<style>
</style>
