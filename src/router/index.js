// 定义router对象，导出给main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
Vue.use(VueRouter)
const router = new VueRouter({
  // 路由规则配置
//   name给当前路由规则取别名
// 跳转方式有两种$router.push("/login")
// 或者 $router.push({name:'login'})
  routes: [
    {
      path: '/login', name: 'login', component: Login
    },
    //   一级二级路由共享一个地址页面
    {
      path: '/',
      // name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/article',
          name: 'article',
          component: Article
        }
      ]
    },
    // path: '*' 通配路由，从上往下，找不到显示404
    {
      path: '*', name: '404', component: NotFound
    }
  ]
})
export default router
