<template>
  <el-container>
    <el-card>
      <div slot="header">
        <el-button round type="info" @click="goBack" v-if="!isBin">Upper Dir</el-button>
        <el-button round type="primary" @click="upload" v-if="!isBin">Upload</el-button>
        <el-dialog :visible.sync="centerDialogVisible" center title="提示" width="auto">
          <el-upload class="upload-demo" :limit="1" drag action="#" multiple :http-request="uploadFile" :on-remove="cencelUploadFile">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip"></div>
          </el-upload>
          <el-input placeholder="请输入附加描述信息" v-model="fileMsg"></el-input>
<!--          <el-input v-model="info" placeholder="请输入内容" style="margin-top: 20px"></el-input>-->
          <span slot="footer" class="dialog-footer">
            <el-button @click="cencelUploadFile">取 消</el-button>
            <el-button type="primary" @click="submitUploadFile">确 定</el-button>
          </span>
        </el-dialog>
        <el-button round type="warning" @click="createFolder" v-if="!isBin">New Folder</el-button>
        <el-divider direction="vertical"></el-divider>
        <!-- <el-button class="right-button" type="success" @click="downloadFiles">Download</el-button> -->
        <el-button class="right-button" type="danger" @click="deleteFiles">Delete</el-button>
        <el-button class="right-button" type="warning" @click="renameFile" v-if="!isBin">Rename</el-button>
        <el-button class="right-button" type="info" @click="moveSelectFlush=!moveSelectFlush;moveFile()" v-if="!isBin">Move</el-button>
        <button ref="dirSelect" data-toggle="modal" data-target="#dir-select" v-show="false"></button>
        <dir-select :itemList="tableData" :isFlush="moveSelectFlush" :select="selectData" @move="moveReq"/>
      </div>
      <div>
        <el-page-header v-if="enterFolder" :content="folder" title="Back" @back="goBack">
        </el-page-header>
        <el-table :data="tableData" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" height="450px"
                  row-key="id"
                  style="width: 100%" @select="selectFile" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="Name" prop="name" width="150">
            <template slot-scope="scope">
                <a @click="dirEnter(scope.$index)" :href="scope.row.type==='file'?`download?no=${scope.row.no}`:'javascript:void(0);'" style="color:black;cursor:pointer">{{scope.row.name}}</a>
            </template>
          </el-table-column>
          <el-table-column label="Type" prop="type" width="150"></el-table-column>
          <el-table-column label="Date" prop="date" width="150"></el-table-column>
          <el-table-column label="Size" prop="size" width="150"></el-table-column>
          <el-table-column label="Uploader" prop="usr" width="150" v-if="isAdmin"></el-table-column>
          <el-table-column label="Info" prop="msg"></el-table-column>
        </el-table>
      </div>
      <!--      {{tableData}}-->
      <!--      <el-divider></el-divider>-->
      <!--      {{selectData}}-->
    </el-card>
  </el-container>
</template>

<script>
// import DiskTableData from '../assets/testJson/DiskTableData.json'
// import DiskTableData1 from '../assets/testJson/DiskTableData1.json'
import dirSelect from './DirSelect.vue'
import axios from "axios";

export default {
  name: "DiskTable",
  components:{
    dirSelect
  },
  data() {
    return {
      folder: '111',
      enterFolder: false,
      DiskTableData:[],
      tableData: [],
      selectData: [],
      centerDialogVisible: false,
      fileList: [],
      info: '',
      user:{
        uuid:"",
        usrName:"",
        passwd:"",
        auth:"",
        dirNo:0
      },
      fileMsg:"",
      binList:[],
      isBin:false,
      curFolder:0,
      moveSelectFlush:false,
      history:[],

      extCompare:[['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'],
                  ['doc','docx','pdf'],
                  ['avi','mpg','mpeg','rm','rmvb','mov','wmv','asf','dat'],
                  ['mp3','wma','wav','mid','flac']]
    }
  },
  props: ['table'],
  computed:{
    isAdmin:function(){
      return this.user.auth==='admin';
    },
    picList:function(){
      return this.DiskTableData.filter((item)=>{
          var tokens =  item.name.split(".");
          return this.extCompare[0].indexOf(tokens[tokens.length-1]) !== -1;
        })
    },
    docList:function(){
      return this.DiskTableData.filter((item)=>{
          var tokens =  item.name.split(".");
          return this.extCompare[1].indexOf(tokens[tokens.length-1]) !== -1;
        })
    },
    vedioList:function(){
      return this.DiskTableData.filter((item)=>{
          var tokens =  item.name.split(".");
          return this.extCompare[2].indexOf(tokens[tokens.length-1]) !== -1;
        })
    },
    musicList:function(){
      return this.DiskTableData.filter((item)=>{
          var tokens =  item.name.split(".");
          return this.extCompare[3].indexOf(tokens[tokens.length-1]) !== -1;
        })
    },
    otherList:function(){
      var extList = [];
      for (let i = 0; i < this.extCompare.length; i++) {
        for (let j = 0; j < this.extCompare[i].length; j++){
          extList.push(this.extCompare[i][j]);
        }
      }
      return this.DiskTableData.filter((item)=>{
          var tokens =  item.name.split(".");
          return extList.indexOf(tokens[tokens.length-1]) == -1;
        })
    }
  },
  watch: {
    table(val, old) {
      console.log(val + ' ' + old)
      console.log(this.DiskTableData);
      this.isBin = false;
      if (val === 'All')
        this.tableData = this.DiskTableData;
      else if (val === 'Pic')
        this.tableData = this.picList;
      else if(val === 'Doc')
        this.tableData = this.docList;
      else if(val === 'Vedio')
        this.tableData = this.vedioList;
      else if(val === 'Music')
        this.tableData = this.musicList;
      else if(val === 'Other')
        this.tableData = this.otherList;
      else if(val === 'Trash'){
        this.isBin = true;
        this.tableData = this.binList;
      }
    },
  },
  methods: {
    goBack() {
      if(this.history.length==1) return;
      this.history.pop();
      this.curFolder = this.history[this.history.length-1];
      this.getFileList(this.curFolder);
    },
    dirEnter(val) {
      var item = this.tableData[val]
      if(item.type === 'dir'){
        this.getFileList(item.no);
        this.history.push(item.no);
        this.curFolder=item.no;
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
          this.selectData = rows
        });
      } else {
        this.$refs.multipleTable.clearSelection();
        this.selectData = rows
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selectData = val
    },
    selectFile(val) {
      console.log(val)
      this.selectData = val
    },
    deleteFiles() {
      if (this.selectData.length !== 0) {
        var vue = this;
        var url = this.isBin?"delete":"bin";
        for (let i in this.selectData) {
          axios({
            url: url,
            params:{
              type:this.selectData[i].type,
              no:this.selectData[i].no
            },
            method: 'post'
          })
          .then(function(response) {
            var data = response.data;
            if(data.status=="success"){
              if(!vue.isBin)
                vue.getFileList(vue.curFolder);
              vue.getFileList(-1);
            }
            else if(data.status=="fail")
              alert(data.msg);
          })
          .catch()
        }
      }
    },
    openBox(filesID, msg) {
      this.$confirm(msg, 'warning', {
        confirmButtonText: 'yes',
        cancelButtonText: 'no',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'delete:' + filesID
        });
        return true
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'cancel'
        });
        return false
      });
    },
    createFolder() {
      var vue = this;
      axios({
        url: 'newdir',
        params:{
          name:'newFolder',
          path:this.curFolder
        },
        method: 'post'
      })
      .then(function(response) {
        var data = response.data;
        if(data.status=="success"){
          vue.tableData.push(data.msg)
        }
        else if(data.status=="fail")
          alert(data.msg);
      })
      .catch()
    },
    moveFile() {
      // let flag = false
      if (this.selectData.length === 0) {
        this.$alert('Please choose one file', 'Warning', {
          confirmButtonText: 'yes'
        });
        return
      }
      else{
        this.$refs.dirSelect.click();
      } 
      
    },
    moveReq(val){
      var vue = this;
      for (let i in this.selectData) {
        axios({
            url:'move',
            params:{
              type:this.selectData[i].type,
              no:this.selectData[i].no,
              srcPath:this.selectData[i].path,
              desPath:val.no,
            },
            method:'post'
          })
          .then(function(res){
            var data = res.data;
            if(data.status == 'success'){
              vue.getFileList(vue.curFolder);
              vue.$message({
                type: 'success',
                message: 'Move to: ' + val.name
              });
            }
            else if(data.status=='fail')
              alert(data.msg);
          })
          .catch(function(error) {
            console.log(error)
          });
      }

    },
    renameFile() {
      if (this.selectData.length !== 1) {
        this.$alert('Please choose one file', 'Warming', {
          confirmButtonText: 'yes'
        });
      } else {
        this.$prompt('Please enter a new name', 'Tip', {
          confirmButtonText: 'yes',
          cancelButtonText: 'cancel'
        }).then(({value}) => {
          var vue = this;
          axios({
            url: 'rename',
            params:{
              type:this.selectData[0].type,
              no:this.selectData[0].no,
              name:value
            },
            method: 'post'
          })
          .then(function(response) {
            var data = response.data;
            if(data.status=="success"){
              vue.getFileList(vue.curFolder);
              vue.$message({
                type: 'success',
                message: 'New name: ' + value
              });
            }
            else if(data.status=="fail")
              alert(data.msg);
          })
          .catch()
          // for (let i in this.tableData) {
          //   console.log(this.tableData[i].name)
          //   if (this.tableData[i].name === this.selectData[0].name) {
          //     this.tableData[i].name = value
          //     this.selectData.name = value
          //   }
          // }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel'
          });
        });
      }
    },
    upload() {
      this.centerDialogVisible=true
    },
    uploadFile(param) {
      this.fileList.push(param.file)
    },
    cencelUploadFile(param) {
      this.fileList=[]
      param.file=''
      this.centerDialogVisible=false
    },
    submitUploadFile() {
      console.log(this.fileList[0])
      let date = new Date()
      console.log(date)
      let msg = this.fileMsg;
      let fileReder = new FileReader()
      fileReder.readAsDataURL(this.fileList[0])
      let binaryStr
      fileReder.onloadend = function(){
        binaryStr = fileReder.result.toString();
        console.log(binaryStr)
      }
      //console.log(file)
      let form = new FormData()
      form.append('file', this.fileList[0])
      form.append('date', date.toString())
      form.append('msg', msg)
      console.log(form)
      //axios.post('http://47.118.35.129:8080/CloudDisk/upload', form)
      var vue = this;
      axios({
        url: 'upload',
        data: form,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function(response) {
        var data = response.data;
        if(data.status=="success"){
          vue.centerDialogVisible=false
          alert(vue.fileList[0].name + "上传成功！");
          location.reload();
        }
        else if(data.status=="fail")
          alert(data.msg);
      })
      .catch()
    },
    getFileList(val){
      var vue = this;
      axios({
        url: 'getFileList',
        params: {
          path: val
        },
        method: 'post',
      })
      .then(function(response) {
        var data = response.data;
        if(data.status=="success"){
          if(val >= 0){
            vue.DiskTableData = data.msg;
            vue.tableData = data.msg;
            vue.curFolder = val;
          }
          else{
            vue.binList = data.msg;
            if(vue.isBin){
                vue.tableData = data.msg;
              }
          }
        }
      })
      .catch()
    }
  },
  mounted() {
    var vue = this;
    axios.get("checklogin").then(function(res){
              var data = res.data;
              if(data.status=="success"){
                  vue.user = data.msg;
                  //获取文件列表
                  vue.getFileList(vue.user.dirNo);
                  vue.history.push(vue.user.dirNo);
              }
          }).catch(function(err){
            console.log(err);
          })
    //获取回收站列表
    axios({
        url: 'getFileList',
        params: {
          path: -1
        },
        method: 'post',
      })
      .then(function(response) {
        var data = response.data;
        if(data.status=="success"){
            vue.binList = data.msg;
        }
      })
      .catch()
    
  },
}
</script>

<style scoped>
.el-container {
  padding: 3%;
  flex-direction: column;
}

.el-divider {
  height: 40px;
  width: 2px;
}

.el-button {
  width: 120px;
}

.right-button {
  float: right;
  margin: 5px;
  width: 100px;
}

.el-dialog__wrapper {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
</style>