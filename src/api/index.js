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
export const reqGetProducts = (pageNum, pageSize) => axiosInstance({
  method: 'GET',
  url: '/product/list',
  params: {
    pageNum,
    pageSize
  }
})


//请求添加商品数据
export const reqAddProduct = ({
  name,
  desc,
  categoryId,
  price,
  detail
}) => axiosInstance({
  method: 'POST',
  url: '/product/add',
  data: {
    name,
    desc,
    categoryId,
    price,
    detail
  }
})

//请求获取单个商品的数据
export const reqGetProduct = (productId) => axiosInstance({
  method: 'GET',
  url: '/product/get',
  params: {
    productId
  }
})

//请求修改商品
export const reqUpdateProduct = ({
  name,
  desc,
  categoryId,
  price,
  detail,
  productId
}) => axiosInstance({
  method: 'POST',
  url: '/product/update',
  data: {
    name,
    desc,
    categoryId,
    price,
    detail,
    productId
  }
})

//更新产品状态码
export const reqUpdateProductStatus = (productId, status) => axiosInstance({
  method: 'POST',
  url: '/product/update/status',
  data: {
    productId,
    status
  }

})

//请求 用户搜索的商品
export const reqSearchProducts = ({
  searchType,
  searchValue,
  pageNum,
  pageSize
}) => axiosInstance({
  method: 'GET',
  url: '/product/search',
  params: {
    [searchType]: searchValue,
    pageNum,
    pageSize
  }
})

//请求获取角色数据
export const reqGetRoles = () => axiosInstance({
  method: 'GET',
  url: '/role/get'
})

//请求创建用户角色
export const reqAddRoles = (name) => axiosInstance({
  method: 'POST',
  url: '/role/add',
  data: {
    name
  }
})

//将用户修改的角色权限的记录发送至后台
// export const reqUpdateRoles = ({
//   roleId,
//   authName,
//   menus
// }) => axiosInstance({
//   method: 'POST',
//   url: 'role/update',
//   data: {
//     roleId,
//     authName,
//     menus
//   }
// })
export const reqUpdateRoles = ({
  roleId,
  menus,
  authName
}) => axiosInstance({
  method: 'POST',
  url: '/role/update',
  data: {
    roleId,
    menus,
    authName
  }
})

//向后台请求用户数据
export const reqGetUsers = () => axiosInstance({
  method: 'GET',
  url: '/user/get'
})

//将新创建的用户数据发送至后台
export const reqAddUser = ({
  username,
  password,
  phone,
  email,
  roleId
}) => axiosInstance({
  method: 'POST',
  url: '/user/add',
  data: {
    username,
    password,
    phone,
    email,
    roleId
  }
})