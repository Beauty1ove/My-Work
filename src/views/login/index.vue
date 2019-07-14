<template>
  <div class="login-container">
    <el-card class="login-box abcdefg">
      <img src="../../assets/images/logo_index.png" />
      <el-form ref="checkForm" status-icon :model="loginForm" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="agree">
            我已阅读并同意
            <a href>用户协议</a>
            和
            <a href>隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!agree" style="width:100%" type="primary" @click="login()">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      if (/^1[3456789]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      agree: true,
      rules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { length: 6, message: '请输入正确的6为验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.checkForm.validate(valid => {
        if (valid) {
          this.$http
            .post(
              '/authorizations',
              this.loginForm
            )
            .then(res => {
              window.sessionStorage.setItem('user', JSON.stringify(res.data.data))
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/images/login_bg.jpg") no-repeat center / cover;
  .login-box {
    width: 430px;
    height: 330px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 220px;
      display: block;
      margin: 0 auto;
    }
    .el-form-item {
      margin-top: 20px;
    }
    a {
      text-decoration: none;
    }
  }
}
</style>
