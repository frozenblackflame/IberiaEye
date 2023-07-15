<template>
  <!-- 布局背景 -->
  <a-layout class="h-full min-h-screen">
    <!-- 侧边栏 -->
    <a-layout-sider width="180" v-model="collapsed" collapsible>
      <!-- 信息栏 -->
      <NuxtLink to="/" :class="collapsed ? 'px-6' : 'px-4'" class="flex flex-row items-center space-x-1 pt-6 pb-4">
        <img src="/icon.png" class="inline h-9" />
        <span v-show="!collapsed" class="font-mono text-lg font-bold text-white"> IberiaEye </span>
      </NuxtLink>
      <!-- 侧边菜单 -->
      <a-menu theme="dark" mode="inline" :selectedKeys="[$route.path]">
        <!-- 菜单列表 -->
        <a-menu-item v-for="item in menu" :key="item.path" @click="$router.push(item.path)">
          <!-- 菜单图标 -->
          <a-icon :type="item.icon" />
          <!-- 菜单名 -->
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- 主体内容 -->
    <a-layout>
      <!-- 顶部导航 -->
      <a-layout-header class="bg-white px-6">
        <!-- 折叠菜单 -->
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapsed = !collapsed" />
        <!-- 功能按钮 -->
        <div class="float-right space-x-2">
          <a-button type="danger" @click="$store.dispatch(`auth/${$parent.$options.name}/logout`)"> 登出 </a-button>
        </div>
      </a-layout-header>
      <a-layout-content>
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  props: {
    menu: Array
  },
  created() {
    screen.width < 768 && (this.collapsed = true)
  },
  data() {
    return {
      collapsed: false
    }
  }
}
</script>
