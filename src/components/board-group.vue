<template>
  <Container
    group-name="cols"
    tag="div"
    orientation="horizontal"
    drag-class="dragging"
    @drop="onColumnDrop($event)"
  >
    <Draggable class v-for="group in scene.groups" :key="group._id">
      <section class="group-container">
        <section class="group-title">
          <textarea class="group-title inline-input">{{ group.title }}</textarea>
          <span class="menu-icon"></span>
        </section>

        <Container
          class
          orientation="vertical"
          group-name="col-items"
          :shouldAcceptDrop="
            (e, payload) => e.groupName === 'col-items' && !payload.loading
          "
          :get-child-payload="getCardPayload(group._id)"
          :drop-placeholder="{
            className: `drag-placeholder-task`,
          }"
          drag-class="dragging"
          @drop="(e) => onCardDrop(group._id, e)"
        >
          <!-- tasks -->
          <task-preview
            @removeTask="removeTask($event, group._id)"
            v-for="task in group.tasks"
            @click="openTask(board, group, task)"
            :key="task._id"
            :task="task"
          />
        </Container>
        <task-add @addTask="addTask($event, group._id)" />
      </section>
    </Draggable>
    <add-group @add="addGroup" />
  </Container>
  <div class="overlay" :class="{ 'open-overlay': isTaskDetail }" @click.stop="closeModal"></div>
  <task-details-modal v-if="isTaskDetail" @editTask="editTask" />
</template>

<script>
// @click="openTaskDetails(group._id, task._id)"
import { Container, Draggable } from 'vue3-smooth-dnd';
import taskPreview from './task-preview.vue';
import taskAdd from './task-add.vue';
import addGroup from '../components/add-group.vue';
import taskDetailsModal from '../components/task-details-modal.vue'

export default {
  name: 'board-group',
  emits: ['columnChange', 'addGroup', 'removeTask', 'addTask', 'taskChange', 'editTask', 'cleanStore'],
  props: {
    groups: {
      type: Array,
      required: true,
    },
    board: Object
  },
  data() {
    return {
      scene: { groups: this.groups },
      isTaskDetail: false
    };
  },
  components: {
    Container,
    Draggable,
    taskPreview,
    taskAdd,
    addGroup,
    taskDetailsModal
  },
  methods: {
    openTask(board, group, task) {
      this.isTaskDetail = true;
      this.$store.commit({ type: 'setCurrGroup', group })
      this.$store.commit({ type: 'setCurrTask', task })
    },
    addGroup(title) {
      this.$emit('addGroup', title);
    },
    removeTask(taskId, groupId) {
      const task = {
        taskId,
        groupId,
      };
      this.$emit('removeTask', task);
    },
    addTask(title, groupId) {
      const task = {
        title,
        groupId,
      };

      this.$emit('addTask', task);
    },
    editTask(editedTask) {
      this.$emit('editTask', editedTask);
    },
    closeModal() {
      this.isTaskDetail = false
      this.$emit('cleanStore', ['Task', 'Group']);
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;
      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    },
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.scene);
      scene.groups = this.applyDrag(scene.groups, dropResult);
      this.scene = scene;
      this.$emit("columnChange", this.scene.groups);
    },
    onCardDrop(columnId, dropResult) {
      // check if element where ADDED or REMOVED in current collumn
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene);
        const column = scene.groups.filter((p) => p._id === columnId)[0];
        const itemIndex = scene.groups.indexOf(column);
        const newColumn = Object.assign({}, column);
        // check if element was ADDED in current column
        if (dropResult.removedIndex == null && dropResult.addedIndex >= 0) {
          // your action / api call
          // dropResult.payload.loading = true
          // simulate api call
          // setTimeout(function () { dropResult.payload.loading = false }, (Math.random() * 5000) + 1000);
        }
        newColumn.tasks = this.applyDrag(newColumn.tasks, dropResult);
        // this.$emit('groupChange', {idx: itemIndex, newCol: newColumn})
        // this.$store.dispatch({ type: "groupDND", groupIdx: itemIndex, newGroup: newColumn });
        // this.$emit('drop', {idx: itemIndex, newColumn});
        // scene.groups.splice(itemIndex, 1, newColumn)
        // this.scene = scene
        this.$emit('taskChange', { groupIdx: itemIndex, newGroup: newColumn })
      }
    },
    getCardPayload(columnId) {
      return (index) => {
        return this.scene.groups.filter((p) => p._id === columnId)[0].tasks[
          index
        ];
      };
    },
  },
};
</script>

<!-- <style>
/** NB: dont remove, 
* When using orientation="horizontal" it auto sets "display: table"
* In this case we need flex and not display table  
*/
.smooth-dnd-container.horizontal {
  display: flex !important;
}
</style> -->

