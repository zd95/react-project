import {
  reqGetRoles,
  reqAddRoles,
  reqUpdateRoles
} from '../../api'
import {
  GET_ROLES_SUCCESS,
  ADD_ROLES_SUCCESS,
  UPDATE_ROLES_SUCCESS
} from '../action-types/roles'


//接收请求的角色数据
const getRolesSuccess = (roles) => ({
  type: GET_ROLES_SUCCESS,
  data: roles
})

//当请求的角色数据响应成功，将数据保存至redux中
export const getRolesAsync = () => {
  return (dispatch) => {
    return reqGetRoles()
      .then(res => {
        //等数据响应成功，将数据保存至redux中
        dispatch(getRolesSuccess(res))
      })
  }
}

//创建角色数据
const addRolesSuccess = (role) => ({
  type: ADD_ROLES_SUCCESS,
  data: role
})


//将创建的角色数据保存至redux中
export const addRolesAsync = (name) => {
  return (dispatch) => {
    return reqAddRoles(name)
      .then((res) => {
        dispatch(addRolesSuccess(res))
      })
  }
}


//用户修改角色权限
//标记用户操作数据的类型，记录用户操作的具体数据
const updateRolesSuccess = (role) => ({
  
  type: UPDATE_ROLES_SUCCESS,
  data: role
})
//将用户修改角色权限的数据保存至redux中
export const updateRolesAsync = ({
  roleId,
  authName,
  menus
}) => {
  //等数据响应成功，调用dispatch方法将返回的数据保存至redux中
  return (dispatch) => {
    return reqUpdateRoles({
        roleId,
        authName,
        menus
      }).then((res) => {
        console.log(res);
        dispatch(updateRolesSuccess(res))
      })
  }
}