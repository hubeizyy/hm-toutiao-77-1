<template>
<div class="container">
     <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- :rules="loginRules"校验规则 -->
      <!-- :model 绑定属性 -->
      <!-- el-form 加属性rules绑定数据 传入约定的验证规则 -->
      <!-- el-form-item 需要加上prop属性 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <!--  v-model 双向数据绑定，用于收集用户信息 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- prop="code"x想校验的表单个项 添加prop属性；在data下面添加对应规则 -->
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码 "
            style="width:236px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

</div>
</template>
<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      // 校验手机号  1开头 第二位3-9  9位数字
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不对'))
      }
      callback()
    }
    return {
      // // 表单对象数据
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单校验规则数据
      loginRules: {
        // trigger: 'blur'失去焦点时触发
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // console.log('校验成功')
          // 请求登录接口
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            .then(res => {
              // res响应对象 ，包含响应主体
              console.log(res.data)
              this.$router.push('/')
            })
            .catch(() => {
              // 错误提示
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }

}
</script>
<style scoped lang="less" >
.container {
  // 父容器没有宽高，定位之后脱离标准流，此时基于浏览器窗口设置
  position: absolute;
  width: 100%;
  height: 100%;
  //背景图的定位/背景图的尺寸【contain 等比例缩放，完全在容器内显示；cover 等比例缩放，完全铺满容器】
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
}
.my-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  img {
    display: block;
    width: 200px;
    margin: 0 auto;
  }
}
</style>
