export const state = () => ({
  page: {
    total: 0, // 总条数
    size: 10, // 单页数量
    current: 1 // 当前页数
  },
  data: {
    log: [] // 日志数据
  },
  table: {
    column: [
      {
        title: '等级',
        dataIndex: 'level',
        key: 'level',
        scopedSlots: { customRender: 'level' },
        width: '20%',
        align: 'center'
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        align: 'center'
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        width: '30%',
        align: 'center'
      }
    ]
  }
})

export const mutations = {
  // 保存日志
  setLog(state, data) {
    state.page.current = data.current
    state.page.total = data.total
    state.data.log = data.records.map((item, index) => {
      return {
        ...item,
        key: index,
        device: '',
        time: item.time.replace('T', ' ')
      }
    })
  },
  // 保存设备
  setDevice(state, data) {
    state.data.log[data.key].device = data.device
  }
}

export const actions = {
  // 获取日志
  getLog({ state, commit }, payload) {
    this.$axios.get(`/showLog?current=${payload.current}&size=${state.page.size}`).then(({ data }) => {
      commit('setLog', data)
    })
  },
  // 搜索日志
  searchLog({ state, commit }, payload) {
    this.$axios
      .get(`/searchLogByAccount?account=${payload.account}&current=${payload.current}&size=${state.page.size}`)
      .then(({ data }) => {
        commit('setLog', data)
      })
  },
  // 获取设备
  getDevice({ commit }, payload) {
    this.$axios.get(`/getDeviceByToken?deviceToken=${payload.from}`).then((res) => {
      commit('setDevice', {
        id: payload.id,
        key: payload.key,
        device: res.data.deviceName
      })
    })
  }
}
