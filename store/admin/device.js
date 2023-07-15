import Vue from 'vue'

export const state = () => ({
  data: {
    device: [], // 设备信息
    screen: {}, // 屏幕信息
    control: {} // 控制信息
  }
})

export const mutations = {
  // 保存设备信息
  setDevice(state, data) {
    state.data.device = data.loadDeviceList.map((item) => {
      return {
        ...item,
        status:
          item.status === '0'
            ? '离线'
            : item.status === '1'
            ? '在线'
            : item.status === '1001'
            ? '日常'
            : item.state === '1002'
            ? '肉鸽'
            : '未知'
      }
    })
  },
  // 保存屏幕信息
  setScreen(state, data) {
    state.data.screen = { ...state.data.screen, ...data }
  },
  // 保存控制信息
  setControl(state, data) {
    state.data.control[data.deviceToken] = data.url
  }
}

export const actions = {
  // 获取设备
  getDevice({ commit, dispatch }) {
    return this.$axios.get('/showLoadedDevice').then(({ data }) => {
      commit('setDevice', data)
      dispatch('getScreen')
    })
  },
  // 获取设备屏幕
  getScreen({ state, commit, dispatch }) {
    // 遍历设备
    state.data.device.forEach((item) => {
      // 华云设备
      if (item.region) {
        this.$axios.post('getDeviceScreenshotInfo', item).then(({ data }) => {
          commit('setScreen', data)
          dispatch('getControl', { device: item.deviceToken })
        })
      }
    })
  },
  // 获取设备控制
  getControl({ commit }, payload) {
    this.$axios.post('getDeviceRemoteControlUrl', payload).then(({ data }) => {
      commit('setControl', { deviceToken: payload.deviceToken, url: data })
    })
  },
  // 刷新设备
  refreshDevice({ dispatch }) {
    dispatch('getDevice').then(() => {
      Vue.prototype.$message.success('刷新成功')
    })
  },
  // 新增设备
  addDevice({ dispatch }, payload) {
    this.$axios.post('/addDevice', payload).then(() => {
      Vue.prototype.$message.success('添加成功')
      dispatch('getDevice')
    })
  },
  // 编辑设备
  editDevice({ dispatch }, payload) {
    this.$axios.post('/updateDevice', payload).then(() => {
      Vue.prototype.$message.success('编辑成功')
      dispatch('getDevice')
    })
  },
  // 删除设备
  deleteDevice({ dispatch }, payload) {
    Vue.prototype.$confirm({
      title: '确认删除?',
      content: '将立即删除设备！',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.$axios.post('/delDevice', payload).then(() => {
          Vue.prototype.$message.success('删除成功')
          dispatch('getDevice')
        })
      }
    })
  }
}
