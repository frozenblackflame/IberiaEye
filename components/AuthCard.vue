<template>
  <!-- 布局背景 -->
  <div class="flex h-full min-h-screen flex-col items-center justify-center gap-y-4 bg-gray-100 py-4">
    <!-- 登录框 -->
    <div class="flex w-80 flex-col items-center gap-y-2 rounded-lg bg-white py-2 pt-8 shadow">
      <img class="w-20" src="/icon.png" />
      <div class="flex flex-col items-center gap-y-3">
        <span class="font-mono text-3xl font-bold text-gray-600"> IberiaEye </span>
        <span class="text-base">{{ remark }}</span>
      </div>
      <!-- 插槽 -->
      <slot></slot>
    </div>
    <!-- 引导框 -->
    <div class="flex w-80 flex-row justify-between gap-x-4">
      <NuxtLink
        v-for="(item, key) in guide"
        :to="item.link"
        :class="key ? 'text-violet-500 hover:text-violet-700' : 'text-blue-500 hover:text-blue-700'"
        class="flex-1 space-x-1 rounded-lg bg-white py-4 text-center text-base font-bold shadow">
        <a-icon :type="item.icon" />
        <span> {{ item.name }} </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    guide: Array,
    remark: String
  }
}
</script>
