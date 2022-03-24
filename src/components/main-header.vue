<template>
  <header class="main-header flex ">
    <section class="header-container flex">

      <span class="menu-btn"></span>
      <section class="header-logo">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="trello"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="trello-icon svg-inline--fa fa-trello fa-w-14 logo-img"
        >
          <path
            fill="currentColor"
            d="M392.3 32H56.1C25.1 32 0 57.1 0 88c-.1 0 0-4 0 336 0 30.9 25.1 56 56 56h336.2c30.8-.2 55.7-25.2 55.7-56V88c.1-30.8-24.8-55.8-55.6-56zM197 371.3c-.2 14.7-12.1 26.6-26.9 26.6H87.4c-14.8.1-26.9-11.8-27-26.6V117.1c0-14.8 12-26.9 26.9-26.9h82.9c14.8 0 26.9 12 26.9 26.9v254.2zm193.1-112c0 14.8-12 26.9-26.9 26.9h-81c-14.8 0-26.9-12-26.9-26.9V117.2c0-14.8 12-26.9 26.8-26.9h81.1c14.8 0 26.9 12 26.9 26.9v142.1z"
            class=""
          ></path>
        </svg>
        <span class="logo">Trello</span>
      </section>
      <!-- <span class="Starred">Starred <span></span> </span>
      <span class="sc-bdVaJa ifeHxY" role="img" aria-label="DownIcon"
        ><svg
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
          ></path></svg
      ></span> -->

      <div class="create-board-container">
        <button class="create-btn" @click="isCreateBoard = !isCreateBoard">
          Create
        </button>
        <createBoard
          @closeCreateModal="isCreateBoard = false"
          v-if="isCreateBoard"
        ></createBoard>
      </div>
      <section class="flex">
        <el-input v-model="search" placeholder="Search" size="small" />
      </section>
      <i class="fa-regular fa-bell"></i>
    </section>
  </header>
</template>


<script>
import { Search } from "@element-plus/icons-vue";
import createBoard from "./create-board.vue";
import Avatar from "vue3-avatar";
export default {
  data() {
    return {
      search: "",
      isCreateBoard: false,
    };
  },
  methods: {
    home() {
      this.$router.push("/home");
    },
  },
  components: {
    createBoard,
    Avatar,
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
