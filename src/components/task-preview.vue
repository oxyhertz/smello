<template>
  <Draggable v-if="task">
    <section class="task-preview">
      <p>{{ task.title }}</p>
      <!-- <button @click.stop="removeTask">Delete</button> -->
    </section>
  </Draggable>
</template>

<script>
import { Draggable } from "vue3-smooth-dnd";

export default {
  name: "task-preview",
  data() {
    return {};
  },
  methods: {
    removeTask(){
        this.$emit("removeTask",this.task._id)
    }
  },
  components: {
    Draggable,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>