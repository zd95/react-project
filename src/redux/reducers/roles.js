import {
  GET_ROLES_SUCCESS,
  ADD_ROLES_SUCCESS,
  UPDATE_ROLES_SUCCESS
} from '../action-types/roles'

const initValue = [];

//根据用户处理数据的操作类型，对用户输入的数据进行处理
function roles(prevState = initValue, action) {
  switch (action.type) {
    case GET_ROLES_SUCCESS:
      return action.data;
    case ADD_ROLES_SUCCESS:
      return [...prevState, action.data];

    case UPDATE_ROLES_SUCCESS:
      //提取用户操作的角色，将用户对该角色更新操作后的数据替换掉该角色更新之前的数据
      //并将其保存至redux中
      return prevState.map(role => {
        if (role._id === action.data._id) {
          return action.data
        }

        return role
      })

    default:
      return prevState
  }
}

export default roles