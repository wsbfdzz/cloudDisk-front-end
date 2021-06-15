<template>
  <el-card>
<!--    <table>-->
<!--      <thead>-->
<!--      <tr>-->
<!--        <th width="20">时间</th>-->
<!--        <th width="40">上传文件</th>-->
<!--        <th width="20">文件大小</th>-->
<!--      </tr>-->
<!--      </thead>-->

<!--      <tbody>-->
<!--      <tr v-for='(item,index) in infolist': key="index">-->
<!--        <td></td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--    <table>-->
<!--      <tr>-->
<!--        <th v-for='(item,ind) in columnList' :key="ind">{{item}}</th>-->
<!--      </tr>-->
<!--      <tr v-for='(item,index) in inforList' :key="index">-->
<!--        <td>{{item['time']}}</td>-->
<!--        <td>{{item['files']}}</td>-->
<!--        <td>{{item['size']}}</td>-->
<!--      </tr>-->
<!--    </table>-->
    <el-table :data="history">
      <el-table-column prop="date" label="日期">
      </el-table-column>
      <el-table-column prop="file" label="上传文件">
      </el-table-column>
      <el-table-column prop="size" label="文件大小">
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>

export default {
  name: "History",
  data(){
    return {
      history:[{
        date: '2020-6-26',
        file: '1.doxc',
        size: '26MB'
      },{
        date: '2020-7-16',
        file: '2.doxc',
        size: '36MB'
      },{
        date: '2021-2-26',
        file: '3.doxc',
        size: '26MB'
      }],
    }
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