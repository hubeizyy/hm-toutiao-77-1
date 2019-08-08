//  频道组件封装
// 本页面实现的功能，此组件与article组件是父子关系。数据不可直接使用。需要实现组件的双向绑定功能  v-model
<template>
  <!-- 频道清空 -->
  <!-- v-model="myValue" 不可使用，双向绑定，但此时为只读 -->
  <!-- 监听下拉框的选择事件 把目前选择的值传给父组件的input事件 -->
  <el-select  :value="value" @change="fn" clearable placeholder="请选择">
    <!-- value 相当于id  作为下拉菜单的唯一标识 -->
    <!-- 3 重新赋值 -->
    <el-option
      v-for="item in channelOptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
<script>
// 计算属性使用场景：当你需要一个新的数据，需要依赖data中的数据
// 侦听器：当需要监听某一个属性的变化，去做一些开销较大的操作【向后台发请求拿数据】；异步操作
// 2 在组件初始化的获取频道下拉选项数据与列表数据
// watch: {
//   // 频道清空
//   // 此处是给后台的传值，要么为数值，要么是无，此处判断为空的情况
//   // 两层结构的监听 属性.  作为方法名
//   'reqParams.channel_id': function (newVal, oldVal) {
//     if (newVal === '') {
//       this.reqParams.channel_id = null
//     }
//   }
// },
export default {
  name: 'my-channel',
  // 接收父组件的属性
  // 实现的接收值
  props: ['value'],

  data () {
    return {
      // myValue: null,
      // 1 频道下拉数据
      channelOptions: []
    }
  },
  created () {
    // 获取频道下拉选项数据
    this.getChannelOptions()
  },
  methods: {
    // 获取下拉菜单方法
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
    // 空字符处理成null
      if (val === '') val = null
      // 子组件改变的值数据提交给父组件使用
      // 提供的改变值
      this.$emit('input', val)
    }
  }
}
</script>
<style scoped lang="less" >
</style>
