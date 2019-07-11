<template>
  <div class="login-container">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" />
      <p>
        <label for="user">用户名:</label>
        <input type="text" id="user"/>
      </p>
      <p>
        <label for="pwd">密&nbsp;&nbsp;&nbsp;码:</label>
        <input type="password" id="pwd"/>
      </p>
      <p>
        <input type="text" class="yzm" />
        <input type="button" value="获取验证码" />
      </p>
      <p>
        <input type="submit" value="登陆"/>
      </p>
    </el-card>
  </div>
</template>

<script>
export default {}
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
    width: 400px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 220px;
      display: block;
      margin: 0 auto;
    }
    p {
      text-align: right;
      margin: 24px 30px;
      label {
        float: left;
        line-height: 24px;
      }
      input {
        width: 220px;
        height: 20px;
        border: 1px inset #ccc;
        outline: 0;
      }
      .yzm {
        width: 120px;
        float: left;
        vertical-align: middle;
      }
      input[type="button"] {
        width: 80px;
        height: 24px;
      }
      input[type="submit"] {
        width: 50px;
        height: 24px;
        background-color: #fff;
      }
    }
  }
}
</style>
