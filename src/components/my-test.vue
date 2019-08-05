<template>
<div class="container">
  <div class="header">header</div>
  <div class="content">
     <!-- 留坑，之后会填充内容 -->
     <!-- 1 -->
     <!-- <slot></slot> -->
     <!-- 2 -->
     <!-- <slot>后备内容</slot> -->
     <!-- 3 -->
     <!-- <slot name="content"></slot> -->
     <!-- 4 -->
     <slot name="content" :msg="msg"></slot>

  </div>
  <div class="footer">
    <!-- 3 -->
    <slot name="footer"></slot>
  </div>
</div>
</template>
<script>
export default {
  name: 'my-test',
  data () {
    return {
      msg: 'my-test 的数据'
    }
  }
}
</script>
<style scoped lang="less" >
</style>
