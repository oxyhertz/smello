<template>
  <div v-if="isOpen" class="board-menu-modal flex" :class="{ open: isOpen }">
    <h4>Menu</h4>
    <span class="close-board-modal"></span>
  </div>
</template>

<script>
export default {
  props: ['isOpen'],
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