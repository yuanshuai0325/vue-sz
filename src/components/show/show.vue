<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="1"><div class="grid-content bg-purple">ID</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">用户名</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">硬件名称</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">序列号</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">备注</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">时间</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">操作</div></el-col>
      </el-row>
      <el-row :gutter="20"  v-for="item in data">
        <el-col :span="1"><div class="grid-content bg-purple">{{ item.id }}</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{ item.user }}</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{ item.device }}</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">{{ item.sn }}</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">{{ item.comment }}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">{{ item.day }}</div></el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-button-group prop="item">
              <el-button type="primary" icon="el-icon-edit" size="small" @click="openedit(item)">编辑</el-button>
              <el-button type="primary" icon="el-icon-check" size="small" v-if="!item.user">使用</el-button>
              <el-button type="primary" icon="el-icon-plus" size="small" v-if="item.user">入库</el-button>
              <el-button type="primary" icon="el-icon-delete" size="small">删除</el-button>
            </el-button-group>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="修改操作" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth" v-if="form.user">
      <el-input v-model="form.user" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="序列号" :label-width="formLabelWidth">
      <el-input v-model="form.sn" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="备注" :label-width="formLabelWidth">
      <el-input v-model="form.comment" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="updatedevice">确 定</el-button>
  </div>
</el-dialog>
    </el-main>
    
  </el-container>
</template>
<script>
  export default {
    props: [
      "data",
    ],
    data() {
      return {
        dialogFormVisible: false,
        form: {
          id: '',
          user: '',
          device: '',
          sn: '',
          comment: '',
          day: '',
        },
        formLabelWidth: '120px'
      };
    },
    methods: {
      openedit(arg) {
        this.form.id = arg.id
        this.form.user = arg.user
        this.form.device = arg.device
        this.form.sn = arg.sn
        this.form.comment = arg.comment
        this.form.day = arg.day
        this.dialogFormVisible = true
      },
      updatedevice() {
        dialogFormVisible: false,
        this.$store.dispatch("UpdateDevice",this.form).then(resp => { this.$message.success(resp)}).catch(err => { this.$message.error(err)})
      },

    }
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
