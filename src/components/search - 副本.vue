<template>
  <el-container>
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <el-aside></el-aside>
    <el-main>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入SN" v-model="sn" class="input-with-select" @keyup.13.native="open">
          <el-select  placeholder="请选择设备" v-model="select" slot="prepend" >
              <el-option v-for="item in labelData" :label="item.name" :value="item.id"></el-option>
            </el-select>
          <el-button slot="append" icon="el-icon-search" @click="open()"></el-button>
        </el-input>
      </div>
      <show :data="search_device" :sn='sn' :select='select' v-if="search_show"></show>
    </el-main>
    <el-footer>
      
    </el-footer>
  </el-container>
</template>
<script>
  import headerBar from 'bar/headerBar.vue'
  import show from 'show/show.vue'
  export default {
    data() {
      return {
        sn:'',
        select: '',
      }
    },
    methods: {
      // open() {
      //   this.$alert('这是一段内容', '标题名称', {
      //     confirmButtonText: '确定',
      //     callback: action => {
      //       this.$message({
      //         type: 'info',
      //         message: `action: ${ action }`
      //       });
      //     }
      //   });
      // },
      // test() {
      //   console.log(this.select)
      // },
      open() {
        this.$store.dispatch('SearchDevice',[this.sn,this.select]).then(resp => {console.log(resp);
          this.$message.success(resp);
        }).catch(err => {this.$message.error(err)})
      }
    },
    computed: {
      labelData() {
        return this.$store.getters.device
      },
      search_show() {
        return this.$store.getters.search_show
      },
      search_device() {
        return this.$store.getters.search_device
      },
    },
    components: {
      headerBar,
      show,
    },
    created() {
      this.$store.dispatch('ChSearchDevice',false)
      this.$store.dispatch('GetDevice').then(resp => {console.log(resp);
          this.$message.success('device更新成功')
      }).catch(err => {console.log(err);this.$message.error(err)});
    },
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
