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
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="pagesizes"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
  import headerBar from 'bar/headerBar.vue'
  export default {
    data(){
      return {
        pagesize: 20,
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    computed:{
      pagesizes() {
        this.$store.getters.pagesizes
      },
      total() {
        this.$store.getters.total
      }
    },
    components: {
      headerBar,
    }
  }
</script>
<style>

</style>
