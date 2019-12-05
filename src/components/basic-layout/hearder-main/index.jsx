//头部布局
import React, { Component } from 'react'
import { Button, Icon, Modal } from 'antd'
import screenfull from 'screenfull'//切换全屏
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
// import dayjs from 'dayjs'
import { removeItem } from '../../../utils/local-storage'
import { delUserSuccess } from '../../../redux/action-creators/user'
//antd组件的语言国际化
import { steLanguageSuccess  } from '../../../redux/action-creators/language'
//向非路由组件传递location
import { withRouter } from 'react-router-dom'
import menus from '../../../config/menus'
import './index.less';

@withRouter
@connect(
  //显示用户名,从store对象中获取当前的用户
  (state) => ({ username: state.user.user.username }),
  { delUserSuccess,steLanguageSuccess }
)
@withTranslation()
class HeaderMain extends Component {
  // 设置时间
  formatDate = date => {
    date = new Date(date);
    const year = date.getFullYear();
    const month = this.addZero(date.getMonth() + 1);
    const day = this.addZero(date.getDate());
    const hours = this.addZero(date.getHours());
    const minutes = this.addZero(date.getMinutes());
    const seconds = this.addZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  // 对时间补零
  addZero = number => {
    if (number < 10) return "0" + number;
    return number;
  };

  state = {
    //切换全屏图标
    isFullscreen: false,
    //切换语言
    isLanguage: this.props.i18n.language === "zh" ? true : false,
    //设置时间
    date: this.formatDate(Date.now()),
    // date: dayjs().format("YYYY--MM--DD HH:mm:ss"),
    title: "",
    pathname: ""
  }

  //切换全屏
  toggleScreen = () => {
    screenfull.toggle();
  }

  //监听全屏的状态，当屏幕切换时，改变图标的状态
  change = () => {
    //全屏图标随之变化
    this.setState({
      isFullscreen: !this.state.isFullscreen
    })
  }


  //退出登录
  logout = () => {
    Modal.confirm({
      title: "您确认要退出登录吗?",
      onOk: () => {
        // 退出登录
        // 清空用户数据（localStorage、redux）
        removeItem("user");
        this.props.delUserSuccess();
        // 跳转到/login页面
        this.props.history.replace("/login");
      }
    });
  };


  //切换语言
  changeLang = () => {
    const isLanguage = !this.state.isLanguage;
    this.setState({
      isLanguage
    })
    //根据当前组建的状态，来切换语言
    const language = isLanguage ? 'zh' : 'en'
    this.props.i18n.changeLanguage(language)
    this.props.steLanguageSuccess(language)
  }
  //组件挂载时，监听屏幕的额变化
  componentDidMount() {
    screenfull.on("change", this.change);
    this.timer = setInterval(() => {
      this.setState({
        date: this.formatDate(Date.now())
        // date: dayjs().format("YYYY--MM--DD HH:mm:ss")
      });
    }, 1000);
  }

  //组件将要卸载时，解除绑定
  componentWillUnmount() {
    screenfull.off("change", this.change);
    clearInterval(this.timer);
  }

  //点击不同的菜单，显示对应的标题，{当前组件内状态对象的变化，不会重新渲染title}
  static getDerivedStateFromProps(nextProps, prevState) {
    // 获取当前组件内部，所展示的菜单的路径
    const { pathname } = nextProps.location
    //如果路径名称和当前状态内部保存的路径名称相同，原样返回，不进行渲染
    if (pathname === prevState.pathname) {
      return prevState
    }

    let title = "";
    //遍历所有的菜单，判断每个菜单所对应的路径
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      //如果菜单中包含子菜单
      if (menu.children) {
        //找到与当前路径相对应的子菜单
        const cMenu = menu.children.find(cMenu =>pathname.startsWith(cMenu.path));
        //如果找到
        if (cMenu) {
          title = cMenu.title;
          break
        }
      } else {
        //如果是一级菜单

        //如果菜单的路径与当前组件状态对象中保存的路径相同
        if (menu.path === pathname) {
          title = menu.title;
          break
        }
      }
    }
    //返回路径名和菜单名
    return {
      pathname,
      title: "layout.leftNav." + title
    }
  }
  render() {
    const { isFullscreen, isLanguage, date, title } = this.state
    const { username, t } = this.props

    // console.log(this.props);
    // console.log(username);

    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.toggleScreen}>
            <Icon type={isFullscreen ? 'fullscreen-exit' : 'fullscreen'} />
          </Button>
          <Button size="small" className="lang-btn" onClick={this.changeLang}>
            {isLanguage ? "中文" : "English"}
          </Button>
          <span>hello,{username}</span>
          <Button size="small" type="link" onClick={this.logout}>
            退出登录
          </Button>
        </div>
        <div className="header-main-bottom">
          <h3>{t(title)}</h3>
          <span>{date}</span>
        </div>
      </div>
    )
  }
}

export default HeaderMain
