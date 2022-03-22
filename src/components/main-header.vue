<template>
  <header class="main-header flex space-between">
    <section class="header-container flex">
      <button class="nav-btn">...</button>
      <section class="logo">Trello</section>
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
    </section>
    <section class="flex">
      <el-input
        v-model="input3"
        class="w-50 m-2 header-cmp input"
        size="small"
        placeholder="Search"
        :prefix-icon="Search"
      />
    </section>
  </header>
</template>


<script>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
export default {
    data(){
        return{
            input3:ref(''),
            Search,
        }
    }
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
