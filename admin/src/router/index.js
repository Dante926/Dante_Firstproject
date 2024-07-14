import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'
import RoutesConifg from './config'
import store from '../store/index'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: MainBox,

    // MainBox的嵌套路由(孩子路由),后面根据权限动态添加(router.addRoute方法完成)
    children:[

    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 根据需求动态添加路由
/* 
  建议把孩子路由放到数组中,到时加载时再调用addRouter方法,动态的把每个孩子路由添加进来...
*/

// 路由拦截(每次路由跳转之前都会执行这个回调函数)
router.beforeEach((to,from,next)=>{
  // to.name是要跳转的页面
  if(to.name==='login'){
    next()
  }else{
    // 如果已授权(已经登录过了则next())
    // 如果未授权,则重定向到login
    if(!localStorage.getItem('token')){
      next({
        path:'/login' // 重定向到login
      })
    }else{
      // 如果已授权,但未加载过路由,则加载路由
      if(!store.state.isGetterRouter){
        ConfigRouter()
        // 如果不在这里添加next(),那么浏览器执行完ConfigRouter()后,会原地加载所有子路由但不跳转，如果重新刷新页面,则又会跳转到login页面，所以我们要设置next(),并且再里面判断是否为第一次进入.
        // 如果是第一次进入,则执行ConfigRouter()并且改变'第一次进入'这个状态变成不是第一次进入,此时再进行 if(!store.state.loginStatus)判断则直接next()放行
        next({
          path:to.fullPath // 跳转到之前要跳转的页面
        })
      }else{
        next()
      }
    }
  }
})

const ConfigRouter=()=>{
  RoutesConifg.forEach(item => {
    router.addRoute('mainbox',item)
  })

  //改变第一次进入路由状态
  store.commit('changGetterRouter',true)
}

export default router