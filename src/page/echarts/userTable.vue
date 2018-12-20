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
    this.myChart.setOption(this.readyLineOption())
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
    readyLineOption () {
      let data = {
        title: {
          text: '创建数据分析'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['用户', '医疗机构']
        },
        toolbox: {
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
            boundaryGap: false,
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
            name: '用户',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '医疗机构',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      }
      return data
    }
  },
  watch: {
    id: () => {
      this.readyLineOption()
    }
  }
}
</script>

<style scoped>

</style>
