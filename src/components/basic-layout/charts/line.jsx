import React, { Component } from 'react'

//引入图表组件
import ReactEcharts from 'echarts-for-react';
export default class Line extends Component {


  getOption = () => {
    // 设置图标的配置选项
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    }


    return option
  }
  render() {
    return (
      // 在该组件上设置需要渲染的图标配置
      <ReactEcharts option={this.getOption()} />
    )
  }
}
