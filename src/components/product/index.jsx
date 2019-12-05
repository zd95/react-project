//product组件负责商品管理

import React, { Component } from 'react'
import { Card, Table, Icon, Input, Select, Button, message } from 'antd'

import { reqGetProducts, reqUpdateProductStatus, reqSearchProducts } from '../../api'

import './index.less'


class Product extends Component {

  //用当前组件的状态对象来记录及管理用户在对应的页面容器中操作的数据
  state = {
    //接收后台响应的数据
    products: [],
    //记录响应数据的总数
    total: 0,
    //记录用户的搜索类型
    searchType: "productName",
    //记录用户的搜索内容
    searchValue: "",
    //标记当前页码
    currentPage: 1,
    //标记每页显示的数据
    pageSize: 3
  }

  //标记用户是否点击过搜索
  isSearch = false;
  //缓存用户点击搜索按钮后输入的关键字
  cacheSearchValue = "";
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

      //接收用户更新的商品状态值以及当前商品的id,向服务发送请求
      //更新数据库中对应商品的状态
      //根据商品对应的状态，显示商品是否上架
      title: '状态',
      // dataIndex: 'status',
      render: (product) => {
        console.log(product);
        //提取商品对应的状态值
        const { status } = product

        return (
          <div>
            <Button type={status === 1 ? "primary" : "default"}>
              {status === 1 ? "产品已上架" : "产品已下架"}
              <Icon type="check-square" theme="twoTone" />
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type={status === 1 ? "primary" : "default"} onClick={this.updateProductStatus(product)}>
              {
                status === 1 ? "下架当前商品" : "上架当前商品"
              }
              <Icon type="check-square" theme="twoTone" />
            </Button>

          </div>
        )
      }
    },
    {
      title: "操作",
      render: (product) => {
        // console.log(product);

        return (
          <div>
            <Button type="link" onClick={this.goProductDetail(product)}>
              详情
            </Button>
            <Button type="link" onClick={this.goProductUpdate(product)}>
              修改
            </Button>
          </div>
        )
      }
    }
  ]
  //请求商品列表数据{请求的页数，与每页显示的条数}
  getProducts = async (pageNum, pageSize) => {
    //等数据响应成功，提取响应数据，resul.list保存者具体的数据
    //resul.total:表示数据的总数
    let result = null;
    const { searchType } = this.state;
    if (this.isSearch) {
      result = await reqSearchProducts({
        pageNum,
        pageSize,
        searchType,
        searchValue: this.cacheSearchValue,
      })
    } else {
      result = await reqGetProducts(pageNum, pageSize)
    }

    // console.log(result);

    //用当前组件的状态对象来接收响应成功的数据
    this.setState({
      products: result.list,
      total: result.total,
      currentPage: pageNum,
      pageSize
    })

  }


  //点击添加按钮，跳转至商品添加组件
  goAddProduct = () => {
    this.props.history.push('/product/add');
  }

  //点击按钮，跳转至商品修改组件
  goProductUpdate = (product) => {
    /*
      点击修改按钮时，将对应的数据传入至目标组件中，在原数据的基础上进行修改
      数据会保存至props.localtion.state属性中
    */
    console.log(product);

    return () => {
      this.props.history.push('/product/update/' + product._id, product)
    }
  }

  //点击按钮，跳转至商品详情组件,同时将当前组件中对应的商品信息传递至目标组件
  goProductDetail = (product) => {
    console.log(product);

    return () => {
      this.props.history.push('/product/' + product._id, product)
    }

  }

  //更新产品状态
  updateProductStatus = (product) => {
    return () => {
      //提取当前商品的id值
      const productId = product._id
      //计算用户更新产品的状态码{减去当前的状态码}
      const status = 3 - product.status
      //将用户当前操作的数据发送至后台，更新数据库中对应的商品状态
      reqUpdateProductStatus(productId, status).then(_response => {
        //找到当前组件中所展示的对应的商品，更新其状态
        this.setState({
          products: this.state.products.map(product => {
            //找到被更新的商品
            if (product._id === productId) {
              //用更新的状态码覆盖之前的状态码
              return { ...product, status }
            }
            //如果没找到，将商品数据原样返回
            return product
          })
        })
        message.success("商品状态更新成功");
      })
    }
  }


  //监听下拉框的变化，用当前组件的状态对象记录用户的搜索类型
  selectChange = (value) => {
    this.setState({
      searchType: value
    })
  }
  //监听输入框的变化，用当前组件的状态对象记录用户在目标表单控件输入的内容
  inputChange = (event) => {
    this.setState({
      searchValue: event.target.value.trim()
    })
  }

  //用户点击搜索按钮
  searchProduct = () => {
    const { currentPage, pageSize, searchValue } = this.state
    //如果用户点击搜索
    this.isSearch = true;
      this.cacheSearchValue = searchValue;

      //发送请求
      this.getProducts(currentPage, pageSize)
    // reqSearchProducts({
    //   currentPage, 
    //   pageSize, 
    //   searchType,
    //   searchValue,
    // }).then((response)=>{
    //   this.setState({
    //     products:response.list,
    //     total:response.total
    //   })
    // })

  }
  //发送请求，向后台请求商品列表数据
  componentDidMount() {
    this.getProducts(1, 3)
  }
  render() {
    const { products, total, searchType, currentPage, pageSize } = this.state

    //返回一个卡片容器
    return (
      <Card
        title={
          //卡片的左部标题
          <div>
            <Select value={searchType} onChange={this.selectChange}>
              <Select.Option value="productName">根据商品名称</Select.Option>
              <Select.Option value="productDesc">根据商品描述</Select.Option>
            </Select>
            <Input
              placeholder="关键字"
              className="search-input"
              onChange={this.inputChange}
            />
            <Button type="primary" onClick={this.searchProduct}>搜索</Button>
          </div>
        }
        //设置卡片右部布局
        extra={
          <Button type="primary" onClick={this.goAddProduct}>
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
            pageSize,
            currentPage,
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