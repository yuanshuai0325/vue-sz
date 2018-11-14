<template>
  <el-container>
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <el-aside></el-aside>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6" :offset="1">
          <el-switch
            v-model="value"
            active-text="使用中"
            inactive-text="库存" @change="chswitch">
          </el-switch>
        </el-col>
      </el-row>
      <show :data="data"></show>
    </el-main>
    <el-footer>
      <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
    </el-footer>
  </el-container>
 <!--  @size-change="handleSizeChange"
          @current-change="handleCurrentChange" -->
</template>
<script>
  import headerBar from 'bar/headerBar.vue'
  import show from 'show/show.vue'
  export default {
    data() {
      return {
        value: true,
        // pagesize: '',
        // pagesizes: [],
        // total: '',
        // data: '',
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
    components: {
      headerBar,
      show,
    },
    computed: {
      data() {
        return this.$store.getters.all
      },
      pagesizes() {
        return this.$store.getters.pagesizes
      },
      pagesize() {
        return this.$store.getters.pagesize
      },
      total() {
        return this.$store.getters.total
      },
    },
    methods: {
      chswitch() {
        this.$store.dispatch("GetAll",this.value).then(resp => { this.$message.success(resp) }).catch(err => {this.$message.error(err)})
      }
    },
    created() {
      // this.pagesizes = this.$store.getters.pagesizes
      // this.pagesize = this.$store.getters.pagesize
      // this.total = this.$store.getters.total
      this.$store.dispatch("GetAllUse").then(resp => {
        this.$message.success(resp);
      }).catch(err => {this.$message.error(err)})
    },
  }
</script>
<style>
</style>
