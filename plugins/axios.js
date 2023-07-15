import Vue from 'vue'

export default function ({ $axios, app }) {
  // 超时时间
  $axios.defaults.timeout = 6000

  // 请求拦截
  $axios.onRequest((config) => {
    // 鉴权配置
    config.headers.Authorization = 'Bearer ' + Vue.prototype.$storage.get('admin_token')
  })

  // 响应拦截
  $axios.onResponse((res) => {
    switch (res.data.code) {
      case 200:
        return Promise.resolve(res.data)
      default:
        Vue.prototype.$message.warn(res.data.code + ' - ' + res.data.msg)
        return Promise.reject({ response: res })
    }
  })

  // 错误拦截
  $axios.onError((err) => {
    if (!err.response) {
      Vue.prototype.$message.error('500 - 网络异常')
    }
    switch (err.response.status) {
      case 401: {
        // 退出登录
        app.store.dispatch('auth/user/logout')
      }
      case 500: {
        Vue.prototype.$message.error('500 - 服务器异常')
      }
    }
  })
}
