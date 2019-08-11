<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form ref="form" label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机: ">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <!-- 点击保存设置
                  - 提交用户信息给后台
                  - 更新本地存储用户信息
                  - 更新home组件的用户名
              -->
              <el-button type="primary" @click="saveUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" style="text-align: center;">
          <!-- 上传头像 -->
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action
            :http-request="myUpload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
//  2 - 更新本地存储用户信息
import store from '@/store'
import eventBus from '@/components/eventbus.js'
export default {
  data () {
    return {
      userForm: {
        id: null,
        name: null,
        intro: null,
        photo: null,
        email: null,
        mobile: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userForm = data
    },
    // 保存用户信息
    async saveUserInfo () {
      // 1 - 提交用户信息给后台
      await this.$http.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('保存设置成功')
      // 2 - 更新本地存储用户信息
      // 调用本地存储信息，局部变更赋值
      store.setUser({ name: this.userForm.name })
      // 3- 更新home组件的用户名
      // 此处传递修改好的数据到home组件去
      eventBus.$emit('updateName', this.userForm.name)
    },
    myUpload (result) {
      // 选中图片后 触发函数  选择的结果result
      // 文件信息获取 result.file
      // axios + formdata 进行上传
      const formData = new FormData()
      formData.append('photo', result.file)
      this.$http.patch('user/photo', formData).then(res => {
        // 上传头像成功
        this.$message.success('修改头像成功')
        // 预览
        this.userForm.photo = res.data.data.photo
        // 同步本地存储
        store.setUser({ photo: this.userForm.photo })
        // 同步HOME组件
        eventBus.$emit('updatePhoto', this.userForm.photo)
      })
    }
  }
}
</script>
<style scoped lang="less" >
</style>
