//
// 当前组件负责对用户数据的管理

import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { reqGetUsers, reqAddUser } from '../../api'
import { getRolesAsync } from '../../redux/action-creators/roles'

import AddUserForm from './add-user-Form'
import UpdateUserForm from './update-user-Form';


@connect(state => ({ roles: state.roles }), { getRolesAsync })
class User extends Component {
  // 用当前组件的状态对象来接收、管理及响应用户在该组件所对应的页面容器中
  //操作的数据
  state = {
    users: [],
    //记录添加用户弹框的显示状态
    addUserModalVisible: false,
    //记录更新用户数据的弹框的显示状态
    updateUserModalVisible: false

  }

  //设置表头数据
  columns = [
    {
      title: "用户名",
      dataIndex: "username"
    },
    {
      title: "邮箱",
      dataIndex: "email"
    },
    {
      title: "电话",
      dataIndex: "phone"
    },
    {
      title: "注测时间",
      dataIndex: "createTime",
      render: time => dayjs(time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: "所属角色",
      dataIndex: "roleId",
      render: (id) => {
        //提取用户选中的角色，
        const role = this.props.roles.find(role => {
          return role._id === id
        })
        //如果选中的角色存在于所创建的角色列表中，将当前角色的类名在
        //当前组件对应的容器中进行渲染
        return role && role.name
      }
    },
    {
      title: "操作",
      render: (_user) => {
        return (
          <div>
            <Button type="link" onClick={() => { }}>
              修改
            </Button>
            <Button type="link" onClick={() => { }}>
              删除
            </Button>
          </div>
        )
      }
    }
  ]


  //处理弹框的显示状态
  switchUserModal = (key, value) => {
    return () => {
      this.setState({
        [key]: value
      })
    }
  }

  //将创建的用户数据发送至后台
  addUserFn = () => {
    //提取负责创建用户的表单组件中对应的数据
    const form = this.addUserForm.props.form;
    form.validateFields(async (err, values) => {
      if (!err) {
        //将创建的用户数据发送至后台,并将返回的响应数据在页面中实时渲染
        const result = await reqAddUser(values);
        //用当前组件的状态对象来接收响应的数据
        this.setState({
          //隐藏弹框
          addUserModalVisible: false,
          users: [...this.state.users, result]
        })
        message.success("用户创建成功");
        form.resetFields()

      }
    })
  }
  //向后台请求用户数据
  componentDidMount() {
    reqGetUsers().then(res => {
      this.setState({
        //用当前组件的状态对象来接收将响应的数据
        users: res
      })
    });
    //如果当前组件所需要的角色列表中没有数据，向后台请求对应的数据
    if (!this.props.roles.length) {
      this.props.getRolesAsync()
    }
  }
  render() {
    // 将当前组件状态对象中接收及管理的数据展示于对应的容器中
    const { users, addUserModalVisible, updateUserModalVisible } = this.state
    console.log(users);
    
    return (
      <Card
        title={
          <Button
            type="primary"
            onClick={this.switchUserModal("addUserModalVisible", true)}
          >
            创建用户
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={users}
          bordered
          rowKey="_id"
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            showQuickJumper: true
          }}
        />

        <Modal
          title="创建用户"
          visible={addUserModalVisible}
          onOk={this.addUserFn}
          onCancel={this.switchUserModal("addUserModalVisible", false)}
        >
          <AddUserForm
            wrappedComponentRef={form => (this.addUserForm = form)}
            roles={this.props.roles}
          />
        </Modal>

        <Modal
          title="更新用户数据"
          visible={updateUserModalVisible}
          onOk={this.updateUserFn}
          onCancel={this.switchUserModal("updateUserModalVisible", false)}
        >
          <UpdateUserForm />
        </Modal>
      </Card>
    )
  }
}
export default User