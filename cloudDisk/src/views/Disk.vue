<template>
  <el-row style="height: 100%">
    <el-col :span="3" style="display: flex;flex: 1;flex-direction: column;height: 100%">
      <disk-nav-menu @func="switchTable"></disk-nav-menu>
    </el-col>
    <el-col :span="21">
      <disk-table :table="table"></disk-table>
    </el-col>
  </el-row>
</template>

<script>
import DiskNavMenu from "../components/DiskNavMenu";
import DiskTable from "../components/DiskTable";

export default {
  name: "Disk",
  components: {
    DiskNavMenu,
    DiskTable
  },
  data() {
    return {
      table: ''
    }
  },
  methods: {
    switchTable(key) {
      this.table = key
    }
  }
}
</script>

<style scoped>
  .el-main {
    padding: 0;
  }
</style>