<template>
  <el-container>
    <el-card>
      <div slot="header">
        <el-button round type="primary" >Upload</el-button>
        <el-button round type="warning" @click="createFolder">New Folder</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="success" class="right-button" @click="downloadFiles">Download</el-button>
        <el-button type="danger" class="right-button" @click="deleteFiles">Delete</el-button>
        <el-button type="warning" class="right-button" @click="renameFile">Rename</el-button>
        <el-button type="info" class="right-button" @click="moveFile">Move</el-button>
      </div>
      <div>
        <el-page-header @back="goBack" :content="folder" title="Back" v-if="enterFolder">
        </el-page-header>
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" @select="selectFile"
                  height="450px" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="name" label="Name" width="150"></el-table-column>
          <el-table-column prop="type" label="Type" width="150"></el-table-column>
          <el-table-column prop="date" label="Date" width="150"></el-table-column>
          <el-table-column prop="info" label="Info"></el-table-column>
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
export default {
  name: "DiskTable",
  data() {
    return {
      folder: '111',
      enterFolder: false,
      tableData: DiskTableData.data,
      selectData: []
    }
  },
  props: ['table'],
  watch: {
    table(val, old) {
      console.log(val + ' ' + old)
      if(val === 'All')
        this.tableData = DiskTableData.data
      else if(val === 'Pic')
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
          this.selectData=rows
        });
      } else {
        this.$refs.multipleTable.clearSelection();
        this.selectData=rows
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selectData=val
    },
    selectFile(val) {
      console.log(val)
      this.selectData=val
    },
    deleteFiles() {
      let filesID = []
      if(this.selectData.length !== 0) {
        for(let i in this.selectData) {
          filesID.push(this.selectData[i].name)
        }
        this.openBox(filesID, 'Do you want to delete?')
      }

    },
    downloadFiles() {
      let filesID = []
      if(this.selectData.length !== 0) {
        for(let i in this.selectData) {
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
      if(this.selectData.length === 0) {
        this.$alert('Please choose one file', 'Warming', {
          confirmButtonText: 'yes'
        });
        return
      } else {
        for(let i in this.selectData) {
          if(this.selectData[i].type === 'folder') {
            flag = true
          }
        }
      }
      if(flag === true) {
        this.$alert('Please choose files', 'Warming', {
          confirmButtonText: 'yes'
        });
      } else {
        this.$prompt('Please enter where you want to move', 'Tip', {
          confirmButtonText: 'yes',
          cancelButtonText: 'cancel'
        }).then(({ value }) => {
          let flag = false
          let pos = 0
          for(let i in this.tableData) {
            if(this.tableData[i].name === value && this.tableData[i].type === 'folder') {
              flag = true
              pos = i
            }
          }
          if(flag === true) {
            this.$message({
              type: 'success',
              message: 'Move to: ' + value
            });
            for(let i in this.selectData) {
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
      if(this.selectData.length !== 1) {
        this.$alert('Please choose one file', 'Warming', {
          confirmButtonText: 'yes'
        });
      } else {
        this.$prompt('Please enter a new name', 'Tip', {
          confirmButtonText: 'yes',
          cancelButtonText: 'cancel'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: 'New name: ' + value
          });
          for(let i in this.tableData) {
            console.log(this.tableData[i].name)
            if(this.tableData[i].name === this.selectData[0].name) {
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
</style>