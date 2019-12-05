//引入请求设置
import {
  reqGetCategories,
  reqAddCategory,
  reqUpdateCategory,
  reqDelCategory
} from '../../api'

//引入处理数据的操作类型
import {
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DEL_CATEGORY_SUCCESS
} from '../action-types/category'



//获取分类数据的action-creators{记录处理数据的操作类型及具体数据，生成action对象}
const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  data: categories
})


//异步方法发送请求{获取分类列表}
export const getCategoriesAsync = () => {
  return (dispatch) => {
    //等数据响应成功，调用dispatch方法生成的状态数据对象，保存至store对象中
    return reqGetCategories()
      .then((response) => {
        dispatch(getCategoriesSuccess(response))
      })
  }
}

//收集表单中需要添加的数据，生成action对象
const addCategorySuccess = (category) => ({
  type: ADD_CATEGORY_SUCCESS,
  data: category
})


//向分类列表中添加数据{等数据响应成功，将数据保存至redux中}
export const addCategoryAsync = (categoryName) => {
  return (dispatch) => {
    //等请求响应成功，调用dispatch创建对应的store对象
    return reqAddCategory(categoryName)
      .then((response) => {
        dispatch(addCategorySuccess(response))
      })
  }
}

//更新分类列表中的数据

//接收更新表单控件中更新的数据，生成action 对象 
const updateCategorySuccess = (category) => ({
  type: UPDATE_CATEGORY_SUCCESS,
  data: category
})

//更新分类列表中的数据{同时更新后台数据库及redux}
export const updateCategoryAsync = (categoryId, categoryName) => {
  //等数据响应成功，调用dispatch方法将收集的action对象创建为对应的store对象
  return (dispatch) => {
    // 将用户在对应的表单控件中输入的数据发送至后台，更新数据库
    return reqUpdateCategory(categoryId, categoryName)
      .then((reponse) => {
        dispatch(updateCategorySuccess(reponse))
      })
  }
}


//删除分类列表中的数据
  //  接收用户想要删除的数据，生成对应的action对象
const delCategorySuccess=(categoryId)=>({
  type:DEL_CATEGORY_SUCCESS,
  data:categoryId
})

//删除分类列表中的数据
export const delCategoryAsync = (categoryId)=>{
  //等数据响应成功，掉用dispatch方法将响应数据生成store对象
  return (dispatch)=>{
    //等待响应数据成功
    return reqDelCategory(categoryId)
      .then((response)=>{
        //调用dispatch
        dispatch(delCategorySuccess(response))
      })
  }
}