<template>
  <DashBoard
    :menu="[
      {
        name: '概览',
        icon: 'home',
        path: '/admin/overview'
      },
      {
        name: '任务',
        icon: 'dashboard',
        path: '/admin/task'
      },
      {
        name: '用户',
        icon: 'user',
        path: '/admin/user'
      },
      {
        name: '日志',
        icon: 'file-text',
        path: '/admin/log'
      },
      {
        name: '设备',
        icon: 'code',
        path: '/admin/device'
      }
    ]">
    <nuxt-child class="space-y-4 p-4" />
  </DashBoard>
</template>

<script>
import DashBoard from '@/components/DashBoard'

export default {
  name: 'admin'
}
</script>
