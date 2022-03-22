<template>
  <app-header/>
  <router-view />
</template>

<script>
import appHeader from './components/main-header.vue'
import {userService} from './services/user-manage-service.js'
export default {
  name: 'app',
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
    userService.query()
  },
  components: {
    appHeader,
  },
}
</script>
