import Vue from 'vue'
import App from './App.vue'
// App根组件
// tip提示信息  在控制台的提示信息
// production 生产环境
// 为false  则表示不按生产环境提示；按照开发提示，开发提示更为详细
Vue.config.productionTip = false
// 创建根实例
new Vue({
  // render 渲染函数APP组件
  render: h => h(App)
  // 渲染到哪里 mount是挂载的意思。挂载到#app容器里，再去找#app在哪里
// 以前用el 也是指定挂载的容器；mount（）方法是直接挂载到某个容器上
}).$mount('#app')
