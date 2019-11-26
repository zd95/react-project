//封装Ajax请求
//创建一个axios的实例对象,设置共用的请求头参数
import axios from 'axios'
import {
  message
} from 'antd'
import codeMessage from '../config/code-message';
import store from '../redux/store'
//引入localstorage文件，删除其保存token
import { removeItem } from '../utils/local-storage'
//引入action-creators,当token不合法时，清空store对象中的token  ---》reducers
import { delUserSuccess } from '../redux/action-creators/user'
import history from '../utils/history'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  header: {
    // 初始化请求头参数,根据不同的请求方式来设置不同的请求头参数
  }

})

//设置请求拦截器
axiosInstance.interceptors.request.use(
  //获取当前请求所配置的具体数据,根据需求对其进行处理
  (config) => {
    //如果请求方式是POST,设置对应的请求头参数
    if (config.method === 'POST') {
      //设置请求数据的数据类型
      config.headers['content-type'] = 'application/x-www-form-urlencode'

      // 将数据转换成与之对应的数据类型
      config.data = Object.keys(config.data).reduce((prev, key) => {
        //提取每个属性中的值
        const value = config.data[key]
        //返回新的数据
        return prev + `${key}=${value}`
      }, '').substring(1)
    }
    // 从redux中读取user数据, 从user中读取token
    const {
      user: {
        token
      }
    } = store.getState();
    if (token) {
      config.headers.authorization = 'Bearer ' + token
    }

    //返回新的请求配置参数
    return config
  }
)

//响应拦截器: 
/*
    当服务器返回响应之后,先对响应中的数据进行判断及处理,
    将处理后的数据在页面对应的容器中对用户进行展示

    提高代码的复用             传入两个回调:成功状态, 失败状态
*/
axiosInstance.interceptors.response.use(
  // 响应成功触发的回调函数（status: [200, 300)）
  // 响应成功之后，用户设置回调函数之前触发
  ({
    data
  }) => {

    // 统一处理：功能成功/失败
    if (data.status === 0) {
      // 返回成功的数据
      return data.data;
    } else {
      // 功能失败
      message.error(data.msg)
      return Promise.reject(data.msg);
    }
  },
  // 响应失败触发的回调函数
  (error) => {
    let errorMessage = '';

    if (error.response) {
      // 说明服务器返回了响应
      errorMessage = codeMessage[error.response.status] || '未知错误';

      //如果后台返回401状态码，说明token失效或者不合法
      if(error.response.status === 401){
        //清空本地缓存的token
        removeItem();
        //清空store对象中保存的token
        store.dispatch(delUserSuccess());
        //跳转至登录页面
        //引入history，创建浏览器的历史记录，并跳转至创建的浏览器历史记录
        history.push('/login')
        
      }

    } else {
      // 说明服务器没有返回响应，请求还没给服务器 / 还没有接受到服务器的响应 请求就终止了
      if (error.message.indexOf('Network Error') !== -1) {
        errorMessage = '请检查网络连接';
      } else if (error.message.indexOf('timeout') !== -1) {
        errorMessage = '网络太卡了，请连上wifi重试';
      } else {
        errorMessage = '未知错误';
      }
    }
    message.error(errorMessage);
    return Promise.reject(errorMessage);
  }
)

export default axiosInstance;