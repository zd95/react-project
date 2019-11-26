import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { connect } from 'react-redux'
//引入异步方法发送请求并将响应数据保存至store对象中
import { getUserAsync } from '../../redux/action-creators/user'
import { setItem } from '../../utils/local-storage'//持久化存储token
import withCheckLogin from '../with-check-login'

//引入axios,发送Ajax请求
//import { reqLogin } from '../../api'

//引入图片
import logo from '../../assets/img/logo.png'

//引入样式
import './less/index.less'

const { Item } = Form;

@withCheckLogin
@connect(null, { getUserAsync })
@Form.create()
class Login extends Component {
  //getFieldDecorator方法第一次调用时传入表单控件对应的id ，{表单数据的验证规则}
  //设置表单校验函数
  //接收三个参数
  /*
    rule:表单的控件
    value:控件内接收的数据
    callback:回调函数
         callback直接调用，不传参数，表示验证通过，
         传参：错误原因
  */
  validator = (rule, value, callback) => {


    //提取传入的表单控件的名称字段,并设置与字段对应的提示信息
    const name = rule.field === 'username' ? '用户名' : '密码'

    //当登录按钮被点击时，判断表单控件中是否有用户输入的数据
    if (!value) {//如果没有值
      // 显示提示
      callback(`请输入${name}`)
    } else if (value.length < 4) {
      callback(`${name}长度不能小于4位`)
    } else if (value.length > 11) {
      callback(`${name}长度不能大于11位`)
    } else if (!/\w/.test(value)) {
      callback(`${name}只能输入汉字`)
    } else {
      callback()
    }
  }

  //校验表单数据
  checkLoginFn = e => {
    //禁止表单跳转页面
    e.preventDefault()
    // 当用户在表单控件中输入的数据符合校验规则,点击登录按钮时
    //将用户输入的数据发送至后台进行匹配

    //           验证字段
    const { form, form: { validateFields } } = this.props


    //   将用户输入的数据，及error传入该方法
    validateFields((err, values) => {
      //如果用户在表单控件中输入的数据符合校验规则
      if (!err) {
        console.log(values);
        const { username, password } = values;
        //  将用户输入的数据发送至后台进行匹配
        this.props
          .getUserAsync(username, password)
          .then((response) => {
            console.log(response);
            
            // //判断后台响应的数据
            // if (response.data.status === 0) {
            //   //利用路由组件三大属性中的history，显示对应的页面{组件}
            //   this.props.history.push('/')
            // } else {
            //   //如果用户输入的数据与后台匹配不成功，提示错误信息
            //   message.error(response.data.msg);
            //   //清空密码框
            //   //调用form.resetfields方法，将需要重置的表单控件传入
            //   form.resetFields(['password'])
            // }
            setItem("user", response)
            this.props.history.push('/')
          })
          .catch((err) => {
            // message.error("网络出现故障~，请稍后再拨")
            form.resetFields(['password'])

          })
      }
    })
  }


  render() {
    /*
     将login组件传入form.create 方法中，
     经过Form.create包装的组件会继承Form.props.form属性，
     组件调用该属性中的方法可以实现表单数据的双向传递
     */
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" className="box-shadow" />
          <h1 className="theme">React项目：后台管理系统</h1>
        </header>
        {/*登录区域*/}
        <section className="login-section">
          <h3 className="theme">用户登录</h3>
          <Form onSubmit={this.checkLoginFn}>
            <Item>
              {/*将表单控件传入 getFieldDecorator方法中，实现数据的双向交互*/}
              {
                getFieldDecorator(
                  'username',
                  {
                    rules: [
                      {
                        validator: this.validator
                      }
                    ]
                  }
                )(
                  <Input
                    prefix={<Icon type="user" className="login-icon" />}
                    placeholder="用户名"
                  />
                )
              }
            </Item>
            <Item>
              {
                getFieldDecorator(
                  'password',
                  {
                    rules: [
                      {
                        validator: this.validator
                      }
                    ]
                  }
                )(
                  <Input
                    prefix={<Icon type="lock" className="login-icon" />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-btn">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}

//通过Form表单中的create方法来设置表单的校验
//Form.creat()()是一个高阶组件，可以给组件传递form属性

/*
  经过Form.create包装的组件会继承Form.props.form属性，
  组件调用该属性中的方法可以实现表单数据的双向传递
*/
//将login组件过过水
// connect(null, { getUserAsync })(Login)
//jianglogin组件传入form.create方法中，实现属性的双向传递
export default Login