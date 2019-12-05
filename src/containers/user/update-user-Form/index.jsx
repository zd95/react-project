import React, { Component } from 'react'
import { Form, Input, Select } from "antd";

const Item = Form.Item;
const Option = Select.Option;

@Form.create()
class UpdateUserForm extends Component {
  render() {
    //校验及处理当前表单中的数据
    const { getFieldDecorator } = this.props.form
    
    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
        <Item label="用户名">
          {
            getFieldDecorator("username",{initialValue:''})
          }

        </Item>
      </Form>
    )
  }
}


export default UpdateUserForm