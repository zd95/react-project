//当前组件负责接收及校验创建用户时输入的数据

import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from "prop-types";

const Item = Form.Item
const Option = Select.Option;

@Form.create()
class AdduserForm extends Component {

  static propTypes = {
    roles: PropTypes.array.isRequired
  };

  render() {
    //设置当前组建的容器样式
    ////提取当前组件标签属性中角色分类的数据，将其处理后添加至对应的容器中
    const {
      form: { getFieldDecorator },
      roles
    } = this.props
    console.log(this.props.form);
    // const { getFieldDecorator } = this.props.form;
    // const { roles } = this.props;
   
    
    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
        <Item label="用户名">
          {
            getFieldDecorator("username")(<Input placeholder="请输入用户名" />)
          }
        </Item>
        <Item label="密码">
          {
            getFieldDecorator("password")(
              <Input placeholder="请输入密码" type="password" />)
          }
        </Item>
        <Item label="手机号">
          {getFieldDecorator("phone")(<Input placeholder="请输入手机号" />)}
        </Item>
        <Item label="邮箱">
          {getFieldDecorator("email")(<Input placeholder="请输入邮箱" />)}
        </Item>
        <Item label="角色分类">
          {getFieldDecorator("roleId")(
            <Select placeholder="请选择分类">
              {/*遍历分类列表中的数据，将其添加至对应的下拉项中*/}
              {
                roles.map(role => {
                  return (
                    <Option key={role._id} value={role._id}>
                      {role.name}
                    </Option>
                  )
                })
              }
            </Select>
          )}
        </Item>
      </Form>
    )
  }
}

export default AdduserForm
