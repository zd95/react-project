//将所有的路由组件整合，通过该文件向外部提供接口
import Home from '../components/home'
import Login from '../containers/login'
import NotMatch from '../components/not-match'
import Category from '../containers/category'
import Product from '../components/product'
import ProductForm from '../components/product/product-Form'
import ProductDetail from '../components/product/product-detail'
import Role from '../containers/role'
import User from '../containers/user'
import Line from '../components/basic-layout/charts/line'
import Pie from '../components/basic-layout/charts/pie'
import Bar from '../components/basic-layout/charts/bar'


//设置需要进行权限校验的组件
let Verify = [
  {
    path:'/',
    component:Home,
    exact:true
  },

  {
    path: '/category',
    component: Category,
    exact: true
  },

  {
    path: '/product',
    component: Product,
    exact: true
  },

  {
    path: '/product/add',
    component: ProductForm,
    exact: true
  },

  {
    path: '/product/update/:id',
    component: ProductForm,
    exact: true
  },

  {
    path: '/product/:id',
    component: ProductDetail,
    exact: true
  },

  {
    path: '/user',
    component: User,
    exact: true
  },

  {
    path: '/charts/line',
    component: Line,
    exact: true
  },

  {
    path: '/charts/pie',
    component: Pie,
    exact: true
  },

  {
    path: '/charts/bar',
    component: Bar,
    exact: true
  },

  {
    path: '/role',
    component: Role,
    exact: true
  },

  {
   
    component:NotMatch,
    
  }
]

//设置不需要进行权限校验的组件
const NotVerify = [
  
  {
    path:'/login',
    component:Login,
    exact:true
  },
]

export {
  Verify,
  NotVerify
}