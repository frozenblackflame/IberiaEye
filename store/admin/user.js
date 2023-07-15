import Vue from 'vue'

export const state = () => ({
  page: {
    total: 0, // 总条数
    size: 10, // 单页数量
    current: 1, // 当前页数
    keyword: '' // 搜索关键词
  },
  data: {
    user: [], // 用户数据
    rawUser: [] // 用户元数据
  },
  table: {
    column: [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        align: 'center'
      },
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
        align: 'center'
      },
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
        scopedSlots: { customRender: 'account' },
        width: '15%',
        align: 'center'
      },
      {
        title: '理智',
        dataIndex: 'sanity',
        key: 'sanity',
        scopedSlots: { customRender: 'sanity' },
        align: 'center'
      },
      {
        title: '服务',
        dataIndex: 'server',
        key: 'server',
        align: 'center'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'status' },
        align: 'center'
      },
      {
        title: '有效期',
        dataIndex: 'expire',
        key: 'expire',
        width: '15%',
        align: 'center'
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        width: '15%',
        align: 'center'
      }
    ]
  }
})

export const mutations = {
  // 保存用户数据
  setUser(state, data) {
    state.page.current = data.current
    state.page.total = data.total
    state.data.rawUser = data.records
    state.data.user = data.records.map((item, index) => {
      return {
        key: index,
        id: item.id,
        name: item.name,
        account: item.account,
        server: item.server ? 'B服' : '官服',
        expire: item.expireTime.slice(0, 10),
        sanity: item.freeze ? 0 : item.san || 0,
        status: item.delete
          ? '删除'
          : item.freeze
          ? '冻结'
          : new Date(item.expireTime).getTime() > Date.now()
          ? '正常'
          : '过期'
      }
    })
  },
  // 保存搜索关键词
  setSearch(state, data) {
    state.page.keyword = data
  },
  // 跳转尾页
  lastPage(state) {
    state.page.current = Math.floor(state.page.total / state.page.size) + 1
  }
}

export const actions = {
  // 获取用户
  getUser({ state, commit }, payload) {
    return this.$axios.get(`/showAccount?current=${payload.current}&size=${state.page.size}`).then(({ data }) => {
      commit('setUser', data)
    })
  },
  // 搜索用户
  searchUser({ state, commit }, payload) {
    return this.$axios
      .get(`/searchAccount?current=${payload.current}&keyword=${state.page.keyword}&size=${state.page.size}`)
      .then(({ data }) => {
        commit('setUser', data)
      })
  },
  // 刷新用户
  refreshUser({ state, dispatch }) {
    if (state.page.keyword.length) {
      dispatch('searchUser', { current: state.page.current }).then(() => {
        Vue.prototype.$message.success('刷新成功')
      })
    } else {
      dispatch('getUser', { current: state.page.current }).then(() => {
        Vue.prototype.$message.success('刷新成功')
      })
    }
  },
  // 新增用户
  addUser({ commit, dispatch }, payload) {
    this.$axios.post('/addAccount', payload).then(() => {
      Vue.prototype.$message.success('新增成功')
      commit('lastPage')
      dispatch('refreshUser')
    })
  },
  // 编辑用户
  editUser({ dispatch }, payload) {
    this.$axios.post('/updateAccount', payload).then(() => {
      Vue.prototype.$message.success('编辑成功')
      dispatch('refreshUser')
    })
  },
  // 删除用户
  deleteUser({ dispatch }, payload) {
    Vue.prototype.$confirm({
      title: '确认删除?',
      content: '将立即删除用户！',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.$axios.post('/delAccount', payload).then(() => {
          Vue.prototype.$message.success('删除成功')
          dispatch('refreshUser')
        })
      }
    })
  },
  // 修复用户
  repairUser({ dispatch }, payload) {
    this.$axios.post('/resetAccountDynamicInfo', payload).then(() => {
      Vue.prototype.$message.success('修复成功')
      dispatch('refreshUser')
    })
  },
  // 立即作战
  startTask(_, payload) {
    this.$axios.post('/startAccountByAdmin', payload).then(() => {
      Vue.prototype.$message.success('插队成功')
    })
  }
}
