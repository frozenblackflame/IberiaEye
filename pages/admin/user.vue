<template>
  <div>
    <!-- 功能栏 -->
    <a-row :gutter="[16, 16]">
      <a-space class="float-left m-2">
        <!-- 新增用户 -->
        <a-button type="primary" @click="show.add = true">新增</a-button>
        <!-- 刷新用户 -->
        <a-button ghost type="primary" @click="$store.dispatch('admin/user/refreshUser')">刷新</a-button>
      </a-space>
      <a-space class="float-right m-2">
        <!-- 搜索框 -->
        <a-input v-model="form.search" placeholder="关键词" />
        <!-- 搜索按钮 -->
        <a-button
          type="primary"
          @click="
            $store.commit('admin/user/setSearch', form.search)
            $store.dispatch('admin/user/searchUser', {
              current: 1
            })
          ">
          搜索
        </a-button>
        <!-- 取消搜索 -->
        <a-button
          type="danger"
          ghost
          @click="
            form.search = ''
            $store.commit('admin/user/setSearch', form.search)
            $store.dispatch('admin/user/getUser', { current: 1 })
          ">
          取消
        </a-button>
      </a-space>
    </a-row>
    <!-- 用户信息 -->
    <a-row>
      <a-table
        size="middle"
        class="rounded bg-white shadow"
        :columns="$store.state.admin.user.table.column"
        :data-source="$store.state.admin.user.data.user"
        :scroll="{ x: 760 }"
        :pagination="false">
        <!-- 账号信息 -->
        <span
          slot="account"
          slot-scope="account"
          @click="
            $copyText(account).then(
              () => $message.success('复制成功'),
              () => $message.error('复制失败')
            )
          ">
          {{ account }}
        </span>
        <!-- 理智状态 -->
        <span slot="sanity" slot-scope="text, record">
          <!-- 修复理智 -->
          <a-button
            v-if="text === 0 && record.status === '正常'"
            size="small"
            @click="$store.dispatch('admin/user/repairUser', record) && (show.pay = false)">
            修复
          </a-button>
          <span v-else>{{ text }}</span>
        </span>
        <!-- 用户状态 -->
        <span slot="status" slot-scope="status">
          <a-tag :color="$store.state.utils.color.admin.status[status]">
            {{ status }}
          </a-tag>
        </span>
        <!-- 用户操作 -->
        <span slot="action" slot-scope="text, record">
          <a-space>
            <!-- 编辑用户 -->
            <a-button
              ghost
              size="small"
              type="primary"
              @click="
                () => {
                  form.edit = $copy($store.state.admin.user.data.rawUser[record.key])
                  show.edit = true
                }
              ">
              编辑
            </a-button>
            <!-- 删除用户 -->
            <a-button ghost size="small" type="danger" @click="$store.dispatch('admin/user/deleteUser', record)">
              删除
            </a-button>
          </a-space>
        </span>
        <!-- 分页 -->
        <span slot="footer">
          <!-- 分页 -->
          <a-pagination
            size="small"
            class="flex items-center justify-center"
            :total="$store.state.admin.user.page.total"
            :current="$store.state.admin.user.page.current"
            :pageSize="$store.state.admin.user.page.size"
            @change="
              (page) => {
                form.search
                  ? $store.dispatch('admin/user/searchUser', { current: page })
                  : $store.dispatch('admin/user/getUser', { current: page })
              }
            " />
        </span>
      </a-table>
    </a-row>
    <!-- 新增用户 -->
    <a-modal v-model="show.add" title="新增用户" okText="确定" cancelText="取消" @ok="add">
      <a-form-model ref="add" :model="form.add" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
        <a-form-model-item label="昵称" prop="name">
          <a-input v-model="form.add.name" />
        </a-form-model-item>
        <a-form-model-item label="账号" prop="account">
          <a-input v-model="form.add.account" />
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input v-model="form.add.password" />
        </a-form-model-item>
        <a-form-model-item label="服务器" prop="server">
          <a-radio-group v-model="form.add.server">
            <a-radio :value="0"> 官服 </a-radio>
            <a-radio :value="1"> B服 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="有效期" prop="expireTime">
          <a-date-picker
            show-time
            class="w-2/3"
            placeholder="选择时间"
            format="YYYY-MM-DDTHH:mm:ss"
            v-model="form.add.expireTime" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 编辑用户 -->
    <a-modal
      title="编辑用户"
      okText="确定"
      cancelText="取消"
      v-if="form.edit.createTime"
      v-model="show.edit"
      @ok="edit">
      <!-- 基础配置 -->
      <a-form-model ref="edit" :model="form.edit" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
        <!-- 用户信息 -->
        <a-form-model-item label="昵称" prop="name">
          <a-input v-model="form.edit.name" />
        </a-form-model-item>
        <a-form-model-item label="账号" prop="account">
          <a-input v-model="form.edit.account" />
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input v-model="form.edit.password" />
        </a-form-model-item>
        <a-form-model-item label="服务器" prop="server">
          <a-radio-group v-model="form.edit.server">
            <a-radio :value="0"> 官服 </a-radio>
            <a-radio :value="1"> B服 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="有效期" prop="expireTime">
          <a-date-picker
            show-time
            class="w-2/3"
            placeholder="选择时间"
            format="YYYY-MM-DDTHH:mm:ss"
            v-model="form.edit.expireTime" />
        </a-form-model-item>
        <!-- 用户冻结 -->
        <a-form-model-item label="冻结" prop="freeze">
          <a-switch
            :checked="form.edit.freeze ? true : false"
            @change="
              (event) => {
                form.edit.freeze = event ? 1 : 0
              }
            " />
        </a-form-model-item>
        <a-form-model-item label="代理" prop="agent">
          <a-input-number class="!w-24" v-model="form.edit.agent" />
        </a-form-model-item>
        <a-form-model-item label="作战次数" prop="refresh">
          <a-space>
            <a-input-number class="!w-24" v-model="form.edit.refresh" />
            <a-button type="primary" ghost @click="$store.dispatch('admin/user/startTask', form.edit)">
              立即作战
            </a-button>
          </a-space>
        </a-form-model-item>
      </a-form-model>
      <!-- 高级配置 -->
      <a-collapse>
        <a-collapse-panel header="高级配置">
          <a-form-item label="功能配置">
            <a-row>
              <a-col :span="6">
                <a-checkbox
                  class="!text-purple-500"
                  :checked="form.edit.config.daily.task"
                  @change="
                    (event) => {
                      form.edit.config.daily.task = event.target.checked
                    }
                  ">
                  作战
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  class="!text-blue-500"
                  :checked="form.edit.config.daily.credit"
                  @change="
                    (event) => {
                      form.edit.config.daily.credit = event.target.checked
                    }
                  ">
                  商店
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  class="!text-green-500"
                  :checked="form.edit.config.daily.friend"
                  @change="
                    (event) => {
                      form.edit.config.daily.friend = event.target.checked
                    }
                  ">
                  好友
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  class="!text-orange-500"
                  :checked="form.edit.config.daily.activity"
                  @change="
                    (event) => {
                      form.edit.config.daily.activity = event.target.checked
                    }
                  ">
                  活动
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  class="!text-yellow-500"
                  :checked="form.edit.config.daily.mail"
                  @change="
                    (event) => {
                      form.edit.config.daily.mail = event.target.checked
                    }
                  ">
                  邮箱
                </a-checkbox>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item label="招募配置">
            <a-row>
              <a-col :span="6">
                <a-checkbox
                  class="!text-red-500"
                  :checked="form.edit.config.daily.offer.enable"
                  @change="
                    (event) => {
                      form.edit.config.daily.offer.enable = event.target.checked
                    }
                  ">
                  招募
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  class="!text-gray-500"
                  :checked="form.edit.config.daily.offer.car"
                  @change="
                    (event) => {
                      form.edit.config.daily.offer.car = event.target.checked
                    }
                  ">
                  小车
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  class="!text-gray-500"
                  :checked="form.edit.config.daily.offer.star4"
                  @change="
                    (event) => {
                      form.edit.config.daily.offer.star4 = event.target.checked
                    }
                  ">
                  四星
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  class="!text-gray-500"
                  :checked="form.edit.config.daily.offer.star5"
                  @change="
                    (event) => {
                      form.edit.config.daily.offer.star5 = event.target.checked
                    }
                  ">
                  五星
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  class="!text-gray-500"
                  :checked="form.edit.config.daily.offer.star6"
                  @change="
                    (event) => {
                      form.edit.config.daily.offer.star6 = event.target.checked
                    }
                  ">
                  六星
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  class="!text-gray-500"
                  :checked="form.edit.config.daily.offer.other"
                  @change="
                    (event) => {
                      form.edit.config.daily.offer.other = event.target.checked
                    }
                  ">
                  其他
                </a-checkbox>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item label="基建配置">
            <a-row>
              <a-col :span="6">
                <a-checkbox
                  class="!text-teal-500"
                  :checked="form.edit.config.daily.infrastructure.shift"
                  @change="
                    (event) => {
                      form.edit.config.daily.infrastructure.shift = event.target.checked
                    }
                  ">
                  排班
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  class="!text-teal-500"
                  :checked="form.edit.config.daily.infrastructure.deputy"
                  @change="
                    (event) => {
                      form.edit.config.daily.infrastructure.deputy = event.target.checked
                    }
                  ">
                  副手
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  class="!text-teal-500"
                  :checked="form.edit.config.daily.infrastructure.harvest"
                  @change="
                    (event) => {
                      form.edit.config.daily.infrastructure.harvest = event.target.checked
                    }
                  ">
                  收菜
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  class="!text-teal-500"
                  :checked="form.edit.config.daily.infrastructure.acceleration"
                  @change="
                    (event) => {
                      form.edit.config.daily.infrastructure.acceleration = event.target.checked
                    }
                  ">
                  加速
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  class="!text-teal-500"
                  :checked="form.edit.config.daily.infrastructure.communication"
                  @change="
                    (event) => {
                      form.edit.config.daily.infrastructure.communication = event.target.checked
                    }
                  ">
                  线索
                </a-checkbox>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item label="任务配置">
            <a-space v-for="(item, index) in form.edit.config.daily.fight">
              <a-input v-model="item.level" />
              <a-input-number v-model="item.num" />
              <a-icon type="up-circle" @click="$up(form.edit.config.daily.fight, index)" />
              <a-icon type="close-circle" @click="$remove(form.edit.config.daily.fight, index)" />
            </a-space>
            <a-button
              type="dashed"
              class="w-2/3"
              @click="
                form.edit.config.daily.fight.push({
                  num: 0,
                  level: ''
                })
              ">
              <a-icon type="plus" />
              <span>增加任务</span>
            </a-button>
          </a-form-item>
          <a-form-item label="理智恢复">
            <a-space>
              <a-icon type="experiment" />
              <span>药剂</span>
              <a-input-number class="w-16" v-model="form.edit.config.daily.sanity.drug" />
              <a-icon type="medicine-box" />
              <span>源石</span>
              <a-input-number class="w-16" v-model="form.edit.config.daily.sanity.stone" />
            </a-space>
          </a-form-item>
          <a-form-item label="时间配置">
            <a-row>
              <a-col :span="6">
                <a-checkbox
                  :checked="form.edit.active.monday.enable"
                  @change="
                    (event) => {
                      form.edit.active.monday.enable = event.target.checked
                    }
                  ">
                  周一
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  :checked="form.edit.active.tuesday.enable"
                  @change="
                    (event) => {
                      form.edit.active.tuesday.enable = event.target.checked
                    }
                  ">
                  周二
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  :checked="form.edit.active.wednesday.enable"
                  @change="
                    (event) => {
                      form.edit.active.wednesday.enable = event.target.checked
                    }
                  ">
                  周三
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  :checked="form.edit.active.thursday.enable"
                  @change="
                    (event) => {
                      form.edit.active.thursday.enable = event.target.checked
                    }
                  ">
                  周四
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  :checked="form.edit.active.friday.enable"
                  @change="
                    (event) => {
                      form.edit.active.friday.enable = event.target.checked
                    }
                  ">
                  周五
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  :checked="form.edit.active.saturday.enable"
                  @change="
                    (event) => {
                      form.edit.active.saturday.enable = event.target.checked
                    }
                  ">
                  周六
                </a-checkbox>
              </a-col>
              <a-col :span="6">
                <a-checkbox
                  :checked="form.edit.active.sunday.enable"
                  @change="
                    (event) => {
                      form.edit.active.sunday.enable = event.target.checked
                    }
                  ">
                  周日
                </a-checkbox>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item label="通知配置">
            <a-space>
              <a-checkbox
                :checked="form.edit.notice.mail.enable"
                @change="
                  (event) => {
                    form.edit.notice.mail.enable = event.target.checked
                  }
                ">
                邮件
              </a-checkbox>
              <a-input v-model="form.edit.notice.mail.text" />
            </a-space>
            <a-space>
              <a-checkbox
                :checked="form.edit.notice.qq.enable"
                @change="
                  (event) => {
                    form.edit.notice.qq.enable = event.target.checked
                  }
                ">
                腾讯
              </a-checkbox>
              <a-input v-model="form.edit.notice.qq.text" />
            </a-space>
            <a-space>
              <a-checkbox
                :checked="form.edit.notice.wxUID.enable"
                @change="
                  (event) => {
                    form.edit.notice.wxUID.enable = event.target.checked
                  }
                ">
                微信
              </a-checkbox>
              <a-input v-model="form.edit.notice.wxUID.text" />
            </a-space>
          </a-form-item>
        </a-collapse-panel>
      </a-collapse>
    </a-modal>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  created() {
    this.$store.dispatch('admin/user/getUser', { current: 1 })
  },
  data() {
    return {
      // 展示
      show: {
        add: false,
        edit: false
      },
      // 表单
      form: {
        // 搜索用户
        search: '',
        // 新增用户
        add: {
          name: null,
          account: null,
          password: null,
          server: 0,
          expireTime: this.$moment(Date.now() + 2592000000).format('YYYY-MM-DDTHH:mm:ss')
        },
        // 编辑用户
        edit: {}
      },
      // 验证规则
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 4,
            max: 32,
            message: '长度在 4 到 32 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 32,
            message: '长度在 6 到 32 个字符',
            trigger: 'blur'
          }
        ],
        expireTime: {
          required: true,
          message: '请选择有效期',
          trigger: 'change'
        },
        server: { required: true, message: '请选择服务器', trigger: 'blur' }
      }
    }
  },
  methods: {
    // 增加用户
    add() {
      this.$refs.add.validate((valid) => {
        if (valid) {
          this.$store.dispatch('admin/user/addUser', this.form.add)
          this.show.add = false
        }
      })
    },
    // 编辑用户
    edit() {
      this.$refs.edit.validate((valid) => {
        if (valid) {
          this.$store.dispatch('admin/user/editUser', this.form.edit)
          this.show.edit = false
        }
      })
    }
  }
}
</script>
