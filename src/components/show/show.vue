<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="1"><div class="grid-content bg-purple">ID</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">用户名</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">硬件名称</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">SN</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">备注</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">时间</div></el-col>
      </el-row>
      <el-row :gutter="20"  v-for="item in data">
        <el-col :span="1"><div class="grid-content bg-purple">{{ item.id }}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">{{ item.user }}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">{{ item.device }}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">{{ item.sn }}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">{{ item.comment }}</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{ item.day }}</div></el-col>
      </el-row>
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
  export default {
    props: [
      "name",
      "pagesizes",
      "pagesize",
      "total",
      "data",
    ],
    // data() {
    //   return {
    //     pagesize: '',
    //     pagesizes: [],
    //     total: '',
    //   }
    // },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      console.log(this.total,this.pagesizes)

      }
    },
    // computed:{
    //   alluse() {
    //     return this.$store.getters.alluse
    //   },
    // },
    // beforeMount() {
      // this.pagesizes = this.$store.getters.pagesizes
      // this.pagesize = this.$store.getters.pagesize
      // this.total = this.$store.getters.total
      // this.$store.dispatch("GetAllUse").then(resp => {this.$message.success("获取数据成功")}).catch(err => {this.$message.error(err)})
    // },
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
