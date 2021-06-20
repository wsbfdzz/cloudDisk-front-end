<template>
  <div id="chatBackground">
    <div class="chat" v-if="currentFri">
      <div class="chat-header clearfix">
        <img :src="`avatar?user=${currentFri.usrName}`" alt="avatar" />
        
        <div class="chat-about">
          <div class="chat-with">{{currentFri.usrName}}</div>
        </div>
        <i class="fa fa-star"></i>
      </div> <!-- end chat-header -->
      
      <div class="chat-history" id="scroll-chat">
        <ul v-for="(msg, index) in msgs" :key="index">
          <my-message v-if="msg.sender!=currentFri.usrName" :msg="msg"/>
          <friend-message v-if="msg.sender==currentFri.usrName" :msg="msg"/>
        </ul>
        
      </div> <!-- end chat-history -->
      
      <div class="chat-message clearfix">
        <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3" v-model="myMsg" @keydown.enter="sendMsg" @keyup.enter="myMsg = ''"></textarea>
                
        <i class="fa fa-file-o btn" data-toggle="modal" data-target="#myModal" @click="flush = !flush"></i> &nbsp;&nbsp;&nbsp;
        
        <button @click="sendMsg(); myMsg = '';">Send</button>

      </div> <!-- end chat-message -->
      
    </div> <!-- end chat -->
    <file-select v-on:file-selected="fileShare" :isFlush="flush" :user="user" :fri="currentFri"/>
  </div>
    
</template>

<script>
import myMessage from './MyMessage.vue'
import friendMessage from './FriendMessage.vue'
import fileSelect from './FileSelect.vue'
import axios from 'axios'

export default {
    props:{
        user:{
            uuid:"",
            usrName:"",
            dirNo:null
        },
        currentFri:null,
        newMessage:null
    },
    components:{
        myMessage,
        friendMessage,
        fileSelect
    },
    data() {
        return {
          msgs:[],
          myMsg:"",
          flush:false,
        }
    },
    watch:{
      currentFri:function(){
        this.getChatRecord();
      },
      newMessage:function(val){
        var msg;
        if(val.type=="file")
          msg=val.body;
        else if(val.type=="msg")
          msg=val.body.msg;
        this.msgs.push({
          type:val.type,
          sender:val.body.src,
          date:val.date,
          msg:msg
        });
        this.adaptLocation();
      }
    },
    methods: {
      getChatRecord:function(){
        var vue = this;
        axios({
                url:"getChatList",
                method:"post",
                params:{
                        user:this.currentFri.uuid
                    },
                }).then(function(res){
                      var data = res.data;
                      if(data.status=="success"){
                          if(data.msg){
                            vue.msgs = data.msg;
                          }
                          else
                            vue.msgs = [];
                          vue.adaptLocation();
                      }
                      else if(data.status=="fail"){
                          alert(data.msg)
                      }
                    }).catch(function(err){
                      console.log(err);
                    })
      },
      sendMsg:function(){
        var msg = this.myMsg;
        if(msg == "") return;
        var vue=this;
        axios({
                url:"sendMsg",
                method:"post",
                params:{
                  user: this.currentFri.uuid,
                  msg: msg
                },
            }).then(function(res){
                var data = res.data;
                
                if(data.status=="success"){
                  var date = new Date();
                  var myMsgObj = {
                      type:"msg",
                      sender:vue.user.usrName,
                      date:date.format("yyyy-MM-dd hh:mm:ss"),
                      msg:msg
                  };
                  vue.msgs.push(myMsgObj);
                  vue.adaptLocation();
                }
                else if(data.status=="fail"){
                    alert(data.msg)
                }
        }).catch(function(err){
            console.log(err);
        })
      },
      fileShare:function(val){
        this.msgs.push(val);
        this.adaptLocation();
      },    
      adaptLocation:function(){
        var div = document.getElementById('scroll-chat');
        setTimeout(function() { 
          div.scrollTop = div.scrollHeight;
        }, 5);
      }
    },
}
</script>

<style>
    .fa-file-o {
        float: left;
    }
</style>