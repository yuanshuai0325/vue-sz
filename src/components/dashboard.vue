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
      getall() {
        this.$store.dispatch("GetAll").then(resp => { this.$message.success(resp) }).catch(err => {this.$message.error(err)})
      },
      handleSizeChange(val) {
        this.$store.dispatch("ChangeCurSize",val);
        this.getall()
      },
      handleCurrentChange(val) {
        this.$store.dispatch("ChangeCurPage",val);
        this.getall()
      },
      chswitch() {
        console.log(1)
        this.$store.dispatch("ChangeUseShow")
        console.log(2)
        this.getall()
      },
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
