<template>
  <div class="login-content">
    <div class="login-box">
    </div>
    <div class="login-inner-box">
      <el-form :model="loginForm" status-icon ref="ruleForm2" label-width="100px" class="login-form-box">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="loginForm.userName" autocomplete="off" class="common-length"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off" class="common-length"></el-input>
        </el-form-item>
        <el-form-item>
          <p class="fr" style="margin-right:60px;cursor: pointer;">忘记密码</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" class="common-length">登录</el-button>
        </el-form-item>
      </el-form>
      <div>
        <a class="fr link-register" style="margin-right:60px;">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
  const login = {};
  login.loginUrl = "/sell/login/doLogin";
export default {
  name: 'Index',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
      if (this.loginForm.userName=='') {
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        })
        return
      }
      if (this.loginForm.password=='') {
        this.$message({
          message: '请输入密码',
          type: 'warning'
        })
        return
      }
      this.$http.post(login.loginUrl,this.loginForm).then(
        (response) => {
          if (response.state=='ok') {

            let users={};
            users.name=response.loginAccount.userName;
            users.mallId=response.loginAccount.current_mall_id;
            localStorage.setItem('users', users);
            this.$router.push('/index')

          }
          else {
            this.$utilDialog.likeAlert(this,response.msg);

          }
        },
        (error) => {

        }
      )

    }
  }
}
</script>
<style>
.login-content{
  width:100%;height:100%;
  background: url('../assets/images/login-bg.jpg') no-repeat;
  background-size: 100% 100%;
  z-index:-1;
}
.login-box {
  width:400px;
  height:420px;
  position: absolute;
  top:50%;
  left:50%;
  margin-top: -210px;
  margin-left: -200px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #fff;
  opacity: 0.4;
}
.login-inner-box{
  width:400px;
  height:420px;
  position: absolute;
  top:50%;
  left:50%;
  margin-top: -210px;
  margin-left: -200px;
  padding-top: 120px;
  color:#fff;
}
.el-form-item__label{
  color:#fff;
}
.link-register{
  cursor: pointer;
  text-decoration: underline;
}
</style>
