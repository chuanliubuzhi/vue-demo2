import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import About from './components/about/About'
import Login from './components/Login'
import Register from './components/Register'

// 二级路由
import Contact from './components/about/Contact'
import Delivery from './components/about/Delivery'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'

// 三级路由
import PersonName from './components/about/contact/PersonName'
import Phone from './components/about/contact/Phone'


export const routes = [
    {path:'/',name:"homeLink",components:{
        default:Home,
        'orderingGuide':OrderingGuide,
        'delivery':Delivery,
        'history':History
    }},
    {path:'/menu',name:"menuLink",component:Menu},
    {path:'/admin',name:"adminLink",component:Admin,
    //   beforeEnter:(to,from,next)=>{
    //   // alert('非登陆状态，请先登录')
    //   // next(false)
    //   // 路由独享的守卫
    //   // if (to.path == '/login'|| to.path == '/register') {
    //   //       next();
    //   //     }else{
    //   //       alert('还没有登录，请先登录！')
    //   //       next('./login')
    //   //     }
    // }
    },
    {path:'/about',name:"aboutLink",redirect:"/about/contact",component:About,children:[
      {path:'/about/contact',name:"contactLink",redirect:"/about/contact/phone",component:Contact,children:[
        {path:'/about/contact/personname',name:"personnameLink",component:PersonName},
        {path:'/about/contact/phone',name:"phoneLink",component:Phone},
      ]},
      {path:'/about/history',name:"historyLink",component:History},
      {path:'/about/delivery',name:"deliveryLink",component:Delivery},
      {path:'/about/orderingGuide',name:"orderingGuideLink",component:OrderingGuide},
    ]},
    {path:'/login',name:"loginLink",component:Login},
    {path:'/register',name:"registerLink",component:Register},
    {path:'*',redirect:'/'}
  
  
  
  ]
  // 全局守卫
// router.beforeEach((to,from,next) =>{
//   // alert('还没有登录， 请先登录！');

//   // next();

//   // 判断stroe.gettes.isLogin ===false
//   // console.log(to)

//   if (to.path==='/login'|| to.path=='/register') {
//     next();
//   }else{
//     alert('还没有登录，请先登录！')
//     next('./login')
//   }
// })

// 后置钩子
// router.afterEach((to,from)=>{
//   alert('afterEach')
// })