//将所有的路由组件整合，通过该文件向外部提供接口
import Home from '../components/home'
import Login from '../containers/login'
import NotMatch from '../components/not-match'
import Category from '../containers/category'
import Product from '../components/product'


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