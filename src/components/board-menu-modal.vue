<template>
  <div v-if="isOpen" class="board-menu-modal" :class="{ open: isOpen }">
    <header>
      <h3>Menu</h3>
      <span class="close-board-modal" @click="closeMenu"></span>
    </header>
    <div class="about-board">
      <span class="icon-trello"></span>
      <p>About this board</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isOpen'],
  methods: {
    closeMenu() {
      this.$emit('closeMenu')
    }
  }
};
</script>

<style>
.board-menu-modal h4 {
  margin: 0;
  flex-grow: 1;
  text-align: center;
  color: #5e6c84;
  font-weight: 500;
}
</style>