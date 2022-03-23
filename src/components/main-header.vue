<template>
  <header class="main-header flex space-between">
    <section class="header-container flex">
<<<<<<< HEAD
     <div class="header-logo">
        <img class="logo-img" src="../images/logo.png" alt="trello logo">
        <span>Trello</span>
     </div>
      <button class="create-btn" @click="isCreateBoard = !isCreateBoard">Create</button>
=======
      <button class="nav-btn">...</button>
      <div class="logo" @click="home">Trello</div>
      <button class="starred-btn header-cmp">
        Starred
        <svg
          width="24"
          height="24"
          role="presentation"
          focusable="false"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      <button class="create-btn header-cmp">Create</button>
>>>>>>> 20b39790fdd71bd201c3ffbb2e4fd794993a8086
    </section>
    <section class="flex">
          <el-input
          v-model="search"
          placeholder="Search"
          size="small"
        />
    </section>
    <div>
      <i class="fa-regular fa-bell"></i>
    </div>
    <div>
  
    </div>
    <div v-if="isCreateBoard" class="create-modal">
        <input type="text" placeholder="Board title">
        <h3>Create Modal</h3>
    </div>
  </header>
</template>


<script>
import { Search } from '@element-plus/icons-vue'

export default {
    data(){
        return{
            search:'',
            isCreateBoard: false,
        }
    },
<<<<<<< HEAD
    components: {
  },
=======
    methods:{
      home(){
        this.$router.push('/home')
      }

    },
>>>>>>> 20b39790fdd71bd201c3ffbb2e4fd794993a8086
};
</script>

<style>
.main-input {
  cursor: pointer;
  height: 32px;
  border-radius: 3px;
  padding: 6px;
  border: none;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  flex: 1;
  max-width: 200px;
  color: #172b4d;
  outline: 0;
}
</style>
