<template>
  <div>
    <!-- 功能栏 -->
    <a-row>
      <a-space class="float-right">
        <!-- 搜索框 -->
        <a-input v-model="form.search" placeholder="用户账号" />
        <!-- 搜索按钮 -->
        <a-button
          type="primary"
          @click="
            $store.dispatch('admin/log/searchLog', {
              current: 1,
              account: form.search
            })
          ">
          搜索
        </a-button>
        <!-- 取消搜索 -->
        <a-button
          type="danger"
          ghost
          @click="$store.dispatch('admin/log/getLog', { current: 1 }) && (form.search = '')">
          取消
        </a-button>
      </a-space>
    </a-row>
    <a-row>
      <!-- 日志信息 -->
      <a-table
        size="middle"
        class="rounded bg-white shadow"
        :columns="$store.state.admin.log.table.column"
        :data-source="$store.state.admin.log.data.log"
        :scroll="{ x: 580 }"
        :expandRowByClick="true"
        :pagination="false"
        @expand="
          (expanded, record) => {
            expanded &&
              record.from !== 'SYSTEM' &&
              $store.dispatch('admin/log/getDevice', {
                id: record.id,
                key: record.key,
                from: record.from
              })
          }
        ">
        <!-- 日志等级 -->
        <span slot="level" slot-scope="level">
          <a-tag :color="$store.state.utils.color.admin.log[level]">
            {{ level }}
          </a-tag>
        </span>
        <!-- 日志详情 -->
        <div slot="expandedRowRender" slot-scope="record" class="relative m-0">
          账号：{{ record.account }}
          <br />
          用户：{{ record.name }}
          <br />
          设备：{{ record.device }}
          <br />
          来自：{{ record.from }}
          <br />
          服务器：{{ record.server ? 'B服' : '官服' }}
          <br />
          任务类型：{{ record.taskType }}
          <br />
          详细信息：{{ record.detail }}
          <br />
          <img :src="record.imageUrl" class="absolute right-0 top-0 max-h-full" />
        </div>
        <template slot="footer">
          <!-- 日志分页 -->
          <a-pagination
            size="small"
            class="flex items-center justify-center"
            :total="$store.state.admin.log.page.total"
            :current="$store.state.admin.log.page.current"
            :pageSize="$store.state.admin.log.page.size"
            @change="
              (page) => {
                form.search
                  ? $store.dispatch('admin/log/searchLog', {
                      current: page,
                      account: form.search
                    })
                  : $store.dispatch('admin/log/getLog', { current: page })
              }
            " />
        </template>
      </a-table>
    </a-row>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  created() {
    this.$store.dispatch('admin/log/getLog', { current: 1 })
  },
  data() {
    return {
      form: {
        // 搜索关键字
        search: ''
      }
    }
  }
}
</script>
