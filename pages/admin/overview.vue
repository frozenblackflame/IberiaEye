<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :sm="12" :md="6">
        <a-card>
          <a-statistic
            style="text-align: center"
            title="用户总数"
            suffix="人"
            :value="$store.state.admin.overview.data.statistic.payedUserNum" />
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card>
          <a-statistic
            style="text-align: center"
            title="新增用户"
            suffix="人"
            :value="$store.state.admin.overview.data.statistic.newUserNum" />
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :sm="24" :md="8">
        <a-card title="修改密码">
          <a-space class="w-full" :size="16" direction="vertical">
            <a-input v-model="form.info.username" placeholder="用户名" />
            <a-input v-model="form.info.oldPassword" placeholder="旧密码" />
            <a-input v-model="form.info.newPassword" placeholder="新密码" />
            <a-button
              class="float-right"
              type="primary"
              @click="$store.dispatch('admin/overview/editPassword', form.info)">
              修改
            </a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  created() {
    this.$store.dispatch('admin/overview/getStatistic')
  },
  data() {
    return {
      form: {
        info: {
          username: '',
          oldPassword: '',
          newPassword: ''
        }
      }
    }
  }
}
</script>
