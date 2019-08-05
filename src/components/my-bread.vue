<template>
       <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- :to="{ path: '/' }"相当于router-link 中的to跳转 -->
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
              <slot></slot>
          </el-breadcrumb-item>
        </el-breadcrumb>
</template>
<script>
export default {
  name: 'my-bread'
}
</script>
<style scoped lang="less" >
</style>
