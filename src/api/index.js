// `baseURL` will be prepended to `url` unless `url` is absolute.
//  baseURL: 'https://some-domain.com/api/',

// `headers` are custom headers to be sent
// headers: {'X-Requested-With': 'XMLHttpRequest'},
// 配置一个axios 导出一个配置好的axios
import axios from 'axios'
import store from '@/store'
// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.headers = { Authorization: `Bearer ${store.getUser().toKen}` }
// 导出
export default axios
