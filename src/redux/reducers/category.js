//引入处理数据的操作类型
import {
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DEL_CATEGORY_SUCCESS
} from '../action-types/category'




//设置一个初始值
const initState = [];

//根据数据的操作类型来生成最终状态的状态数对象，并将其=保存至store对象中
function categories(prevState = initState, action) {
  //判断处理数据的操作类型
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      //返回具体的数据
      return action.data;
    case ADD_CATEGORY_SUCCESS:
      //在原数据的基础上添加用户创建的数据
      return [...prevState, action.data];

    case UPDATE_CATEGORY_SUCCESS:
      //遍历当前redux对象中对应的状态数据，与将要更新的数据进行对比
      //如果数据的id可以匹配，就更新该id对应的数据名称{categoryName}
      return prevState.map((category) => {
        if (category._id === action.data._id) {
          return action.data
        }
        //如果没有就返回之前的数据
        return category
      });

    case DEL_CATEGORY_SUCCESS:
      //获取用户需要删除的数据的id，与当前状态中的数据进行对比，将结果返回
      //filder方法保留符合条件的数据{保留不等于action._id的数据}
      return prevState.filter((category)=> category._id !== action.data)
    default:
      return prevState
  }

}


export default categories