import Vue from 'vue'

import pkg from '../package.json'

// 存在数据
const has = (key) => {
  return Object.prototype.hasOwnProperty.call(window.localStorage, pkg.name + '_' + key)
}

// 存储数据
const set = (key, data) => {
  const value = JSON.stringify(data)
  return window.localStorage.setItem(pkg.name + '_' + key, value)
}

// 取出数据
const get = (key) => {
  const value = window.localStorage.getItem(pkg.name + '_' + key)
  return JSON.parse(value)
}

// 删除数据
const remove = (key) => {
  return window.localStorage.removeItem(pkg.name + '_' + key)
}

// 清空数据
const clear = () => {
  return window.localStorage.clear()
}

// 导出
Vue.prototype.$storage = { has, set, get, remove, clear }
