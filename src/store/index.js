// 保持会话状态
// store/index,js 模块  获取用户 设置用户
// 存储信息的时候
// 1 约定信息的key hm-toutiao-77-1-user
// 2 存储信息的值   用户信息对象  字符串格式json
const KEY = 'hm-toutiao-77-1-user'

export default {
  setUser (user) {
    // 存储用户信息到sessionStorage
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    // 获取用户信息从sessionStorage
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  }
}
