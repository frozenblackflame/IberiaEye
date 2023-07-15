export default {
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  // https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // https://go.nuxtjs.dev/config-target
  target: 'static',

  //  https://go.nuxtjs.dev/config-head
  head: {
    title: '伊比利亚审判庭',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      { name: 'description', content: '伊比利亚审判庭 - 明日方舟云托管平台' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // https://go.nuxtjs.dev/config-css
  css: ['ant-design-vue/dist/antd.css', '@/assets/index.css', '@/assets/tailwind.css'],

  // https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/axios', '@/plugins/storage', '@/plugins/antd', '@/plugins/moment', '@/plugins/utils'],

  // https://go.nuxtjs.dev/config-components
  components: true,

  // https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxt/postcss8'],

  // https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/chantouchsek/nuxt-clipboard
    'nuxt-clipboard'
  ],

  // https://go.nuxtjs.dev/config-axios
  axios: {
    // https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://124.223.3.223:2000/'
  },

  // https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'zh-CN',
      name: '伊比利亚审判庭',
      short_name: '伊比利亚审判庭',
      description: '伊比利亚审判庭 - 游戏托管平台',
      start_url: '/'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  }
}
