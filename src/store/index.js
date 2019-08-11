// 保持会话状态
// store/index,js 模块  获取用户 设置用户
// 存储信息的时候
// 1 约定信息的key hm-toutiao-77-1-user
// 2 存储信息的值   用户信息对象  字符串格式json
const KEY = 'hm-toutiao-77-1-user'

export default {
  setUser (user) {
    // 存储用户信息到sessionStorage
    // 现在实现的只是：给什么存什么，完整存储
  //   window.sessionStorage.setItem(KEY, JSON.stringify(user))
  // },
  // 现在需要实现的是，局部修改某一个属性
    const localUser = this.getUser() // 如果登录时候使用{}空对象  或者有对象{id,name,photo,token,refresh_token} 完整信息
    // 新的对象  本地获取的和后传入的信息的合并
    const newUser = { ...localUser, ...user }
    // 2 - 更新本地存储用户信息
    window.sessionStorage.setItem(KEY, JSON.stringify(newUser))
  },
  getUser () {
    // 获取用户信息从sessionStorage
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  // 清除用户信息
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
