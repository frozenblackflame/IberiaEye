<template>
  <div>
    <!-- 功能栏 -->
    <a-row>
      <a-space class="float-right">
        <a-button type="primary" ghost @click="$store.dispatch('admin/task/refreshAll')">刷新</a-button>
        <a-button type="primary" @click="$store.dispatch('admin/task/refreshTask')">重载</a-button>
      </a-space>
    </a-row>
    <!-- 任务列表 -->
    <a-row :gutter="[16, 16]">
      <a-col :sm="24" :md="12" :xl="8">
        <a-divider> 待处理（ {{ $store.state.admin.task.data.free.length }} ） </a-divider>
        <a-table
          class="rounded bg-white shadow"
          :scroll="{ x: 360 }"
          :columns="$store.state.admin.task.table.column"
          :data-source="$store.state.admin.task.data.free"
          :pagination="false">
          <span slot="action" slot-scope="text, record">
            <!-- 移除用户 -->
            <a-button
              ghost
              size="small"
              type="primary"
              @click="$store.dispatch('admin/task/removeTask', { id: record.id })">
              移除
            </a-button>
          </span>
        </a-table>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8">
        <a-divider> 处理中（ {{ $store.state.admin.task.data.lock.length }} ）</a-divider>
        <a-table
          class="rounded bg-white shadow"
          :scroll="{ x: 360 }"
          :columns="$store.state.admin.task.table.column"
          :data-source="$store.state.admin.task.data.lock"
          :pagination="false">
          <span slot="action" slot-scope="text, record">
            <!-- 移除用户 -->
            <a-button
              ghost
              size="small"
              type="danger"
              @click="$store.dispatch('admin/task/unlockTask', { token: record.token })">
              释放
            </a-button>
          </span>
        </a-table>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8">
        <a-divider> 冷却中 （ {{ $store.state.admin.task.data.freeze.length }} ）</a-divider>
        <a-table
          class="rounded bg-white shadow"
          :scroll="{ x: 280 }"
          :columns="$store.state.admin.task.table.special"
          :data-source="$store.state.admin.task.data.freeze"
          :pagination="false"></a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  created() {
    this.$store.dispatch('admin/task/getAll')
  }
}
</script>
