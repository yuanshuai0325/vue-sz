<template>
  <el-container>
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <el-aside></el-aside>
    <el-main>
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
          prop="name"
          label="姓名"
          :rules="[{required: true, message: '请输入姓名', trigger: 'blur'}]">
          <el-input v-model="dynamicValidateForm.name"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(device, index) in dynamicValidateForm.device"
          :label="'设备' + index"
          :key="device.key"
          :prop="'device.' + index + '.sn'"
          :rules="{
            required: true, message: 'SN不能为空', trigger: 'blur'
          }">
          <el-input placeholder="请输入SN" v-model="device.sn" class="input-with-select" >
            <el-select  placeholder="请选择设备" v-model="device.value" slot="prepend">
              <el-option v-for="item in labelData" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-input>
          <el-input placeholder="备注" v-model="device.comment"></el-input>
          <el-button @click.prevent="removeDevice(device)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
          <el-button @click="addDevice">新增设备名</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
  import headerBar from 'bar/headerBar.vue'
  export default {
  data() {
      return {
        dynamicValidateForm: {
          device: [{
            value:'', sn:'',comment:''
          }],
          name: '',
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            for (let item in this[formName].device) {
              if (this[formName].device[item].value == '') {
                this.$message.error("请在设备"+item+"处选择设备名称")
                return
              } 
            }
            this.$store.dispatch('AddUse',this[formName]).then(resp => {console.log(resp)
              let pd = resp.exec
              if (pd === 'true') {
                this.$message.success(resp.ret)
              } else {
                this.$message.error(resp.ret)
        }}).catch(err => {this.$message.error(err.ret)});

            // console.log(this.dynamicValidateForm.device);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        // console.log(formName)
        this.$refs[formName].resetFields();
        this.dynamicValidateForm={device:[{value:'',sn:''}],name:''}
      },
      removeDevice(item) {
        var index = this.dynamicValidateForm.device.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.device.splice(index, 1)
        }
      },
      addDevice() {
        this.dynamicValidateForm.device.push({
          value: '',
          // key: Date.now()
          sn: '',
        });
      },
      // remoteMethod() {
      //   this.$store.dispatch('GetDevice').then(resp => {console.log(resp)}).catch(err => {console.log(err)})
      // }
    },
    computed: {
      labelData() {
        return this.$store.getters.device
      },
    },
    components: {
      headerBar,
    },
    created() {
      this.$store.dispatch('GetDevice').then(resp => {console.log(resp);
        let pd = resp.exec
        console.log(pd)
        if (pd === 'true') {
          this.$message.success('device更新成功')
        } else {
          this.$message.error(resp.ret)
        }
      }).catch(err => {console.log(err);this.$message.error(err)});
    }
    // beforeUpdate() {
    //   console.log(this.dynamicValidateForm)
    // }
  }
</script>
<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
