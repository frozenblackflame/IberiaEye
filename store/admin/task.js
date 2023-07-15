import Vue from 'vue'

export const state = () => ({
  data: {
    // 待处理任务
    free: [],
    // 处理中任务
    lock: [],
    // 冷却中任务
    freeze: []
  },
  table: {
    // 通用表头
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
        width: '40%',
        align: 'center'
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align: 'center'
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        width: '25%',
        align: 'center'
      }
    ],
    // 特殊表头
    special: [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        align: 'center'
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        width: '70%',
        align: 'center'
      }
    ]
  }
})

export const mutations = {
  // 保存待处理任务
  setFree(state, data) {
    state.data.free = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        type: item.taskType
      }
    })
  },
  // 保存处理中任务
  setLock(state, data) {
    state.data.lock = data.map((item) => {
      return {
        id: item.account.id,
        name: item.account.name,
        type: item.account.taskType,
        token: item.deviceToken
      }
    })
  },
  // 保存冷却中任务
  setFreeze(state, data) {
    state.data.freeze = Object.keys(data).map((item) => {
      return {
        id: item,
        time: data[item].slice(0, 19).replace('T', ' ')
      }
    })
  }
}

export const actions = {
  // 获取所有任务
  getAll({ dispatch }) {
    dispatch('getFree')
    dispatch('getLock')
    dispatch('getFreeze')
  },
  // 获取所有任务
  refreshAll({ dispatch }) {
    dispatch('getFree')
    dispatch('getLock')
    dispatch('getFreeze')
    Vue.prototype.$message.success('刷新成功')
  },
  // 获取待处理任务
  getFree({ commit }) {
    this.$axios.get('/showFreeTaskList').then(({ data }) => {
      commit('setFree', data)
    })
  },
  // 获取处理中任务
  getLock({ commit }) {
    this.$axios.get('/showLockTaskList').then(({ data }) => {
      commit('setLock', data)
    })
  },
  // 获取冷却中任务
  getFreeze({ commit }) {
    this.$axios.get('/showFreezeTaskList').then(({ data }) => {
      commit('setFreeze', data)
    })
  },
  // 移除任务
  removeTask({ dispatch }, payload) {
    this.$axios.post('/tempRemoveTask', payload).then(() => {
      Vue.prototype.$message.success('移除成功')
      dispatch('getAll')
    })
  },
  // 释放任务
  unlockTask({ dispatch }, payload) {
    this.$axios.post('/forceUnlockOneTask', payload).then(() => {
      Vue.prototype.$message.success('释放成功')
      dispatch('getAll')
    })
  },
  // 插队任务
  insertTask({ dispatch }, payload) {
    this.$axios.post('/tempInsertTask', payload).then(() => {
      Vue.prototype.$message.success('插队成功')
      dispatch('getAll')
    })
  },
  // 强制刷新任务
  refreshTask({ dispatch }) {
    Vue.prototype.$confirm({
      title: '确认刷新?',
      content: '将立即从数据库刷新任务！',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.$axios.post('/forceLoadAllTask').then(() => {
          Vue.prototype.$message.success('刷新成功')
          dispatch('getAll')
        })
      }
    })
  }
}
