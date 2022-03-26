<template>
  <Draggable v-if="task">
    <section class="task-preview" :style="taskStyle">
      <div class="dark-wrap" v-if="this.task.cover?.imgUrl && this.task.cover.type === 'inline' "></div>
      <div class="task-preview-cover" :style="coverStyle"  v-if="task.cover?.type === 'header'"></div>
        <p>{{ task.title }}</p>
      <div class="icon-container flex">

        <div class="preview-icon" v-if="task.description">
          <span class="icon-description"></span>
        </div>

        <div class="preview-icon" v-if="task.attachments?.length">
          <span class="icon-attachment"></span>
          <p>{{ task.attachments?.length }}</p>
        </div>

        <div class="preview-icon" v-if="task.checklists?.length && numOfTodos" :class="{completed: tasksDone === numOfTodos}">
          <span class="icon-checklist"></span>
          <p>{{ tasksDone }} / {{ numOfTodos }}</p>
        </div>

      </div>
      <!-- <button @click.stop="removeTask">Delete</button> -->
    </section>
  </Draggable>
</template>

<script>
import { Draggable } from 'vue3-smooth-dnd';

export default {
  name: 'task-preview',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },
  components: {
    Draggable,
  },
  methods: {
    removeTask() {
      this.$emit('removeTask', this.task._id)
    }
  },
  computed: {
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
    coverStyle(){
      if(this.task.cover?.color && !this.task.cover.imgUrl)
        return {'background-color':this.task.cover.color};
      if(this.task.cover?.imgUrl){
        return {'background-image': 'url('+this.task.cover.imgUrl+')','height':'260px'}
      }  
      
    },
    taskStyle(){
      console.log(this.task.cover)
      if(this.task.cover?.type === 'inline'){
          const style = {
            'background-color': this.task.cover.color,
            'font-weight' : 500,
            'font-size' : '16px',
            'padding-top' : '30px',
            'background-image': 'url('+this.task.cover.imgUrl+')',
            'min-height': '260px'

          }
          return style 
      }
    }
  }
};
</script>