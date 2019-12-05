import React, { Component } from 'react'
import { Form, Tree, Input } from 'antd'
import { withTranslation } from 'react-i18next'
import menus from '../../../config/menus'

import PropTypes from "prop-types";

const Item = Form.Item
const { TreeNode } = Tree
//设置树形控件，{数据在当前组件中的展示结构}
//
const treeData = [
  //遍历所有的菜单选项，将各个菜单添加至当前树形控件对应的容器中

  {
    title: 'root',//每一个树节点的标题
    key: '0',//每个树节点都要设置一个唯一的标识
    children: menus.map(menu => {
      //如果当前的一级菜单有子菜单，遍历子菜单
      if (menu.children) {
        //如果存在子菜单
        return {
          title: menu.title,
          key: menu.path,
          //子菜单还是一个数组，继续使用map方法对其遍历
          children: menu.children.map(cMenu => {
            return {
              title: cMenu.title,
              key: cMenu.path
            }
          })
        }
      } else {
        return {
          //如果没有子菜单，将当前菜单的标题及key值返回
          title: menu.title,
          key: menu.path
        }
      }
    })
  }
];
// const treeData = [
//   {
//     title: "root",
//     key: "0",
//     children: menus.map(menu => {
//       if (menu.children) {
//         return {
//           title: menu.title,
//           key: menu.path,
//           children: menu.children.map(cMenu => {
//             return {
//               title: cMenu.title,
//               key: cMenu.path
//             };
//           })
//         };
//       } else {
//         return {
//           title: menu.title,
//           key: menu.path
//         };
//       }
//     })
//   }
// ];
@withTranslation()
@Form.create()
class UpdateRoleForm extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired
  };
  //设置当前组件中树节点的展示状态
  state = {

    //展开指定的树节点
    expandedKeys: [],
    //是否自动展开父节点
    autoExpandParent: true,
    //选中复选框的对应的树节点，其子节点会全部被选中
    //如果其子节点被全部选中，该节点本啥身也会被选中
    checkedKeys: [],
    //设置选中的树节点
    selectedKeys: [],
  }

  //将树形的数据结构在树形组件对应的结构中进行展示,返回加工后的树形组件
  renderTreeData=(data)=>{
    const { t } = this.props
    return data.map(item=>{
      // 如果当前树形结构的数据有子数据结构，对子数据结构进行加工
      if(item.children){
        return (
          <TreeNode
            title={t("layout.leftNav." + item.title)}
            key={item.key}
            dataRef={item}
          >
            {this.renderTreeData(item.children)}
          </TreeNode>
        )
      }
      return (
        <TreeNode title={t("layout.leftNav." + item.title)} key={item.key}/>
      )
    })
  }
  render() {
    //从父组件传入的role属性中提取角色分类中包含的用户名，
    //以及该用户名所对应有权访问的文件夹
    let { form: { getFieldDecorator }, role: { name, menus } } = this.props;
    // menus = JSON.parse(menus)
    console.log(menus);
    console.log(this.props.role);
    
    return (
      <Form>
        <Item label="角色名称">
          {/*校验用户在的当前表单控件中输入的数据是否符合规则*/}
          {
            getFieldDecorator('name', { initialValue: name })(
              <Input placeholder="请输入角色名称" disabled />
            )
          }
        </Item>

        {/*设置当前用户有权访问的文件夹*/}
        <Item>
          {
            getFieldDecorator("menus", {
              //当复选框被选中的时候，收集当前复选框所对应的菜单，及其子菜单
              trigger: "onCheck",
              //当菜单被选中时，同时也选中该菜单的子菜单
              valuePropName: "checkedkeys",
              initialValue: menus
            })(
              <Tree
                //为当前树节点添加复选框
                checkable
                //默认展开当前属性控件的所有树形节点
                defaultExpandAll
              >
                {/*展示当前组件中树形控件中的数据*/}
                {this.renderTreeData(treeData)}
              </Tree>
            )
          }

        </Item>
      </Form>
    )
  }
}
export default UpdateRoleForm

