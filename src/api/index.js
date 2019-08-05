// `baseURL` will be prepended to `url` unless `url` is absolute.
//  baseURL: 'https://some-domain.com/api/',

// `headers` are custom headers to be sent
// headers: {'X-Requested-With': 'XMLHttpRequest'},
// 配置一个axios 导出一个配置好的axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers = { Authorization: `Bearer ${store.getUser().toKen}` }
// 请求拦截器，在每次请求前 做某一件事
// 请求拦截器：在每次请求前 做某一些事情
axios.interceptors.request.use((config) => {
  // 修改config
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (error) => {
  // 错误处理
  return Promise.reject(error)
})
// 响应拦截器：在每次响应后 做某一些事情
axios.interceptors.response.use((res) => {
  // 成功的时候做一些事情
  return res
}, (err) => {
  // 失败的时候做一些事情
  // 获取响应状态码 err对象包含响应对象  err.response
  // 响应对象中包含状态码  err.response.status
  if (err.response.status === 401) {
    // 跳转到登录页面 this.$router.push('/login')
    // 方式1：
    // $router.push('/login') 其实 地址栏改成  #/login
    // location.hash = '#/login'
    // 方式2：
    // 此时没有vue实例，$router对象获取不到，通过router实例直接使用
    router.push('/login')
  }
  return Promise.reject(err)
})
// 导出s
export default axios

/*

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

*/
