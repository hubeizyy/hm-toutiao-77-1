import Vue from 'vue'
import App from './App.vue'
// 导入与使用element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less'
// 挂载vue实例在任何组件都可发请求
import axios from 'axios'
// @路径别名 绝对路径  在vue-cli创建的项目下才可使用
// 后缀为.js .vue .json  才可默认找前名为index，才可省略index文件
import router from '@/router'
Vue.prototype.$http = axios
Vue.use(ElementUI)
// App根组件
// tip提示信息  在控制台的提示信息
// production 生产环境
// 为false  则表示不按生产环境提示；按照开发提示，开发提示更为详细
Vue.config.productionTip = false

// 创建根实例
new Vue({
  router, // 挂载路由
  // render 渲染函数APP组件
  render: h => h(App)
  // 渲染到哪里 mount是挂载的意思。挂载到#app容器里，再去找#app在哪里
// 以前用el 也是指定挂载的容器；mount（）方法是直接挂载到某个容器上
}).$mount('#app')
