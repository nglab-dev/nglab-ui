<script setup lang="ts" name="LoginForm">
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Lock, User } from '@element-plus/icons-vue'
import type { LoginRequest } from '@/api/auth'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const permissStore = usePermissionStore()

const loginFormRef = ref<FormInstance>()
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const loading = ref(false)
const loginForm = reactive<LoginRequest>({
  username: 'admin',
  password: '123456',
})

const loginConfig = useStorage('login-config', {
  rememberMe: true,
})

async function login(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await userStore.login(loginForm)
      await permissStore.buildRoutes()
      ElMessage.success('登录成功')
      const redirect = route.query.redirect as string
      const redirectUrl = redirect ? decodeURIComponent(redirect) : '/home'
      router.push(redirectUrl)
    }
    else {
      console.error('error submit!', fields)
      ElMessage.error('请检查输入项')
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
            <User />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="密码：123456" show-password autocomplete="new-password">
        <template #prefix>
          <el-icon class="el-input__icon">
            <Lock />
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
