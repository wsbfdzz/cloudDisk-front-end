<template>
  <el-container>
    <el-card>
      <div slot="header">
        <el-button round type="primary" @click="upload">Upload</el-button>
        <el-dialog :visible.sync="centerDialogVisible" center title="提示" width="auto">
          <el-upload class="upload-demo" :limit="1" drag action="#" multiple :http-request="uploadFile" :on-remove="cencelUploadFile">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip"></div>
          </el-upload>
<!--          <el-input v-model="info" placeholder="请输入内容" style="margin-top: 20px"></el-input>-->
          <span slot="footer" class="dialog-footer">
            <el-button @click="cencelUploadFile">取 消</el-button>
            <el-button type="primary" @click="submitUploadFile">确 定</el-button>
          </span>
        </el-dialog>
        <el-button round type="warning" @click="createFolder">New Folder</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button class="right-button" type="success" @click="downloadFiles">Download</el-button>
        <el-button class="right-button" type="danger" @click="deleteFiles">Delete</el-button>
        <el-button class="right-button" type="warning" @click="renameFile">Rename</el-button>
        <el-button class="right-button" type="info" @click="moveFile">Move</el-button>
      </div>
      <div>
        <el-page-header v-if="enterFolder" :content="folder" title="Back" @back="goBack">
        </el-page-header>
        <el-table :data="tableData" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" height="450px"
                  row-key="id"
                  style="width: 100%" @select="selectFile" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="Name" prop="name" width="150"></el-table-column>
          <el-table-column label="Type" prop="type" width="150"></el-table-column>
          <el-table-column label="Date" prop="date" width="150"></el-table-column>
          <el-table-column label="Info" prop="info"></el-table-column>
        </el-table>
      </div>
      <!--      {{tableData}}-->
      <!--      <el-divider></el-divider>-->
      <!--      {{selectData}}-->
    </el-card>
  </el-container>
</template>

<script>
import DiskTableData from '../assets/testJson/DiskTableData.json'
import DiskTableData1 from '../assets/testJson/DiskTableData1.json'
import axios from "axios";

export default {
  name: "DiskTable",
  data() {
    return {
      folder: '111',
      enterFolder: false,
      tableData: DiskTableData.data,
      selectData: [],
      centerDialogVisible: false,
      fileList: [],
      info: ''
    }
  },
  props: ['table'],
  watch: {
    table(val, old) {
      console.log(val + ' ' + old)
      if (val === 'All')
        this.tableData = DiskTableData.data
      else if (val === 'Pic')
        this.tableData = DiskTableData1.data
      else
        this.tableData = DiskTableData.data
    }
  },
  methods: {
    goBack() {
      console.log('go back');
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
      let filesID = []
      if (this.selectData.length !== 0) {
        for (let i in this.selectData) {
          filesID.push(this.selectData[i].name)
        }
        this.openBox(filesID, 'Do you want to delete?')
      }
    },
    downloadFiles() {
      let filesID = []
      if (this.selectData.length !== 0) {
        for (let i in this.selectData) {
          filesID.push(this.selectData[i].name)
        }
        this.openBox(filesID, 'Do you want to download?')
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
      let id = this.tableData.length + 7
      let newFolder = {
        id: id,
        name: 'newFolder',
        type: 'folder',
        date: '2021-06-03',
        info: 'null'
      }
      this.tableData.push(newFolder)
    },
    moveFile() {
      let flag = false
      if (this.selectData.length === 0) {
        this.$alert('Please choose one file', 'Warming', {
          confirmButtonText: 'yes'
        });
        return
      } else {
        for (let i in this.selectData) {
          if (this.selectData[i].type === 'folder') {
            flag = true
          }
        }
      }
      if (flag === true) {
        this.$alert('Please choose files', 'Warming', {
          confirmButtonText: 'yes'
        });
      } else {
        this.$prompt('Please enter where you want to move', 'Tip', {
          confirmButtonText: 'yes',
          cancelButtonText: 'cancel'
        }).then(({value}) => {
          let flag = false
          let pos = 0
          for (let i in this.tableData) {
            if (this.tableData[i].name === value && this.tableData[i].type === 'folder') {
              flag = true
              pos = i
            }
          }
          if (flag === true) {
            this.$message({
              type: 'success',
              message: 'Move to: ' + value
            });
            for (let i in this.selectData) {
              this.tableData[pos].children.push(this.selectData[i])
            }
          } else {
            this.$message({
              type: 'warning',
              message: 'Please enter a correct folder'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel'
          });
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
          this.$message({
            type: 'success',
            message: 'New name: ' + value
          });
          for (let i in this.tableData) {
            console.log(this.tableData[i].name)
            if (this.tableData[i].name === this.selectData[0].name) {
              this.tableData[i].name = value
              this.selectData.name = value
            }
          }
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
      console.log(param.file)
      console.log(param)
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
      let msg = '1'
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
      axios({
        url: 'http://47.118.35.129:8080/CloudDisk/upload',
        data: form,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch()
    }
  }
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