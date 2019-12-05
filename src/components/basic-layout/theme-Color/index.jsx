import React, { Component } from 'react'
import { Icon, Drawer, Divider, Button } from "antd";
//设置颜色组件
import { SketchPicker } from "react-color";
//记录及管理用户设置的颜色
import { getItem, setItem } from '../../../utils/local-storage'
import './index.less'

//从local中提取用户设置的颜色,如果用户没有设置，使用默认颜色
const initColor = getItem("color") || "#1DA57A";


class ThemeColor extends Component {
  //设置主题颜色组件的显示状态
  state = {
    visible: false,
    //记录用户设置的主题颜色
    background: initColor,
    //记录用户改变主题颜色之前的设置的颜色
    prevColor: initColor

  }

  //显示主题颜色组件
  ShowFn = () => {
    this.setState({
      visible: true
    })
  }

  //组件外部点击鼠标，隐藏主题颜色组件
  onClose = () => {
    this.setState({
      visible: false
    })
  }

  //设置主题颜色
  /*
    当颜色选择器的颜色改变时触发该方法，获取用户设置的颜色
    将其转换为十六进制的颜色数据，当用前组件的状态对象中的background来接收；

    再将backbground中的颜色添加至颜色选择器的颜色设置中
  */
  handleChangeComplete = (color) => {
    this.setState({
      background: color.hex
    })
  }

  componentDidMount() {
    // 组件挂载 至页面时，
    //获取id为ThemeColor的颜色选择器   style标签
    this.styleEl = document.getElementById("ThemeColor")
    //如果没有，就创建一个
    if (!this.styleEl) {
      this.styleEl = document.createElement("style")
      //给创建的style标签添加一个id
      this.styleEl.id = "ThemeColor"
    }
    //获取页面的头部元素
    this.headel = document.querySelector('head')

    //默认调用一次setColor，初始化主题颜色
    this.setColor()
  }

  //记录并处理用户设置的颜色
  setColor = () => {
    // 定义需要切换主题颜色的元素
    const { background } = this.state
    const style = `
    .ant-menu.ant-menu-dark .ant-menu-item-selected{
      background-color: ${background};
    }
    .theme-picker{
      background-color: ${background};
    }
    .ant-btn-link{
      color: ${background};
    }
    .ant-btn-link:hover, .ant-btn-link:focus{
      color: ${background};
      border-color: ${background};
    }
    .header-main .header-main-top{
      border-bottom: 1px solid  ${background};
    }
  `
    // 将设置的颜色添加至styleEl
    this.styleEl.innerHTML = style;
    //将设置的样式添加至headel最后，覆盖掉上一次的颜色设置
    this.headel.appendChild(this.styleEl)

    //保存用户设置的颜色
    setItem("color",background)
    //隐藏主题颜色选择器
    this.setState({
      visible:false,
      prevColor:background
    })
  }
  render() {
    return (
      <div>
        <div className="theme-picker" onClick={this.ShowFn}>
          <Icon type="setting" className="theme-picker-icon" />
        </div>
        <Drawer
          title="设置主题颜色"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <SketchPicker
            onChangeComplete={this.handleChangeComplete}
            color={this.state.background}
          />
          {/* 设置分割线 */}
          <Divider />
          <Button onClick={this.onClose}>取消</Button>
      <Button type="primary" onClick={this.setColor}>确认</Button>
        </Drawer>
      </div>
    )
  }
}
export default ThemeColor