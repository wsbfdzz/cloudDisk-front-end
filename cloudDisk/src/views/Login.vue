<template>
  <div class="bg" :style="{backgroundImage: 'url(' + backgroundImageURL + ')'}">
    <el-card>
      <el-form ref="form" :label-position="labelPosition" :model="form" :rules="rules" label-width="80px"
               class="login-box" style="width: 400px;">
        <h1 class="login-title">欢迎使用</h1>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder='Please enter your username' maxlength="20" show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder='Please enter your password' maxlength="20" show-password
                    show-word-limit>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-button type="primary" plain @click="Register('form')" style="width: 80%;">
              注册
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" @click="Login('form')" style="width: 80%;">
              登录
            </el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      labelPosition: 'left',
      form: {
        username: '',
        password: ''
      },
      backgroundImageURL: require('../assets/bg1.jpg'),
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }, {
            min: 6,
            max: 12,
            message: '非法长度',
            trigger: 'blur'
        }, {
            pattern: /^[A−Za-z0-9]+$/,
            trigger: 'change',
            message: '非法输入'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
            min: 6,
            max: 20,
            message: '非法长度',
            trigger: 'blur'
        }, {
            pattern: /^[A−Za-z0-9]+$/,
            trigger: 'change',
            message: '非法输入'
          }]
      }
    }
  },
  methods: {
    Register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form.username)
          console.log(this.form.password)
          axios.post('#', {
            username: this.form.username,
            secret: this.form.password
          }).then(function(response) {
            console.log(response)
          }).catch(function(error) {
            console.log(error)
          });
        } else {
          console.log('error')
        }
      });
      this.$router.push('/disk')
    },
    Login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form.username)
          console.log(this.form.password)
          axios.post('#', {
            username: this.form.username,
            secret: this.form.password
          }).then(function(response) {
            console.log(response);
          }).catch(function(error) {
            console.log(error);
          });
          this.$router.push('/')
        } else {
          console.log('error')
        }
      });
      this.$router.push('/disk')
    }
  }
}
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  background-repeat:no-repeat;
  background-size:100% 100%;
  margin-top: 0;
  display: flex;
  align-items:center;
  justify-content: center;
}
.el-card {
  opacity: 0.8;
  border: 1px solid #DCDFE6;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 30px #DCDFE6;
  background-color: #ffffff;
}

.el-card:hover {
  opacity: 1
}

</style>