<template>
  <div :id="id" style="width:100%;height:400px;"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      myChart: null
    }
  },
  mounted () {
    this.myChart = echarts.init(document.getElementById(this.id))
    this.myChart.setOption(this.readyBarOption(this.type))
  },
  beforeDestroy () {
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
  },
  props: ['id'],
  methods: {
    readyBarOption () {
      let data = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {text: '查询数据分析'},
        legend: {
          data: ['医疗机构', '医师', '护士']
        },
        toolbox: { // 保存图片
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '医疗机构',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320],
            markLine: {
              lineStyle: {
                normal: {
                  type: 'dashed'
                }
              },
              data: [
                [{type: 'min'}, {type: 'max'}]
              ]
            }
          },
          {
            name: '医师',
            type: 'bar',
            stack: '广告',
            data: [120, 132, 0, 134, 90, 230, 210]
          },
          {
            name: '护士',
            type: 'bar',
            stack: '广告',
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      }
      return data
    }
  },
  watch: {
    id: (v) => {
      this.readyBarOption(v)
    }
  }
}
</script>

<style scoped>

</style>
