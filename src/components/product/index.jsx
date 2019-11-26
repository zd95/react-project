//product组件负责商品管理

import React, { Component } from 'react'
import { Card, Table, Icon, Input, Select, Button } from 'antd'
import './index.less'
import { reqGetProducts } from '../../api'



class Product extends Component {

  //用当前组件的状态对象来管理用户在对应的页面容器中操作的数据
  state = {
    //接收后台响应的数据
    products: [],
    //记录响应数据的总数
    total:0
    //
  }

  //设置Table组件表格的列数
  columns = [
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title: '价格',
      dataIndex: 'price'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: () => {
        return (
          <div>
            <Button type="primary">上架</Button>
            产品已下架
          </div>
        )
      }
    },
    {
      title: "操作",
      render: () => {
        return (
          <div>
            <Button type="link">详情</Button>
            <Button type="link">操作</Button>
          </div>
        )
      }
    }
  ]
  //请求商品列表数据{请求的页数，与每页显示的条数}
  getProducts = async (pageNum, pageSize) => {
    //等数据响应成功，提取响应数据，resul.list保存者具体的数据
    //resul.total:表示数据的总数
    const result = await reqGetProducts(pageNum, pageSize)
    // console.log(result);
    
    //用当前组件的状态对象来接收响应成功的数据
    this.setState({
      products:result.list,
      total:result.total
    })

  }
  //发送请求，向后台请求商品列表数据
  componentDidMount() {
    this.getProducts(1, 3)
  }
  render() {
    const { products,total } = this.state
    //返回一个卡片容器
    return (
      <Card
        title={
          //卡片的左部标题
          <div>
            <Select value={1}>
              <Select.Option value={1}>根据商品名称</Select.Option>
              <Select.Option value={2}>根据商品描述</Select.Option>
            </Select>
            <Input placeholder="关键字" className="search-input" />
            <Button type="primary">搜索</Button>
          </div>
        }
        //设置卡片右部布局
        extra={
          <Button type="primary">
            <Icon type="plus" />
            添加商品
          </Button>
        }
      >

        <Table
          columns={this.columns}
          dataSource={products}
          bordered
          rowKey="_id"
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["3", "6", "9", "12"],
            defaultPageSize: 3,
            total, // 表示响应数据的总数
            //监听页码的变化，当页码发生改变时，请求目标页码对应的数据
            onChange: this.getProducts, 
            //设置目标页码展示请求数据的数量{每页展示多少条数据}
            onShowSizeChange: this.getProducts // pageSize 变化的回调
          }}
        />


      </Card>
    )
  }
}


export default Product