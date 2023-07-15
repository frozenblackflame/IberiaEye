import Vue from 'vue'

// 索引上移
Vue.prototype.$up = (data, index) => {
  if (index > 0) {
    data.splice(index - 1, 2, data[index], data[index - 1])
  }
  return data
}

// 索引下移
Vue.prototype.$remove = (data, index) => {
  if (index > -1) {
    data.splice(index, 1)
  }
  return data
}

// 拷贝信息
Vue.prototype.$copy = (data) => {
  return JSON.parse(JSON.stringify(data))
}
