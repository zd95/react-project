//当前组件负责表单校验
/*
  用户点击创建角色按钮，当前组件负责校验用户输入的数据
*/

import React, { Component } from 'react'
import { Form, Input } from 'antd';

const Item = Form.Item;

@Form.create()
class AddRoleForm extends Component {


  render() {

    const { getFieldDecorator } = this.props.form
    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
        <Item label="角色名称">
          {
            getFieldDecorator('name', {
              rules: [{ required: true, message: "请输入角色名称" }]
            })(<Input placeholder="请输入角色名称" />)
          }
        </Item>
      </Form>
    )
  }
}

export default AddRoleForm