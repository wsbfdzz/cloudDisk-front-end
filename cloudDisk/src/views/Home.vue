<template>
  <div class="bg" :style="{backgroundImage: 'url(' + backgroundImageURL + ')'}">
    <el-card>
      <div slot="header">
        <span>
         XDU cloud disk
        </span>
      </div>
      <div>
        <span>
          项目介绍
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      backgroundImageURL: require('../assets/bg.jpg')
    }
  }
}
</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    background-repeat:no-repeat;
    background-size:100% 100%;
    margin-top: 0px;
    display: flex;
    align-items:center;
    justify-content: flex-end;
  }
  .el-card {
    height: 500px;
    width: 25%;
    margin-right: 10%;
    opacity: 0.7
  }

  .el-card:hover {
    opacity: 1
  }

</style>