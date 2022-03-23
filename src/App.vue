<template>
  <app-header/>
  <router-view />
</template>

<script>
import appHeader from './components/main-header.vue'
import {userManageService} from './services/user-manage-service.js'
export default {
  name: 'app',
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
    this.$store.dispatch({ type: 'loadUsers' })
    userManageService.query()
  },
  components: {
    appHeader,
  },
}
</script>
