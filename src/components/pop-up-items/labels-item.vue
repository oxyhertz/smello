<template>
  <div v-if="board" class="labels-item">
    <input type="text" placeholder="Search labels..." />
    <h3>Labels</h3>
    <ul>
      <li
        class="label"
        v-for="label in board.labels"
        :key="label._id"
        :style="{ 'background-color': label.color }"
      >
        <span>{{ label.title }}</span>
      <div class="hover-marker"></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["board"],
};
</script>
<style>
</style>