//当前组件负责设置角色权限


import React, { Component } from 'react'
import { Card, Button, Table, Radio, Modal, message } from 'antd'

import dayjs from 'dayjs'
import AddRoleForm from './add-role-Form'
import UpdateRoleForm from './update-role-Form'
import { connect } from 'react-redux'
import { 
  getRolesAsync, 
  addRolesAsync,
  updateRolesAsync
 } from '../../redux/action-creators/roles'


 const RadioGroup = Radio.Group;



@connect(state => ({ roles: state.roles, username: state.user.user.username }),
  { getRolesAsync, addRolesAsync, updateRolesAsync }
)
class Role extends Component {

  state = {
    //记录单选按钮的状态{每个单选按钮对应一个所创建的角色的id}
    value: "",
    //记录设置用户权限的按钮的显示状态
    isDisabled: true,
    //创建角色的弹框的显示状态
    addRoleModalVisible: false,
    //更新角色的弹框的按钮的显示状态
    updateRoleModalVisible: false,

  }



  columns = [
    {
      dataIndex: '_id',
      render: id => <Radio value={id} />
    },

    {
      title: "角色名称",
      dataIndex: 'name'
    },

    {
      title: "创建时间",
      dataIndex: 'createTime',
      render: time => dayjs(time).format("YYYY-MM-DD HH:mm:ss")
    },

    {
      title: "授权时间",
      dataIndex: 'authTime',
      render: time => time && dayjs(time).format("YYYY-MM-DD HH:mm:ss")
    },
    
    {
      title: "授权人",
      dataIndex: "authName"
    },
  ]

  //用户点击创建角色按钮,弹出弹框
  switchRolesModal = (key, value) => {
    return () => {
      this.setState({
        [key]: value
      })
    }
  }
  //用户创建角色
  addRole = () => {
    // 提取子组件AddRoleForm中用户输入的数据
    const form = this.addRoleForm.props.form
    form.validateFields(async (err, values) => {
      if (!err) {
        //提取创建角色的名称，将其发送至后台
        const { name } = values
        await this.props.addRolesAsync(name)
        //等角色数据创建成功
        message.success("创建角色成功~~")

        //清空表单
        form.resetFields()
        //隐藏当前弹框
        this.setState({
          addRoleModalVisible: false
        })
      }
    })
  }

  //用户修改角色权限
  updateRole = () => {
    //提取UpdateRoleForm组件中用户输入的符合校验规则的数据
    const from = this.updateRoleForm.props.form
    // 将数据发送至后台，对用户创建的角色数据进行记录
    from.validateFields(async (err, values) => {
      console.log(values);
      
      if (!err) {
        //提取当前创建的角色的id值
        const roleId = this.state.value
        //提取当前角色有权访问的菜单选项卡
        const { menus } = values
        //提取被添加至当前角色中的用户
        const authName = this.props.username;
        //将数据发送至 后台保存记录
        await updateRolesAsync({ roleId, menus, authName });
        //等数据响应成功
        message.success("角色权限更新成功~~~")
        //清空表单数据
        from.resetFields()
        //隐藏弹框
        this.setState({
          updateRoleModalVisible: false
        })
      }
    })
  }


  //监听单选框的变化
  // onRadioChange = (e) => {
  //   console.log("radio checked", e.target.value);
  //   //如果单选按钮被选中，设置用户权限的按钮显示
  //   this.setState({
  //     value: e.target.value,
  //     isDisabled: false
  //   })
  // }

  onRadioChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
      isDisabled: false
    });
  };

  //如果当前组件中保存的角色数据的值为空，向后台请求对应的角色数据
  componentDidMount() {
    if (!this.props.roles.length) {
      this.props.getRolesAsync()
    }
  }
  render() {
    const {
      value,
      isDisabled,
      addRoleModalVisible,
      updateRoleModalVisible,
    } = this.state;

    //提取组件中创建的所有角色
    const { roles } = this.props
    console.log(roles);
    
    

    //提取用户选中的角色
    const role = roles.find(role => role._id === value)
    console.log(role);
    console.log(value);
    return (
      <Card
        title={
          <div>
            <Button
              type="primary"
              onClick={this.switchRolesModal("addRoleModalVisible", true)}
            >
              创建角色
            </Button>
            &nbsp;&nbsp;
            <Button
              type="primary"
              disabled={isDisabled}
              onClick={this.switchRolesModal("updateRoleModalVisible", true)}
            >
              设置角色权限
            </Button>
          </div>
        }
      >
        <RadioGroup
          onChange={this.onRadioChange}
          value={value}
          style={{ width: "100%" }}
        >
          <Table
            columns={this.columns}
            dataSource={roles}
            bordered
            rowKey="_id"
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15", "20"],
              showQuickJumper: true
            }}
          />
        </RadioGroup>
        <Modal
          title="创建角色"
          visible={addRoleModalVisible}
          onOk={this.addRole}
          onCancel={this.switchRolesModal("addRoleModalVisible", false)}
        >
          <AddRoleForm
            wrappedComponentRef={form => (this.addRoleForm = form)}
          />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={updateRoleModalVisible}
          onOk={this.updateRole}
          onCancel={this.switchRolesModal("updateRoleModalVisible", false)}
        >
          <UpdateRoleForm
            wrappedComponentRef={form => (this.updateRoleForm = form)}
            role={role}
          />
        </Modal>
      </Card>
    )
  }
}

export default Role