<template>
  <div>
    <!-- 功能栏 -->
    <a-row>
      <a-space class="float-right">
        <!-- 新增设备 -->
        <a-button type="primary" @click="show.add = true">新增</a-button>
        <!-- 刷新设备 -->
        <a-button ghost type="primary" @click="$store.dispatch('admin/device/refreshDevice')"> 刷新 </a-button>
      </a-space>
    </a-row>
    <!-- 设备信息 -->
    <a-row>
      <a-list :grid="{ gutter: 16, column: 4 }" :data-source="$store.state.admin.device.data.device">
        <a-list-item slot="renderItem" class="w-[17rem]" slot-scope="item, index">
          <a-card hoverable>
            <img
              slot="cover"
              :src="
                $store.state.admin.device.data.screen[item.deviceToken]
                  ? `data:image/jpeg;base64,${$store.state.admin.device.data.screen[item.deviceToken]}`
                  : '/icon.png'
              "
              @click="item.region && open($store.state.admin.device.data.control[item.deviceToken])" />
            <template slot="actions" class="ant-card-actions">
              <a-icon
                type="edit"
                @click="
                  () => {
                    form.edit = $copy(item)
                    show.edit = true
                  }
                " />
              <a-icon
                v-if="item.region"
                type="control"
                @click="open($store.state.admin.device.data.control[item.deviceToken])" />
              <a-icon type="delete" @click="$store.dispatch('admin/device/deleteDevice', { id: item.id })" />
            </template>
            <a-card-meta :title="item.deviceName" :description="item.deviceToken">
              <a-avatar
                slot="avatar"
                size="large"
                :class="{
                  'bg-gray-400': item.status === '离线',
                  'bg-blue-400': item.status === '在线',
                  'bg-yellow-400': item.status === '日常',
                  'bg-red-400': item.status === '肉鸽'
                }">
                {{ item.status }}
              </a-avatar>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </a-list>
    </a-row>
    <!-- 新增设备 -->
    <a-modal
      title="新增设备"
      okText="确定"
      cancelText="取消"
      v-model="show.add"
      @ok="$store.dispatch('admin/device/addDevice', form.add) && (show.add = false)">
      <a-input v-model="form.add.deviceName" addon-before="设备名称" />
    </a-modal>
    <!-- 编辑设备 -->
    <a-modal
      title="编辑设备"
      okText="确定"
      cancelText="取消"
      v-model="show.edit"
      @ok="$store.dispatch('admin/device/editDevice', form.edit) && (show.edit = false)">
      <a-input v-model="form.edit.deviceName" addon-before="设备名称" />
    </a-modal>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  created() {
    this.$store.dispatch('admin/device/getDevice')
  },
  data() {
    return {
      show: {
        add: false,
        edit: false
      },
      form: {
        add: {
          deviceName: ''
        },
        edit: {
          deviceName: ''
        }
      }
    }
  },
  methods: {
    // 打开网页
    open(url) {
      location.href = url
    }
  }
}
</script>
