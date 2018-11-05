<template>
  <el-container>
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <el-aside></el-aside>
    <el-main>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入SN" v-model="sn" class="input-with-select" @keyup.13.native="open">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="open()"></el-button>
        </el-input>
      </div>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
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
    data() {
      return {
        sn:'',
        select: '',
      }
    },
    methods: {
      open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    },
    components: {
      headerBar,
    }
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
