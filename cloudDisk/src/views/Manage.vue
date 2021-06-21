<template>
  <el-container>
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">
        <div style="height: 450px">
          <el-table :data="tableData" height="450px" row-key="id" style="width: 100%">
            <el-table-column label="UID" prop="uuid"></el-table-column>
            <el-table-column label="Name" prop="usrName"></el-table-column>
            <el-table-column label="Permission" prop="auth"></el-table-column>
            <!-- <el-table-column label="Password" prop="password"></el-table-column> -->
            <!-- <el-table-column label="Session Status" prop="status"></el-table-column> -->
            <el-table-column label="Manage">
              <template slot-scope="scope">
                <el-button type="success" @click="handlePromote(scope.$index, scope.row)">Promote</el-button>
                <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="消息广播">
        <el-container style="height: 450px">
          <el-form :model="form" style="margin-left: 30%;margin-right: 30%">
            <el-form-item>
              <el-input type="textarea" :rows="10" placeholder="请输入广播内容" maxlength="255" show-word-limit v-model="form.text">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm" type="primary" style="width: 100%">Send</el-button>
            </el-form-item>
          </el-form>
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
// import ManageTableData from '../assets/testJson/ManageTableData.json'
import axios from 'axios'
export default {
  name: "Manage",
  data() {
    return {
      tableData: [],
      //渲染的表单数据

      form: {
        text: ''
      }
      //渲染的消息广播
    }
  },
  methods: {
    handlePromote(index, row) {
      console.log(index, row);
      console.log(row.auth);
      if(row.auth === 'admin') {
        this.$alert('The user is already the highest authority', 'Warning', {
          confirmButtonText: 'yes'
        });
      } else {
        var vue = this;
        axios({
          url:"auth",
          method:"post",
          params:{
            user:row.uuid
          }
        }).then(function(res){
              var data = res.data;
              if(data.status=="success"){
                vue.$alert("操作成功！");
                vue.getUserList();
              }
              else if(data.status=="fail"){
                vue.$alert(data.msg);
              }
          }).catch(function(err){
          console.log(err);
          });
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
      var vue = this;
        axios({
          url:"deleteUser",
          method:"post",
          params:{
            user:row.uuid
          }
        }).then(function(res){
              var data = res.data;
              if(data.status=="success"){
                vue.$alert("操作成功！");
                vue.getUserList();
              }
              else if(data.status=="fail"){
                vue.$alert(data.msg);
              }
          }).catch(function(err){
          console.log(err);
          });
    },
    submitForm() {
      console.log(this.form.text);
      var vue = this;
      axios({
        url:"broadcast",
        method:"post",
        params:{
          msg:this.form.text
        }
      }).then(function(res){
            var data = res.data;
            if(data.status=="success"){
              this.$alert("发送成功！");
              vue.getUserList();
            }
            else if(data.status=="fail"){
                vue.$alert(data.msg);
              }
        }).catch(function(err){
          console.log(err);
        });
    },
    getUserList(){
      var vue = this;
      axios({
          url:"getUserList",
          method:"get"
      }).then(function(res){
            var data = res.data;
            if(data.status=="success"){
              vue.tableData = data.msg;
            }
            else if(data.status=="fail"){
                vue.$alert(data.msg);
              }
        }).catch(function(err){
        console.log(err);
        });
    }
  },
  mounted() {
    this.getUserList();
  },
}
</script>

<style scoped>
.el-container {
  padding: 3%;
  flex-direction: column;
}

.el-dialog__wrapper {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
.el-button {
  width: 100px;
}
</style>