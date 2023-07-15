module.exports = {
  content: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue'],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {}
  },
  corePlugins: {
    preflight: false
  }
}
