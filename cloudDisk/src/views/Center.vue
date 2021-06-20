<template>
  <div>
    <span>
      <social-module style="margin-top:20px" :user="user" :newMessage="newMsgToCur"/>
    </span>

  </div>
</template>

<script>
import SocialModule from '../components/SocialModule/SocialModule.vue'
import Stomp from 'stompjs'
import axios from 'axios'

export default {
  name: "Center",
  components:{
    SocialModule,
  },
  data() {
    return {
        user:{
            auth: "",
            avatar: "",
            dirNo: null,
            passwd: "",
            usrName: "",
            uuid: ""
        },
        newMsgToCur:null,
      }
  },
  methods: {
    openListener:function(){
      var vue = this;
      if (typeof WebSocket == 'undefined') { 
          console.log('不支持websocket');
          return;
      } 
      // 初始化 ws 对象 
      var ws = new WebSocket('ws://47.118.35.129:15674/ws'); 
      // 获得Stomp client对象 
      var client = Stomp.over(ws); 
      // 定义连接成功回调函数 
      var on_connect = function() { 
          //data.body是接收到的数据 
          client.subscribe("/queue/" + vue.user.uuid, function(data) { 
              var msg = JSON.parse(data.body); 
              if(!msg.type)
                  return;
              if(msg.type=="file" || msg.type=="msg"){
                  vue.newMsgToCur = msg;
              }
              else if(msg.type=="notice"){
                  alert("系统公告：" + msg.body);
              }
              else if(msg.type=="req"){
                  var isAccept = false
                  if(confirm("用户" + msg.body.name + "向你发送了一个好友申请"))
                      isAccept = true;
                  vue.confirmFriReq(isAccept, msg.body.uid);
              }
              else if(msg.type=="confirm"){
                  alert("用户" + msg.body + "同意了你的好友申请");
                  vue.confirmFriReq();
              }
          }); 
      }; 
      // 定义错误时回调函数 
      var on_error =  function() { 
          console.log('连接错误，请重试'); 
      }; 
      // 连接RabbitMQ 
      client.connect('visitor', 'visitor', on_connect, on_error, '/'); 
      console.log(">>>RabbitMQ已连接，测试正式开始"); 
    },
    confirmFriReq:function(isAccept, uid){
          axios({
                  url:"confirm",
                  method:"post",
                  params:{
                  accept: isAccept,
                  user:uid
              }
              }).then(function(res){
                          var data = res.data;
                          if(data.status=="fail"){
                          alert(data.msg)
                          }
                      }).catch(function(err){
                      console.log(err);
                      });
      }
  },
  created() {
      var vue = this;
      //获取当前用户信息
      axios.get("checklogin").then(function(res){
                      var data = res.data;
                      if(data.status=="success"){
                          vue.user = data.msg;
                          //开启对消息队列的监听
                          vue.openListener();
                      }
                  }).catch(function(err){
                    console.log(err);
                  })
      
  },
}
</script>

<style>
</style>