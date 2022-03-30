<template>
  <div v-if="board && !isCreating" class="labels-item">
    <input
      type="text"
      placeholder="Search labels..."
      v-focus
      class="label-item-input"
      v-model="filterBy.title"
    />
    <h3>Labels</h3>
    <ul>
      <li class="label" v-for="label in getRelevantLabels" :key="label._id">
        <div
          class="hover"
          :style="{ 'background-color': label.color }"
          :class="{ 'hover-marker': null }"
        ></div>
        <span
          @click="addLabel(label._id)"
          :style="{ 'background-color': label.color }"
          class="label-txt"
        >{{ label.title }}</span>
        <span
          @click.stop="updateCurrData(label), (isCreating = true)(isEditing = true)"
          class="edit-labels"
        ></span>
      </li>
    </ul>
    <button @click="setLabel(), (isCreating = true)" class="create-label-btn">Create a new label</button>
  </div>
  <section v-else>
    <h3>Name</h3>
    <input type="text" v-model="title" v-focus class="label-item-input" />
    <h3>Select a color</h3>
    <color-picker @updateColor="updateColor"></color-picker>
    <div class="labels-actions flex space-between">
      <button class="save create flex" @click="setLabel()">Save</button>
      <!-- <button v-if="isEditing" class="delete-label flex" @click="setLabel('delete')">Delete</button> -->
      <button v-if="isEditing" class="delete-label flex">Delete</button>
    </div>
  </section>
</template>

<script>
import colorPicker from '../../components/color-picker.vue';
import { utilService } from '../../services/utils-service';

export default {
  props: ['board'],
  data() {
    return {
      filterBy: {
        title: ''
      },
      isCreating: null,
      isEditing: null,
      title: '',
      color: '',
      // boardLabels: null,
      currentTaskId: '',
    };
  },
  created() {
    // this.boardLabels = JSON.parse(JSON.stringify(this.board.labels));
    // this.boardLabels = this.board.labels;
    if (!this.board) console.log('noboard')
    console.log(this.board)
  },
  computed: {
    getRelevantLabels() {
      let labels = JSON.parse(JSON.stringify(this.boardLabels));
      const regex = new RegExp(this.filterBy.title, 'i');
      return labels.filter(label => regex.test(label.title));
    },
    boardLabels() {
      return JSON.parse(JSON.stringify(this.board.labels))
    }
  },
  methods: {
    updateCurrData(label) {
      this.currentTaskId = label._id
      this.title = label.title
      this.color = label.color
    },
    updateColor(selectedColor) {
      this.color = selectedColor;
    },
    setLabel() {
      if (!this.color) return;
      var id = this.currentTaskId || utilService.makeId();
      const item = {
        type: 'labels',
        item: {
          color: this.color,
          title: this.title,
          _id: id,
        },
      };
      // if (order === 'delete') {
      //   var idx = this.boardLabels.findIndex(
      //     (label) => label._id === this.currentTaskId
      //   );
      //   this.boardLabels.splice(idx, 1);
      //   item.order = 'delete'
      //   this.$emit('updateLabels', this.boardLabels, item);
      //   return this.$emit('addItem', item);

      // }
      if (this.currentTaskId) {
        var idx = this.boardLabels.findIndex(
          (label) => label._id === this.currentTaskId
        );
        this.boardLabels.splice(idx, 1, item.item);
      } else {
        this.boardLabels.push(item.item);
      }
      var updatedLabels = this.boardLabels;
      this.$emit('updateLabels', updatedLabels, item);
      this.currentTaskId = '';
    },
    addLabel(id) {
      const item = {
        type: 'labels',
        item: {
          _id: id,
        },
      };
      console.log('additem')
      this.$emit('addItem', item);
    },
  },
  components: {
    colorPicker,
  },
  // watch: {
  //   'boardLabels'() {
  //   },
  //   deep: true,
  // }
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