<template>
<div class="container">
  <el-card>
    <!-- 具名插槽 -->
     <div slot="header">
      <my-bread>素材管理</my-bread>
     </div>
     <div class="btn_box">
        <el-radio-group v-model="reqParams.collect" @change="changeCollect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button  @click="openDialog()" type="success" size="small" style="float:right">添加素材</el-button>

     </div>
     <div class="img_list" >
       <div class="img_item" v-for="item in images" :key="item.id">
         <img :src="item.url" alt="">
         <!-- 控制栏  显示和隐藏 -->
         <div class="foot" v-show="!reqParams.collect">
           <!-- 后台需要什么数据，调用这个接口时就需要准备这些数据 -->
           <span @click="toggleCollect(item)" class="el-icon-star-off" :class="{selected:item.is_collected}"></span>
           <span @click="deleteImage(item.id)" class="el-icon-delete"></span>
         </div>
       </div>

     </div>
     <!-- v-if="total > reqParams.per_page" 有两页的时候显示分页功能 -->
      <el-pagination
        v-if="total > reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
  </el-card>
<!-- 准备对话框，准备数据控制对话框的显示与隐藏 -->
   <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
             <!-- handleAvatarSuccess上传成功时回调函数
             img标签上传成功后的预览位置 imageUrl上传成功后的图片地址
             -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="uploadHeaders"
            name="image"
          >
          <!-- name="image" 后台需要字段名称 -->
          <!-- 显示成功的图片 -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <!-- 显示上传图标 -->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
           <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false">取 消</el-button>
           </span>
    </el-dialog>
</div>
</template>
<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        // 默认值  全部
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片列表数据
      images: [],
      total: 0,
      // 控制对话框的显示与隐藏
      dialogVisible: false,
      // 上传成功后的图片地址
      imageUrl: null,
      // 上传组件的头部信息
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 删除图片
    deleteImage (id) {
      this.$confirm('亲，此操作将永久删除该文件, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => { })
    },
    //  切换收藏
    async toggleCollect (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      item.is_collected = data.collect
    },
    // 上传成功的函数
    handleSuccess (res) {
      // console.log(res)
      // 1获取图片地址显示img标签
      this.imageUrl = res.data.url
      // 2提示上传成功
      this.$message.success('上传成功')
      // 3过两秒关闭对话框，更新列表
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    // 打开对话框，按钮的点击事件函数
    // 原本是隐藏，点击之后改变为显示
    openDialog () {
      this.imageUrl = null // 打开对话框时清空图片
      this.dialogVisible = true
    },
    // 页面改变触发的事件，把当前的页面赋值
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换  全部和收藏
    changeCollect () {
      // 都从第一页显示
      this.reqParams.page = 1
      // 重新获取数据
      this.getImages()
    },
    async getImages () {
      // get传参  { params: this.reqParams }
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>
<style scoped lang="less" >
.img_list{
  margin-top: 20px;
  .img_item{
    width: 160px;
    height: 160px;
    border:1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right:50px;
    margin-bottom: 30px;

    img{
    display: block;
    width: 100%;
    height: 100%;
    }
    .foot{
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      left: 0;
      bottom: 0;
      background-color:rgba(0,0,0,.5);
      color: #fff;
      text-align: center;
      span{
        margin: 0 20px;
        &.selected{
          color:red
        }
      }
    }

  }
}
</style>
