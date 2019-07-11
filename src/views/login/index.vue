<template>
  <div class="login-container">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" />
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.check" style="width:240px"></el-input>
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
          <el-button :disabled="!agree" style="width:100%" type="primary">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        phone: '',
        check: ''
      },
      agree: true
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
