<template>
	<el-container>
    	<el-header>
      		<header-bar></header-bar>
    	</el-header>
    	<el-aside></el-aside>
    	<el-main>
        <div id = "myChart" ></div>
    	</el-main>
    </el-container>
</template>

<script>
  import headerBar from 'bar/headerBar.vue'
  import echarts from 'echarts'
  export default {
    components: {
      headerBar,
    },
    mounted() {
      this.drawLine()
    },
    methods: {
      drawLine(){
        console.log(echarts)
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
    }
}
</script>

<style>
	
</style>