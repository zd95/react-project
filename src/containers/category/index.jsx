import React, { Component } from 'react';
import { Card, Table, Button, Icon, Modal } from "antd";
import { connect } from "react-redux";
import AddCategoryForm from './add-category-Form'
import UpdateCategoryForm from './update-category-Form'
//引入action-crearors中发送请求、创建store对象的方法的方法
import {
  getCategoriesAsync,
  addCategoryAsync,
  updateCategoryAsync,
  delCategoryAsync,
} from '../../redux/action-creators/category';


@connect(
  state => ({ categories: state.categories }),
  {
    getCategoriesAsync,
    addCategoryAsync,
    updateCategoryAsync,
    delCategoryAsync
  }
)
class Category extends Component {
  //设置组件的初始化状态
  state = {
    //{添加分类}设置弹框的初始化状态,默认隐藏
    addCategoryVisible: false,

    //{修改分类}设置弹框的初始化状态,默认隐藏
    updateCategoryVisible: false,
    //用当前组件的状态对象来接收用户更新的数据
    category: {}

  }

  //定义表头数据
  columns = [
    {
      title: '品类名称',
      /*
        指定当前列显示的数据，去data中找到对应的key，取其value值
        当前列所展示的数据需要从后台获取，
        向后台发送请求，接收后台返回的数据,在当前列展示，
        并将数据保存至redux中
       */
      //在当前列显示
      dataIndex: 'name',
      /*
        指定dataindex中的数据以何种方式显示，是否需要跳转
      */
      // render: text => <a>{text}</a>,
    },
    {
      title: '操作',
      // className: 'column-money',
      // dataIndex: 'money',
      /*
        点击当前列的按钮可以增加或修改数据，属于功能按钮，不是纯文本样式
        需要用render()方法来进行设置
      */
      render: category => {
        //获取当前页面中所有的分类数据
        // console.log(category);

        return (
          <div>
            <Button type="link" onClick={this.showUpdateCategory(category)}>修改分类</Button>
            {
              /*
                设置删除分类数据的方法，当用户点击删除按钮时，弹出删除弹框，删除数据
              */
            }
            <Button type="link" onClick={this.delCategory(category)}>删除分类</Button>
          </div>
        )
      }
    },
    /* {
      title: 'Address',
      dataIndex: 'address',
    }, */
  ];
  //点击添加分类按钮，显示弹框
  show = () => {
    this.setState({
      addCategoryVisible: true
    })
  }
  //点击弹框按钮，添加分类
  addCategory = () => {
    //从当前组件的子组件的实例对象中获取form属性中的数据，判断并处理该数据
    //提取form属性中的validateFields方法，符合校验规则的数据
    //发送至后台
    this.addCategoryForm.props.form.validateFields(async (err, values) => {
      //如果数据符合规则
      if (!err) {
        console.log(values);
        //提取用户输入的数据
        const { categoryName } = values;
        //向分类列表中添加数据{等数据响应成功，将数据保存至redux中}
        await this.props.addCategoryAsync(categoryName)
        //隐藏弹框
        this.hidden("addCategory")();

      }
    })

  }

  //修改分类
  //点击按钮，完成对数据的修改,将更新后的数据发送至后台数据库
  //同时更新redux中对应的数据
  updateCategory = () => {
    //处理对应的表单控件中用户需要更新的数据，提取form属性中的validateFields方法，符合校验规则的数据
    this.updateCategoryForm.props.form.validateFields(async (err, values) => {
      //如果用户需要更新的数据符合校验规则,将更新的数据发送至后台
      if (!err) {
        console.log(values);
        //提取更新数据的数据类名
        const { categoryName } = values
        //提取被更新的数据的id值
        const categoryId = this.state.category._id
        //将数据处理后发送至后台数据库
        await this.props.updateCategoryAsync(categoryId, categoryName)

        //等数据响应成功之后，调用hidden方法，传入对应的表单控件，隐藏当前弹框
        this.hidden("updateCategory")()
      }

    })
  }


  //隐藏弹框
  hidden = (name) => {
    return () => {
      this.setState({
        [`${name}Visible`]: false
      });
      setTimeout(() => {
        //操作完成之后，清空表单输入框中的数据
        this[`${name}Form`].props.form.resetFields()
      }, 500)
    }
  }

  //用户点击表格中的修改分类按钮时，获取用户输入的数据，更新当前组件的状态
  showUpdateCategory = category => {
    console.log(category);

    return () => {
      this.setState({
        //弹出修改弹框
        updateCategoryVisible: true,
        //更新状态数据
        category
      })
    }
  }


  /*
    设置删除分类数据的方法，当用户点击删除按钮时，弹出删除弹框，删除数据
  */
  //将当前分类数据的类名在弹框中展示
  delCategory = (category) => {
    //弹出删除弹框
    return () => {
      Modal.confirm(
        //传一个对象
        {
          title: (
            <span>
              您确认要删除
              <span style={{ color: "red", fontWeight: "bold" }}>
                {category.name}
              </span>
              分类数据吗？
          </span>
          ),
          onOk: () => {
            //如果用户点击确认删除，将当前分类数据的id发送至后台，删除数据
            //同时删除redux中对应的数据
            this.props.delCategoryAsync(category._id);
          }
        }
      )
    }
  }
  //发送请求
  componentDidMount() {
    //如果分类列表中的数据值为空
    if(!this.props.categories.length){
      this.props.getCategoriesAsync()
    }
    
  }
  render() {

    //提取响应的数据
    const { categories } = this.props
    // console.log(categories);
    //获取当前组件的状态
    const { addCategoryVisible, updateCategoryVisible, category } = this.state

    return (
      <div>
        {/*设置卡片模板*/}
        <Card
          title="分类列表"
          extra={
            <Button type="primary" onClick={this.show}>
              <Icon type="plus" />
              添加分类
            </Button>
          }
        >
          <Table
            columns={this.columns}
            dataSource={categories}
            bordered
            rowkey="_id"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["3", "6", "9", "12"],
              defaultPageSize: 3
            }}

          />
        </Card>

        <Modal
          title="添加分类"
          visible={addCategoryVisible}
          onOk={this.addCategory}
          onCancel={this.hidden("addCategory")}
          width={300}
        >
          {
            /*
              wrappedComponentRef方法：
              获取子组件实例对象中form属性，收集子组件form表单中校验成功
              的数据，将数据添加至列表中
            */
          }
          <AddCategoryForm
            wrappedComponentRef={form => (this.addCategoryForm = form)}
          />
        </Modal>

        <Modal
          title="修改分类"
          visible={updateCategoryVisible}
          onOk={this.updateCategory}
          onCancel={this.hidden("updateCategory")}
          width={300}
        >

          {
            /*
              wrappedComponentRef方法：
              获取子组件实例对象中form属性，收集子组件form表单中校验成功
              的数据，将数据添加至列表中
            */
          }

          {/*
            将当前组件状态对象中数据的名称在UpdateCategoryForm组件
            中的表单控件中展示{用户点开修改弹框后，
            可以看到在弹框的表单控件中看到当前分类列表中的数据类名}
          */}
          <UpdateCategoryForm
            categoryName={category.name}
            wrappedComponentRef={form => (this.updateCategoryForm = form)}
          />
        </Modal>
      </div>
    )
  }
}

export default Category 