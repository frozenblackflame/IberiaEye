export const state = () => ({
  data: {
    statistic: {} // 统计数据
  }
})

export const mutations = {
  // 保存统计数据
  setStatistic(state, data) {
    state.data.statistic = data
  }
}

export const actions = {
  // 获取统计信息
  getStatistic({ commit }) {
    this.$axios.get('/getStatistics').then(({ data }) => {
      commit('setStatistic', data)
    })
  },
  // 修改密码
  editPassword(_, payload) {
    this.$axios.post('/changeAdminPassword', payload).then(() => {
      Vue.prototype.$message.success('修改成功')
    })
  }
}
