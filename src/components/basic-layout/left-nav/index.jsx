import React, { Component } from 'react'
import { Menu, Icon, } from "antd";
import logo from '../../../assets/img/logo.png'
//引入react-i18next 库中的withTranslation对当前组件的语言文本进行切换
import { withTranslation } from 'react-i18next'
import './index.less'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
//引入菜单数据
import menus from '../../../config/menus'


const { SubMenu } = Menu;

//引入withRouter高阶组件，向当前组件传递路由组件特有的三大属性
//获取组件当前的路径
//当前组件经过withTranslation高阶组件转换后，组件会继承其切换语言的属性
@withTranslation()
@withRouter
class LeftNav extends Component {
  static propTypes = {
    isDisplay: PropTypes.bool.isRequired
  };
  // //初始化当前组件的状态
  // state = {
  //   menus: []
  // }
  //将创建菜单的方法进行封装

  createMenus = menus => {
    //提取t方法，实现语言切换
    const { t } = this.props

    //创建菜单
    return menus.map((menu) => {
      //判断菜单是否有子菜单
      if (menu.children) {
        //返回创建后的菜单
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{t(`layout.leftNav.${menu.title}`)}</span>
              </span>
            }
          >
            {/*遍历二级菜单的子菜单，创建菜单*/}
            {menu.children.map(cMenu => this.createCMenus(cMenu))}

          </SubMenu>
        )


      } else {
        //返回创建后的菜单,一级菜单点击跳转link{路由组件}
        return this.createCMenus(menu)
      }
    })
  }

  //将创建一级菜单的方法进行封装
  createCMenus = menu => {
    const { t } = this.props
    return (
      <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{t(`layout.leftNav.${menu.title}`)}</span>
        </Link>
      </Menu.Item>
    )

  }



  //封装一个函数，用来查找当前在页面展示的组件所对应的访问路径
  /*
    该方法接收两个参数：当前组件的路径，与当前路径对应的菜单
  */

  findCurrentPath = (menus, pathname) => {
    //遍历菜单栏，找到与当前在页面展示的组件所对应的访问路径对应的菜单
    for (let index = 0; index < menus.length; index++) {
      //提取每个菜单
      const menu = menus[index];
      //判断菜单是否有子菜单
      if (menu.children) {
        //找到与当前路径对应的菜单
        const cMenu = menu.children.find(cMenu => cMenu.path === pathname);
        //如果cMenu有值，就返回对应的路径
        if (cMenu) {
          return menu.path
        }
      }

    }

  }
  // //当组件被挂载至页面时，将创建的菜单在更新当前组件的状态数据
  // componentDidMount() {
  //   this.setState({
  //     menus: this.createMenus(menus)
  //   })
  // }
  render() {
    const menusList = this.createMenus(menus)
    const { t } = this.props
    //获取当前组件的地址，当刷新浏览器时，让页面继续停留
    const { pathname } = this.props.location

    //获取与当前页面地址对应的菜单地址{/*让与当前页面对应的菜单默认展开*/}
    const openKey = this.findCurrentPath(menus, pathname)


    return (
      <div>
        <div className="layout-logo" >
          <img src={logo} alt="logo" />
          <h1 style={{ display: this.props.isDisplay ? 'block' : 'none' }}>
            {t('layout.leftNav.title')}
          </h1>
        </div>
        <Menu theme="dark"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[openKey]}
          mode="inline">
          {/*当组件被渲染时，将状态对象中接收的数据在页面对应的容器中进行展示*/}
          {/* this.state.menus */}
          {menusList}
        </Menu>
      </div>
    )
  }
}
export default LeftNav