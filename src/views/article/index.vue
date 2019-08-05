<template>
  <div class="container">
    <!-- 筛选条件 -->
    <el-card>
      <div slot="header">
      <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <!-- value 相当于id  作为下拉菜单的唯一标识 -->
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <!-- 1插槽内容 -->
    <!-- <my-test>content</my-test>
    <my-test>内容</my-test> -->
    <!-- 2不写时默认 后备内容，也就是slot内的内容 -->
    <!-- <my-test></my-test> -->
    <!-- 3具名插槽 -->
    <!-- <my-test>
      <div slot="content">content</div>
      <div slot="footer">footer</div>
    </my-test> -->
    <!-- 作用域插槽 -->
    <!-- <my-test> -->
      <!-- 在此插槽上可以接收content插槽上所有自定义的属性的集合 -->
 <!-- <div slot="content" slot-scope="scope" >content 得到组件内部数据：{{scope.msg}}</div> -->
    <!-- 以上为2.6.0之前的写法 -->
    <!-- <template v-slot:content="scope">content 得到组件内部数据：{{scope.msg}}</template> -->
    <!-- </my-test> -->

  </div>
</template>
<script>
// 局部组件
// import MyTest from '@/components/my-test'
// import MyBread from '@/components/my-bread'
export default {
  // created () {
  //   this.$http.get('articles').then(res => {
  //     console.log(res.data)
  //   })
  // }
  // components: {
  //   'my-test': MyTest,
  //   'my-bread': MyBread
  // },
  data () {
    return {
      // 筛选项表单数据，提交给后台参数
      reqParams: {
        status: null, // 默认值为全选中
        channel_id: null
      },
      // 频道下拉数据
      channelOptions: [{ value: 1, label: 'js' }],
      // 日期数据
      dateArr: []
    }
  }
}
</script>
<style scoped lang="less" >
</style>
