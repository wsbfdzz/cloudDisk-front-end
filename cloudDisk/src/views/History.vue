<template>
  <el-container>
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
    <table>
      <tr>
        <th v-for='(item,ind) in columnList' :key="ind">{{item}}</th> //表头循环表的字段
      </tr>
      <tr v-for='(item,index) in inforList' :key="index">
        <td>{{item['time']}}</td>
        <td>{{item['files']}}</td>
        <td>{{item['size']}}</td>
      </tr>
    </table>

  </el-container>
</template>

<script>

export default {
  name: "History",
  data(){
    return {
      headerUrl: require('../assets/bg.jpg'),
    }
  },
}
</script>

<style scoped>

</style>