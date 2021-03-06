<template>
  <Draggable v-if="task">
    <div class="task-preview-container">
      <section
        class="task-preview"
        :style="taskStyle"
        @mouseover="editIcon = true"
        @mouseleave="editIcon = false"
        :class="{ 'on-quick-edit': isQuickEdit }"
        ref="tasky"
      >
        <span class="icon-edit" v-if="editIcon" @click.stop="quickEdit"></span>
        <div class="dark-wrap" v-if="this.task.cover?.imgUrl && this.task.cover.type === 'inline'"></div>
        <div class="task-preview-cover" :style="coverStyle" v-if="task.cover?.type === 'header'"></div>

        <div v-if="labels && this.task.cover?.type !== 'inline'" class="preview-icon labels">
          <div
            v-for="label, idx in labels"
            :key="idx"
            @click.stop="toggleLabels"
            class="label"
            :style="{ 'background-color': label.color }"
            :class="{ 'openLabel': labelStatus }"
          >{{ label.title }}</div>
        </div>
        <p
          v-if="!isQuickEdit"
          class="title"
          :class="{ 'pos-absolute': this.task.cover?.type === 'inline' && this.task.cover?.imgUrl }"
        >{{ task.title }}</p>
        <textarea
          v-model="taskCopy.title"
          @input="updateTask"
          v-if="isQuickEdit"
          name
          id
          cols="30"
          rows="10"
        ></textarea>
        <div class="icons">
          <div
            class="icon-container flex"
            v-if="this.task.cover?.type !== 'inline'"
            :class="{ 'p-b-10': task.status?.length || task.attachments?.length || task.checklists?.length && numOfTodos || task.members?.length }"
          >
            <div v-if="task.dueDate">
              <span
                class="preview-icon date"
                :style="{ 'font-size': 12 + 'px' }"
                :class="{ completed: task.status === 'completed', overdue: task.status === 'overdue' }"
              >
                <span class="clock-icon" v-if="task.status?.length"></span>
                {{ date }}
              </span>
            </div>
            <div class="preview-icon" v-if="task.description">
              <span class="icon-description"></span>
            </div>

            <div class="preview-icon" v-if="numOfComments">
              <span class="icon-chat"></span>
              <p>{{ numOfComments }}</p>
            </div>

            <div class="preview-icon" v-if="task.location">
              <span class="icon-location"></span>
            </div>

            <div class="preview-icon" v-if="task.attachments?.length">
              <span class="icon-attachment"></span>
              <p>{{ task.attachments?.length }}</p>
            </div>
            <div
              class="preview-icon"
              v-if="task.checklists?.length && numOfTodos"
              :class="{ completed: tasksDone === numOfTodos }"
            >
              <span class="icon-checklist"></span>
              <p>{{ tasksDone }} / {{ numOfTodos }}</p>
            </div>
          </div>
          <div class="preview-icon members" v-if="task.members?.length">
            <div v-for="member in task.members" :key="member._id" class="member">
              <avatar :size="28" color="white" :name="member.fullname"></avatar>
            </div>
          </div>
        </div>
        <!-- <button @click.stop="removeTask">Delete</button> -->
      </section>
      <quick-edit
        @removeTask="removeTask"
        @addItem="updateTask"
        :task="task"
        @openTask="openTask"
        :style="quickEditPos"
        v-if="isQuickEdit"
        :class="{ 'on-quick-edit': isQuickEdit }"
      ></quick-edit>
    </div>
    <div class="overlay" @click.stop="closeQuickEdit" :class="{ 'open-overlay': isQuickEdit }"></div>
  </Draggable>
</template>


<script>
import { Draggable } from 'vue3-smooth-dnd';
import moment from 'moment';
import quickEdit from './quick-edit.vue'

export default {
  name: 'task-preview',
  props: {
    task: {
      type: Object,
      required: true,
    },
    labelStatus: Boolean
  },
  data() {
    return {
      editIcon: false,
      isQuickEdit: false,
      taskCopy: null,
    };
  },
  mounted() {
  },
  created() {
    this.taskCopy = JSON.parse(JSON.stringify(this.task))

  },
  components: {
    Draggable,
    quickEdit
  },
  methods: {
    toggleLabel() {
      this.$store.commit({ type: 'toggleLabel' })
    },
    removeTask() {
      this.$emit('removeTask', this.task._id)
      this.$emit('onQuickEdit', false)
    },
    toggleLabels() {
      this.$emit('toggleLabels');
    },
    quickEdit() {
      this.$emit('onQuickEdit', true)
      this.isQuickEdit = true;
    },
    closeQuickEdit() {
      this.$emit('onQuickEdit', false)
      this.isQuickEdit = false
    },
    updateTask(_, editedTask = this.taskCopy) {
      this.$emit('updateTask', JSON.parse(JSON.stringify(editedTask)))
    },
    openTask() {
      this.closeQuickEdit()
      this.$emit('openTask')
    }
  },
  computed: {

    board() {
      return this.$store.getters.currBoard
    },
    labels() {
      if (!this.task.labelIds?.length) return false
      return this.task.labelIds.map(label => {
        return this.board.labels.find(currLabel => currLabel._id === label)
      })
    },
    date() {
      return moment(this.task.dueDate).format('lll').split(',')[0];
    },
    tasksDone() {
      const numOfDoneTodos = this.task.checklists.reduce((acc, { todos }) => {
        return acc + todos.reduce((acc, todo) => {
          return todo.isDone ? acc + 1 : acc;
        }, 0)
      }, 0)
      return numOfDoneTodos;
    },
    numOfTodos() {
      return this.task.checklists.reduce((acc, { todos }) => acc + todos.length, 0)
    },
    coverStyle() {
      if (this.task.cover?.color && !this.task.cover.imgUrl)
        return { 'background-color': this.task.cover.color };
      if (this.task.cover?.imgUrl) {
        return { 'background-image': 'url(' + this.task.cover.imgUrl + ')', 'height': '260px' }
      }
    },
    taskStyle() {
      if (this.task.cover?.type === 'inline') {
        const style = {
          'background-color': this.task.cover.color,
          'font-weight': 500,
          'font-size': '16px',
          'padding-top': '30px',
          'background-image': 'url(' + this.task.cover.imgUrl + ')',
          'min-height': this.task.cover.imgUrl ? '250px' : '',
          'color': '#fff',
          'padding-top': this.task.cover.imgUrl ? '215px' : '30px',
        }
        return style
      }
    },
    numOfComments() {
      if (!this.task.activities?.length) return 0;
      return this.task.activities.reduce((acc, activity) => activity.isComment ? acc + 1 : acc, 0);
    },
    quickEditPos() {
      let top = this.$refs.tasky.getBoundingClientRect().y;
      let right = this.$refs.tasky.getBoundingClientRect().right;
      let left = this.$refs.tasky.getBoundingClientRect().left;
      if (window.innerHeight - top - 210 < 0) {
        top = top - 210 + 40
      }
      if (window.innerWidth - right - 240 < 10) {
        console.log(window.innerWidth - right - 240)
        console.log('low')
        right = left - 245;
        return { top: top + 'px', left: right + 'px', 'align-items': 'flex-end' }
      }
      return { top: top + 'px', left: right + 'px' }

    }
  }
};
</script>