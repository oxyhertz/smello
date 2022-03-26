<template>
  <div class="wrapper" :style="{'background-color': currBoard}">
    <app-header/>
    <router-view />
   </div> 
</template>

<script>
import appHeader from './components/main-header.vue'
import {userManageService} from './services/user-manage-service.js'
export default {
  name: 'app',
  data(){
    return{
      color:'red',
      bg:'beige'
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
    this.$store.dispatch({ type: 'loadUsers' })
    userManageService.query()
    console.log(this.$store.getters.currBoard?.style.bgColor)

  },
  computed:{
    currBoard(){
      console.log(this.$store.getters?.currBoard?.style?.bgColor)
      return this.$store.getters.currBoard?.style?.bgColor
    }
  },
  components: {
    appHeader,
  },
}

</script>

<style >
  #app{
    /* background-color: red; */
    /* background-color: v-bind('color'); */
    /* background:'yellow'; */
  }
</style>
