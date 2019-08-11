<template>
  <div class="my-image">
    <div class="imgbtn">
      <!-- <img src="../assets/images/default.png" @click="openDialog()" alt /> -->
      <!-- value没数据默认defaultImage 有数据用父传子传过来的数据 -->
      <img :src="value || defaultImage" @click="openDialog()" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog title="选择封面" :visible.sync="dialogVisible" width="700px">
      <!-- 01-tabs功能： -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 02-单选按钮组： -->
          <el-radio-group v-model="reqParams.collect" @change="collectChange" size="mini">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 素材库主体内容  03-列表渲染：-->
          <div class="img-list">
            <!-- 添加类实现标签可以实现的功能  伪元素 -->
            <!--当当前记录的地址与遍历的图片地址一致时，把这个属性加在标签上  -->
            <div
              class="img-item"
              :class="{selected:selectedImageUrl===item.url}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <!-- <div
              class="img-item"
              v-for="item in images"
              :key="item.id"
              >-->
              <img :src="item.url" alt />
            </div>
          </div>
          <el-pagination
            v-if="total > reqParams.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传图片主体内容 -->
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
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <!-- 显示上传图标 -->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- @click="dialogVisible = false"  此时功能不够，不仅需要关闭还需要选择图片 -->
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import store from '@/store'
// 导入默认图
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  // 父传子  子组件接收属性
  props: ['value'],
  data () {
    return {
      // 使用一个组件遇到数据声明数据；遇到方法声明方法
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false, // 默认选中全部
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      // 记录选中的图片地址
      selectedImageUrl: null,
      // 设置头部
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 记录上传的图片地址
      uploadImageUrl: null,
      // 封面图地址
      defaultImage
    }
  },
  methods: {
    // 确认图片
    confirmImage () {
      // 让图片按钮能够显示选中的或者上传的图片地址
      if (this.activeName === 'image') {
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        this.$emit('input', this.uploadImageUrl)
        // this.vaule = this.uploadImageUrl
      }
      this.dialogVisible = false
    },
    // 成功上传图片后的处理函数
    // 成功上传图片
    handleSuccess (res) {
      // 预览
      this.uploadImageUrl = res.data.url
    },
    // 选中图片，拿到最新的地址
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 页面改变事件,把新的页面传给组件，组件内部自行计算
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换收藏
    collectChange () {
      this.reqParams.page = 1
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
      // 清空之前选中的或者上传的图片地址
      this.uploadImageUrl = null
      this.selectedImageUrl = null
      // 获取素材列表数据
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>
<style scoped lang="less" >
.imgbtn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img-list {
  margin-top: 10px;
}
.img-item {
  width: 160px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 10px;
  // 以下选中样式
  position: relative;
  //  当这个元素有了selected的时候才有这个样式
  // .img-item.selected::after{}
  &.selected {
    &::after {
      content: "";
      //  覆盖在图片上，所以需要定位
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      //  黑色透明背景上有对勾背景
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
</style>
