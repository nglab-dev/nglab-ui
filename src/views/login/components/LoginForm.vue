<script setup lang="ts" name="LoginForm">
import type { FormInstance } from 'element-plus'
import type { LoginRequest } from '@/api/auth'

const loginFormRef = ref<FormInstance>()
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const loading = ref(false)
const loginForm = reactive<LoginRequest>({
  username: '',
  password: '',
})

const loginConfig = useStorage('login-config', {
  rememberMe: true,
})

async function login(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log('submit!')
    }
    else {
      // console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名：admin / user">
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="密码：123456" show-password autocomplete="new-password">
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <div class="flex flex-col justify-between gap-2">
      <el-checkbox v-model="loginConfig.rememberMe">
        记住我
      </el-checkbox>
      <el-button round size="large" type="primary" class="w-full flex" :loading="loading" @click="login(loginFormRef)">
        登录
      </el-button>
    </div>
  </el-form>
</template>
