<template>
  <div>
    <div class="bg-nav shadow fixed-top">
      <div class="container d-flex align-items-center justify-content-between">
        <div class="font-size-lg font-weight-bold">
          Where In The World ?
        </div>
        <div>
          <el-button size="mini" :type="!darkMode ? 'text' : 'primary'" :class="{ 'text-dark': !darkMode }" @click="toggleMode"
            ><i class="far fa-moon mr-2"></i> Dark Mode
          </el-button>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
<script>
export default {
  data: () => ({
    darkMode: false,
  }),
  methods: {
    toggleMode() {
      this.darkMode = !this.darkMode
      const darkThemeLinkEl = document.querySelector('#app')
      if (this.darkMode && darkThemeLinkEl) {
        this.addDarkTheme()
      } else {
        this.removeDarkTheme()
      }
    },
    addDarkTheme() {
      const darkThemeLinkEl = document.querySelector('body')
      darkThemeLinkEl.className = 'dark'
    },
    removeDarkTheme() {
      const darkThemeLinkEl = document.querySelector('body')
      darkThemeLinkEl.classList.remove('dark')
    },
  },
}
</script>
