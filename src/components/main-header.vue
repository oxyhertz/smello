<template>
  <header class="main-header flex space-between" :class="{ 'header-bg-color': isBoard }">
    <div class="flex">
      <span class="menu-btn"></span>
      <section class="header-logo flex align-items">
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
            class
          />
        </svg>
        <span class="logo">Trello</span>
      </section>

      <div class="create-board-container flex align-items">
        <button
          class="create-btn"
          @click="isCreateBoard = !isCreateBoard"
          :class="{ 'light-btn-bg': isBoard }"
        >Create</button>
        <createBoard @closeCreateModal="isCreateBoard = false" v-if="isCreateBoard"></createBoard>
      </div>
    </div>

    <section class="flex align-items">
      <span class="search-icon-header">
        <label for="tdE9Z4jFsBrsmjAbSKgDoVhPIR7SBy9S">
          <span class="nch-icon _3W-26fmi3tFfon _1X1mC-Jr6D4C2k _2yNU7HZlDagCbE">
            <span class="sc-bdVaJa ifeHxY" role="img" aria-label="SearchIcon">
              <svg
                width="24"
                height="24"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.2269 17.4164 13.8175 16.4356 15.0852L20.3769 19.0953C20.764 19.4892 20.7586 20.1223 20.3647 20.5095C19.9708 20.8966 19.3376 20.8911 18.9505 20.4972L15.0129 16.4909C13.7572 17.4383 12.1942 18 10.5 18ZM16 10.5C16 13.5376 13.5376 16 10.5 16C7.46243 16 5 13.5376 5 10.5C5 7.46243 7.46243 5 10.5 5C13.5376 5 16 7.46243 16 10.5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </span>
        </label>
      </span>
      <input
        class="main-header-input"
        v-model="search"
        placeholder="       Search"
        :prefix-icon="Search"
      />
      <div>
        <span class="info-header flex" role="img" aria-label="InformationIcon">
          <svg
            width="24"
            height="24"
            role="presentation"
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="currentColor"
            />
            <path
              d="M11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11Z"
              fill="currentColor"
            />
            <path
              d="M13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
      <i class="fa-regular fa-bell notification-header"></i>
      <avatar size="32" color="white" :name="member.fullname" class="avatar-header"></avatar>
    </section>
  </header>
</template>


<script>
import { Search } from '@element-plus/icons-vue';
import createBoard from './create-board.vue';
import Avatar from 'vue3-avatar';

export default {
  data() {
    return {
      search: '',
      isCreateBoard: false,
      Search,
    };
  },
  methods: {
    home() {
      this.$router.push('/home');
    },
  },
  computed: {
    member() {
      return this.$store.getters.user;
    },
    isBoard() {
      return this.$store.getters.currBoard
    }
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
