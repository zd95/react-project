//定义高阶组件，将用户登陆过的数据传递给需要的组件，登录认证
//将页面{各个组件}设置为只允许登陆过的用户访问


import React, {
  Component
} from "react";
import {
  connect
} from "react-redux";
import {
  Redirect
} from "react-router-dom";


//                    传入组件
const withCheckLogin = (WrappedComponent) => {


  //调用该函数，返回一个经过connect方法加工处理后的组件
  //       将状态数据对象以及创建状态数据的方法传递给目标组件
  return connect(
    state => ({ token: state.user.token }),
    null
  )(
    /*
      设置一个处理目标组件的组件，根据传入的组件的不同，
      对connect方法传递的数据做出不同的处理，
      然后将数据传递给目标组件，
      将加工处理后的目标组件返回
    */

    class extends Component {
      //目标组件的名字进行标注，{高阶组件}
      static displayName = `approveHOC(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        "Component"})`;
      //对目标组件进行加工处理，在render方法外部的设置，添加至目标组件时，要加this
      //render方法内部设置，可以使用路由组件
      render() {
        /*
          判断用户在页面中的访问路径
          如果用户访问的是登录页面{this.props.loacltion.path}
                  登陆过：直接跳转至默认路径      {redux中保存的用户数据；{token]}}
                  没登陆过：不进行跳转



          如果访问的是非登录页面：
                   登陆过：不进行跳转
                   没登陆：转去登录  /login     
                   
                   
                 location/history/match是路由组件的三大属性，其他组件默认没有
          路由组件指通过Route加载的组件  
        */



        //提取connect传入的状态数据
        const {
          token,
          location,
          ...rest//将其他数据设置为目标组件的标签属性
        } = this.props;
        // console.log(this.props);
        //如果用户在登录页面/login
        if (location.pathname === "/login") {
          //有token，说明登陆过
          if (token) {
            //跳转至ViP
            return <Redirect to="/" />
          }

        } else {
          //如果不在登录页面,且没有token
          if (!token) {
            return <Redirect to="/login" />
          }

        }

        //将处理后的数据设置为目标组件的标签属性，返回加强版的组件
        return <WrappedComponent location={location}  {...rest} />

      }

    }
  )
}

//向外部提供接口
export default withCheckLogin