import {
  GET_USER_SUCCESS,
  DELETE_USER_SUCCESS
} from '../action-types/user'

import {
  getItem
} from '../../utils/local-storage'

//获取localStorage中保存的用户数据，如果没有，设置一个空对象
const initUser = getItem('user') || {};

function user(preveState = initUser, action) {


  switch (action.type) {
    case GET_USER_SUCCESS:
      return action.data;
    case DELETE_USER_SUCCESS:
      return {};

    default:
      return preveState
  }
}
export default user