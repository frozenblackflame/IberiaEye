import Vue from 'vue'

export const actions = {
  login(_, payload) {
    this.$axios.post('/adminLogin', payload).then(({ data }) => {
      Vue.prototype.$storage.set('admin_token', data.token)
      Vue.prototype.$message.success('登录成功')
      this.$router.push('/admin/overview')
    })
  },
  logout() {
    Vue.prototype.$storage.remove('admin_token')
    this.$router.push('/auth/admin')
  }
}
