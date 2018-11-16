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
              <el-button type="primary" icon="el-icon-check" size="small" v-if="!item.user" @click="openuse(item)">使用</el-button>
              <el-button type="primary" icon="el-icon-plus" size="small" v-if="item.user" @click="openstorage(item)">入库</el-button>
              <el-button type="primary" icon="el-icon-delete" size="small" @click="opendelete(item)">删除</el-button>
            </el-button-group>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="修改操作" :visible.sync="dialogFormEdit">
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
          <el-button @click="dialogFormEdit = false">取 消</el-button>
          <el-button type="primary" @click="updatedevice">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="改为使用" :visible.sync="dialogFormUse">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth" >
            <el-input v-model="form.user"></el-input>
          </el-form-item>
          <el-form-item label="序列号" :label-width="formLabelWidth">
            <el-input v-model="form.sn" autocomplete="off"  disabled></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.comment" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormUse = false">取 消</el-button>
          <el-button type="primary" @click="updateuse">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="入库" :visible.sync="dialogFormStorage">
        <el-form :model="form">
          <el-form-item label="信息" :label-width="formLabelWidth">
            <span>将 <el-tag type='info'>{{ form.user }}</el-tag> 用户名下 SN 为 <el-tag>{{ form.sn }}</el-tag> 的 <el-tag>{{ form.device }}</el-tag> 入库</span>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.comment" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormStorage = false">取 消</el-button>
          <el-button type="primary" @click="updatestorage">确 定</el-button>
        </div>
      </el-dialog>
      <!-- <el-dialog title="提示" :visible.sync="dialogFormUse" width="30%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormUse = false">取 消</el-button>
          <el-button type="primary" @click="updateuse">确 定</el-button>
        </span>
      </el-dialog> -->
      <!-- <el-dialog title="入库" :visible.sync="dialogFormStorage" width="30%">
        <span>将 {{ form.user }} 用户名下 SN 为 {{ form.sn }} 的 {{ form.device }} 入库</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormStorage = false">取 消</el-button>
          <el-button type="primary" @click="updatestorage">确 定</el-button>
        </span>
      </el-dialog> -->
      <el-dialog title="提示" :visible.sync="dialogFormDelete" width="30%">
        <span>将 SN 为 <el-tag>{{ form.sn }}</el-tag> 的 <el-tag>{{ form.device }}</el-tag>从数据库中<el-tag type="danger"> 删除 </el-tag></span> 
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormDelete = false">取 消</el-button>
          <el-button type="primary" @click="updatedelete">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
    
  </el-container>
</template>
<script>
  export default {
    props: [
      "data",
      "sn",
      "select",
    ],
    data() {
      return {
        dialogFormEdit: false,
        dialogFormUse: false,
        dialogFormStorage: false,
        dialogFormDelete: false,
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
        this.dialogFormEdit = true
      },
      openuse(arg) {
        console.log(this.form.user)
        this.form.id = arg.id
        this.form.user = ''
        this.form.device = arg.device
        this.form.sn = arg.sn
        this.form.comment = arg.comment
        this.form.day = arg.day
        this.dialogFormUse = true
      },
      openstorage(arg) {
        this.form.id = arg.id
        this.form.user = arg.user
        this.form.device = arg.device
        this.form.sn = arg.sn
        this.form.comment = arg.comment
        this.form.day = arg.day
        this.dialogFormStorage = true
      },
      opendelete(arg) {
        this.form.id = arg.id
        this.form.user = arg.user
        this.form.device = arg.device
        this.form.sn = arg.sn
        this.form.comment = arg.comment
        this.form.day = arg.day
        this.dialogFormDelete = true
      },
      updatedevice() {
        this.dialogFormEdit = false;
        this.$store.dispatch("UpdateDevice",this.form).then(resp => { this.$message.success(resp)}).catch(err => { this.$message.error(err)});
        if (this.$router.history.current.name === 'search') {
          this.$store.dispatch('SearchDevice',[this.sn,this.select]).then(resp => {console.log(resp);
          this.$message.success(resp);
        }).catch(err => {this.$message.error(err)})
        }
      },
      updateuse() {
        this.dialogFormUse = false;
        if (this.form.user) {
          this.$store.dispatch("UpdateUse",this.form).then(resp => { this.$message.success(resp)}).catch(err => { this.$message.error(err)})
        } else {
          this.$message.error("库存转使用,请输入用户名")
        };
        if (this.$router.history.current.name === 'search') {
          this.$store.dispatch('SearchDevice',[this.sn,this.select]).then(resp => {console.log(resp);
          this.$message.success(resp);
        }).catch(err => {this.$message.error(err)})
        }
      },
      updatestorage() {
        this.dialogFormStorage = false;
        this.$store.dispatch("UpdateStorage",this.form).then(resp => { this.$message.success(resp)}).catch(err => { this.$message.error(err)});
        if (this.$router.history.current.name === 'search') {
          this.$store.dispatch('SearchDevice',[this.sn,this.select]).then(resp => {console.log(resp);
          this.$message.success(resp);
        }).catch(err => {this.$message.error(err)})
        }
      },
      updatedelete() {
        this.dialogFormDelete = false;
        this.$store.dispatch("UpdateDelete",this.form).then(resp => { this.$message.success(resp)}).catch(err => { this.$message.error(err)});
        if (this.$router.history.current.name === 'search') {
          this.$store.dispatch('SearchDevice',[this.sn,this.select]).then(resp => {console.log(resp);
          this.$message.success(resp);
        }).catch(err => {this.$message.error(err)})
        }
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
