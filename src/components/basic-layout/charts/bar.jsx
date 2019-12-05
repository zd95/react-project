/*
  antd的bizcharts图标工具
*/


import React, { Component } from 'react'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";
export default class Bar extends Component {
  state = {
    data: [],
    cols:{}
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: [
          {
            year: "1951 年",
            sales: 38
          },
          {
            year: "1952 年",
            sales: 52
          },
          {
            year: "1956 年",
            sales: 61
          },
          {
            year: "1957 年",
            sales: 145
          },
          {
            year: "1958 年",
            sales: 48
          },
          {
            year: "1959 年",
            sales: 38
          },
          {
            year: "1960 年",
            sales: 38
          },
          {
            year: "1962 年",
            sales: 38
          }
        ],
        cols:{
          sales: {
            tickInterval: 20
          }
        }
      })
    }, 1000)
  }
  render() {
    const { data,cols } = this.state
    return (
      <Chart height={400} data={data} scale={cols} forceFit>
        <Axis name="year" />
        <Axis name="sales" />
        <Tooltip
          crosshairs={{
            type: "y"
          }}
        />
        <Geom type="interval" position="year*sales" />
      </Chart>
    )
  }
}
