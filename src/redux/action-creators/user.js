//将action-creators文件进行模块化，
//将该文件内部接收用户操做数据的方法进行区分
//一个方法对应一个文件，避免git冲突

//引入登录请求，提取响应数据，保存至store对象中
import {
  reqLogin
} from '../../api'
import {
  GET_USER_SUCCESS,
  DELETE_USER_SUCCESS
} from '../action-types/user'


//定义接收当前响应数据的方法，将响应的数据生成action对象

// 同步
const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  data: user
})

//如果token失效或者不合法，调用该方法清空store对象中保存的token
export const delUserSuccess = () => ({
  type: DELETE_USER_SUCCESS
})
//等数据响应成功，调用dispatch，生成新的状态数据保存至store对象中
//                 将通过校验的用户信息传入
export const getUserAsync = (username, password) => {
  return (dispatch) => {
    //等数据响应成功，调用dispatch，生成新的状态数据保存至store对象中
    //      请求登录,携带用户的数据
    return reqLogin(username, password)
      .then((response) => {
        //接收响应成功的数据，创建action对象
        const action = getUserSuccess(response);
        //调用dispatch方法，生成新的状态数据
        dispatch(action)
        //将响应的数据返回，继续传递
        return response
      })
  }
}