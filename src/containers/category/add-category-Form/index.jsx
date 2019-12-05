//创建表单组件 收集用户输入的数据，并将数据添加至页面对应的容器中{添加分类}

import React, { Component } from 'react'

import { Form, Input } from 'antd';



@Form.create()
class AddCategoryForm extends Component {
  //经过@Form.create()包装后的组件会继承Form.props.form属性，实现组件之间表单数据的双向传递
  //获取form属性中的 getFieldDecorator方法,来进行表单校验，
  //getFieldDecorator方法第一次调用时，        第二次传入需要校验的组件
  //传入表单控件对应的id，{表单的校验规则}
  /* rule:表单的控件
    value:控件内接收的数据
    callback:回调函数
         callback直接调用，不传参数，表示验证通过，
         传参：错误原因 
         
         validator = (rule, value, callback) => {}
         */
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <Form.Item label="品类名称">
          {
            getFieldDecorator(
              "categoryName",
              {
                rules: [{ required: true, message: "请输入分类名称" }]
              }
            )(<Input placeholder="请输入分类名称" />)
          }

        </Form.Item>
      </Form>
    )
  }
}


export default AddCategoryForm