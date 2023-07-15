export const state = () => ({
  admin: {
    status: {
      正常: 'blue',
      冻结: 'green',
      过期: 'orange',
      删除: 'red'
    },
    log: { INFO: 'blue', WARN: 'orange', ERROR: 'red' }
  }
})
