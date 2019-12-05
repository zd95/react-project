/*
  当前组件显示对应的商品详情
  获取商品对应的信息，将商品的数据添加至对应的表单控件中进行展示
*/


import React, { Component } from 'react'
import { Card, Icon, Descriptions } from 'antd'
import { getCategoriesAsync } from '../../../redux/action-creators/category'
import { connect } from 'react-redux'
//请求当前商品的具体信息
import { reqGetProduct } from '../../../api';


@connect(state => ({ categories: state.categories }), { getCategoriesAsync })
class ProductDetail extends Component {
  //初始化当前组件的状态对象，用当前组件的状态对象来接收响应的数据
  state = {
    product: {}
  }

  //将对应的商品信息发送至服务器，请求当前商品的具体数据
  componentDidMount() {
    //如果商品列表中没有数据，向服务器发送请求，请求数据
    if (!this.props.categories.length) {
      this.props.getCategoriesAsync()
      console.log("getCategoriesAsync~执行了");
      
    }
    //如果跳转至当前组件的路径中没有携带对应的商品数据，发送请求
    //请求当前商品对应的具体数据
    if (!this.props.location.state) {
      reqGetProduct(this.props.match.params.id).then(response => {
        //用当前组件的状态对象来接收响应的数据
        this.setState({
          product: response 
        })
        console.log(response)
      })
    }
  }
  goBack = () => {
    this.props.history.goBack()
  }
  render() {

    //提取当前商品对应的数据信息，将其在对应的表单控件中进行展示
    //获取跳转至当前组件的路径中携带的数据
    const {
      categories,
      location: { state }
    } = this.props

    const { name, desc, price, categoryId, status, detail } = state || this.state.product
    console.log(state);
    console.log(this.state.product);
    
    //从响应的分类数据列表中提取与当前商品所对应的类名
    const category= categories.find(category => category._id === categoryId);
    //提取当前商品所属的分类名称{如果category有值，取其名称}
    const categoryName = category && category.name
    return (
      <Card
        title={
          <div>
            <Icon type="arrow-left" onClick={this.goBack} />
            &nbsp;&nbsp;商品详情
          </div>
        }
      >
        <Descriptions bordered>
          <Descriptions.Item label="商品名称" span={2}>{name}</Descriptions.Item>
      <Descriptions.Item label="商品分类">{categoryName}</Descriptions.Item>
          <Descriptions.Item label="商品价格">￥{price}</Descriptions.Item>
          <Descriptions.Item label="商品状态">
            {status === 1 ? "上架" : "下架"}
          </Descriptions.Item>
          <Descriptions.Item label="商品描述">{desc}</Descriptions.Item>
          <Descriptions.Item label="商品详情">
            <div dangerouslySetInnerHTML={{ __html: detail }}></div>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    )
  }
}

export default ProductDetail