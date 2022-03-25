<template>
  <div v-if="board && !isCreating" class="labels-item">
    <input type="text" placeholder="Search labels..." />
    <h3>Labels</h3>
    <ul>
      <li class="label" v-for="label in board.labels" :key="label._id">
        <span
          @click="addLabel(label._id)"
          :style="{ 'background-color': label.color }"
          class="label-txt"
          >{{ label.title }}</span
        >
        <div :class="{ 'hover-marker': null }"></div>
        <span @click="editLabel" class="edit-labels"></span>
      </li>
    </ul>
    <button @click="isCreating = true" class="create-label-btn">
      Create a new label
    </button>
  </div>
  <section v-else>
    <h3>Name</h3>
    <input type="text" v-model="title" />
    <h3>Select a color</h3>
    <color-picker @updateColor="updateColor"></color-picker>
    <div class="labels-actions flex space-between">
      <button class="save create" @click="createLabel">Create</button>
    </div>
  </section>
</template>

<script>
import colorPicker from "../../components/color-picker.vue";
import { utilService } from "../../services/utils-service";
export default {
  props: ["board"],
  data() {
    return {
      isCreating: null,
      title: "",
      color: "",
      boardLabels: null,
    };
  },
  created() {
    this.boardLabels = JSON.parse(JSON.stringify(this.board.labels));
  },
  computed: {},
  methods: {
    updateColor(selectedColor) {
      this.color = selectedColor;
    },
    createLabel() {
      const item = {
        type: "labels",
        item: {
          color: this.color,
          title: this.title,
          _id: utilService.makeId(),
        },
      };
      this.boardLabels.push(item.item);
      var updatedLabels = this.boardLabels;
        this.$emit("updateLabels", updatedLabels, item);
    },
    addLabel(id) {
      const item = {
        type: "labels",
        item: {
          _id: id,
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