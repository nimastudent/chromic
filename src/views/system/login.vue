<template>
  <div class="container">
    <div class="box">
      <h1>慢性病康复后台管理系统</h1>
      <el-form class="form">
        <el-input
          size="large"
          v-model="form.account"
          placeholder="用户名"
          type="text"
          maxlength="50"
        >
          <template #prepend>
            <i class="sfont system-xingmingyonghumingnicheng"></i>
          </template>
        </el-input>
        <el-input
          size="large"
          ref="password"
          v-model="form.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          maxlength="50"
        >
          <template #prepend>
            <i class="sfont system-mima"></i>
          </template>
          <template #append>
            <i
              class="sfont password-icon"
              :class="passwordType ? 'system-yanjing-guan' : 'system-yanjing'"
              @click="passwordTypeChange"
            ></i>
          </template>
        </el-input>
        <el-button
          type="primary"
          @click="submit"
          style="width: 100%"
          size="medium"
          v-debounce
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import $store from '@/store/index'

const store = $store
const router = useRouter()
const route = useRoute()

// 13850626850  123456
// 登录表单
const form = reactive({
  account: '181',
  password: '123456'
})

// 密码框 类型变化
const passwordType = ref('password')
const passwordTypeChange = () => {
  passwordType.value === ''
    ? (passwordType.value = 'password')
    : (passwordType.value = '')
}

// 登录方法
const submit = () => {
  let fromData = new FormData()
  let data = form
  fromData.append('account', data.account)
  fromData.append('password', data.password)
  store.dispatch('user/login', fromData).then((res) => {
    console.log(res)
    if (res === true) {
      ElMessage.success({
        message: '登录成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      router.push('/')
    } else {
      ElMessage({
        message: res,
        type: 'error',
        showClose: true,
        duration: 1000
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #eef0f3;
  .box {
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    background: white;
    border-radius: 8px;
    transform: translate(-50%, -50%);
    height: 440px;
    overflow: hidden;
    box-shadow: 0 6px 20px 5px rgba(152, 152, 152, 0.1),
      0 16px 24px 2px rgba(117, 117, 117, 0.14);
    h1 {
      margin-top: 80px;
      text-align: center;
    }
    .form {
      width: 80%;
      margin: 50px auto 15px;
      .el-input {
        margin-bottom: 20px;
      }
      .password-icon {
        cursor: pointer;
        color: #409eff;
      }
    }
    .fixed-top-right {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
@media screen and (max-width: 750px) {
  .container .box {
    width: 100vw;
    height: 100vh;
    box-shadow: none;
    left: 0;
    top: 0;
    transform: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      margin-top: 0;
    }
    .form {
    }
  }
}
</style>
