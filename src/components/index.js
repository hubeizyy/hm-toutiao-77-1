// 注册所有components下的组件为全局组件
import MyTest from '@/components/my-test'
import MyBread from '@/components/my-bread'
import Mychannel from '@/components/my-channel'
import MyImage from '@/components/my-image'

// vue插件 暴露一个对象  对象有一个选项  install 安装
export default {
  install (Vue) {
    // 安装函数  当Vue.use(使用插件) install被调用
    Vue.component(MyTest.name, MyTest)
    Vue.component(MyBread.name, MyBread)
    Vue.component(Mychannel.name, Mychannel)
    Vue.component(MyImage.name, MyImage)
  }
}
