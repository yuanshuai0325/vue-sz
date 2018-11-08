<template>
  <el-container>
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <el-aside></el-aside>
    <el-main>
      
    </el-main>
    <el-footer>
      <div class="block">
        <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
  import headerBar from 'bar/headerBar.vue'
  export default {
    components: {
      headerBar,
    }
  }
</script>
<style>

</style>
