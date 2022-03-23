<template>
  <header class="main-header flex space-between">
    <section class="header-container flex">
     <div class="header-logo">
        <img class="logo-img" src="../images/logo.png" alt="trello logo">
        <span>Trello</span>
     </div>
      <button class="create-btn" @click="isCreateBoard = !isCreateBoard">Create</button>
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
    methods:{
      home(){
        this.$router.push('/home')
      }

    },
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
