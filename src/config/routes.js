//将所有的路由组件整合，通过该文件向外部提供接口
import Home from '../components/home'
import Login from '../components/login'
import NotMatch from '../components/not-match'


export default [
  {
    path:'/',
    component:Home,
    exact:true
  },
  {
    path:'/login',
    component:Login,
    exact:true
  },
  {
   
    component:NotMatch,
    
  }


]