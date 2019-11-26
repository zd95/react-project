/*
  用来定义请求方法模块
*/
import axiosInstance from './request';

// 请求登录
export const reqLogin = (username, password) => axiosInstance({
  method: 'POST',
  url: '/login',
  data: {
    username,
    password
  }
});

//请求分类列表相关的数据
export const reqGetCategories = () => axiosInstance({
  method: 'GET',
  url: '/category/get',
})


//请求添加分类数据
export const reqAddCategory = (categoryName) => axiosInstance({
  method: 'POST',
  url: '/category/add',
  data: {
    //发送需要向后台添加的数据
    categoryName
  }

})

//请求更新分类数据
export const reqUpdateCategory = (categoryId, categoryName) => axiosInstance({
  method: 'POST',
  url: '/category/update',
  data: {
    //更新数据的id值
    categoryId,
    //更新数据的名称
    categoryName
  }
})

//请求删除分类数据
export const reqDelCategory = (categoryId) => axiosInstance({
  method: 'POST',
  url: '/category/delete',
  data: {
    categoryId
  }
})


//请求商品列表数据
export const reqGetProducts = (pageNum,pageSize)=>axiosInstance({
  method:'GET',
  url:'/product/list',
  params:{
    pageNum,
    pageSize
  }
})