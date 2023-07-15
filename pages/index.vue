<template>
  <AuthCard
    remark="管理登录"
    :guide="[
      {
        name: '首页',
        icon: 'home',
        link: '/'
      },
      {
        name: '用户',
        icon: 'import',
        link: '/auth/user'
      }
    ]">
    <a-form-model class="w-64 duration-300" ref="login" :model="form" :rules="rules">
      <!-- 登录表单 -->
      <a-form-model-item label="账号" prop="username">
        <a-input v-model="form.username" placeholder="管理员账号" />
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password">
        <a-input-password v-model="form.password" placeholder="管理员密码" />
      </a-form-model-item>
      <a-form-model-item class="my-6">
        <a-button block size="large" type="primary" @click="login"> 登录 </a-button>
      </a-form-model-item>
    </a-form-model>
  </AuthCard>
</template>

<script>
import AuthCard from '@/components/AuthCard.vue'

export default {
  comments: { AuthCard },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 登录
    login() {
      this.$refs.login.validate((valid) => {
        if (valid) {
          this.$store.dispatch('auth/admin/login', this.form)
        }
      })
    }
  }
}
</script>
