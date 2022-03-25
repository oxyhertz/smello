<template>
  <div v-if="board && !isCreating" class="labels-item">
    <input type="text" placeholder="Search labels..." />
    <h3>Labels</h3>
    <ul>
      <li class="label" v-for="label in board.labels" :key="label._id">
        <span :style="{ 'background-color': label.color }" class="label-txt">{{
          label.title
        }}</span>
        <div :class="{ 'hover-marker': null }"></div>
        <span @click="editLabel" class="edit-labels"></span>
      </li>
    </ul>
    <button @click="isCreating = true" class="create-label-btn">
      Create a new label
    </button>
  </div>
  <section v-else>
    <h3>Select a color</h3>
    <color-picker @updateColor="updateBgColor"></color-picker>
    <div class="labels-actions flex space-between">
      <button class="save">Save</button>
      <button class="delete-label">Delete</button>
    </div>
  </section>
</template>

<script>
import colorPicker from "../../components/color-picker.vue";
export default {
  props: ["board"],
  data() {
    return {
      isCreating: null,
    };
  },
  methods: {
    editLabel() {},
    addLabel(color, title) {
      const item = {
        type: "labels",
        item: {
          color,
          title,
        },
      };
      this.$emit("addItem", item);
    },
  },
  components: {
    colorPicker,
  },
};
</script>
<style>
.create-label-btn {
  padding: 28px;
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>