<template>
  <el-card>
    <el-table :data="history">
      <el-table-column prop="date" label="日期">
      </el-table-column>
      <el-table-column prop="name" label="上传文件">
      </el-table-column>
      <el-table-column prop="size" label="文件大小">
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>

import axios from "axios";
export default {
  name: "InfoHistory",
  data(){
    return {
      history:[{
        date: '2020-6-26',
        name: '1.doxc',
        size: '26MB'
      },{
        date: '2020-7-16',
        name: '2.doxc',
        size: '36MB'
      },{
        date: '2021-2-26',
        name: '3.doxc',
        size: '26MB'
      }],
    }
  },
  mounted() {
    axios
        .post('/getFileList')
        .then(response => (
            this.history=response.data.msg
        ))
        .catch(function (error) { // 请求失败处理
          window.alert('读取失败!');
          console.log(error);
        });
  },
}
</script>

<style scoped>
.el-card {
  width: 90%;
  height: auto;
  margin: 20px;
}
</style>