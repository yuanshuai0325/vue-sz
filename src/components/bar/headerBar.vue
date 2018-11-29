<template>
	<el-menu
  		:default-active="activeIndex"
  		class="el-menu-demo"
  		mode="horizontal"
  		@select="handleSelect"
  		background-color="#545c64"
  		text-color="#fff"
  		active-text-color="#ffd04b"
  		:router="true">
  	<el-menu-item index="dashboard">展示中心</el-menu-item>
    <el-menu-item index="search">查找</el-menu-item>
  	<el-submenu index="3">
    	<template slot="title">我的工作台</template>
    	<el-menu-item index="use">分配录入</el-menu-item>
    	<el-menu-item index="storage">库存录入</el-menu-item>
    	<!-- <el-submenu index="2-4">
      		<template slot="title">选项4</template>
      			<el-menu-item index="2-4-1">选项1</el-menu-item>
      			<el-menu-item index="2-4-2">选项2</el-menu-item>
      			<el-menu-item index="2-4-3">选项3</el-menu-item>
    	</el-submenu> -->
  	</el-submenu>
  	<el-submenu index="4">
      <template slot="title">用户中心</template>
      <el-menu-item index="userlist">用户列表</el-menu-item>
      <el-menu-item index="4-2"><a href="http://192.168.154.100:8000/admin" target="_blank">后台用户</a></el-menu-item>
    </el-submenu>
  	<!-- <el-menu-item index="4"><a href="http://127.0.0.1" target="_blank">x退出</a></el-menu-item> -->
  	<el-menu-item index="5" @click="out">退出</el-menu-item>
</el-menu>
</template>

<script>
	export default {
    	data() {
    	  return {
    	    activeIndex: ''
    	  };
    	},
    	methods: {
    	  handleSelect(key, keyPath) {
    	    console.log(key, keyPath);
          console.log(this.activeIndex)
    	  },
        out() {
          // sessionStorage.removeItem("token")
          this.$router.push('login')
        }
    	},
      mounted(){
        this.activeIndex = this.$router.history.current.name
    }
  	}
</script>

<style>
	
</style>