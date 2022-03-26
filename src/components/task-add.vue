<template>
  <section v-if="isCreating" class="task-add open">
    <textarea
      v-focus
      v-model="title"
      type="textarea"
      placeholder="Enter a title for this card..."
      class="inline-input"
    />
    <section class="add-task-btns">
      <button @click="addTask" class="add-card-btn">Add card</button>
      <i class="fa-solid fa-x close-btn" @click="isCreating = false"></i>
    </section>
  </section>

  <section v-else @click="isCreating = true" class="task-add">
  <span class="plus-icon"></span>
   <span class="add-task-txt">Add a card</span>
   </section>
</template>

<script>
export default {
  data() {
    return {
      isCreating: null,
      title: "",
    };
  },
  methods: {
    addTask() {
      if (!this.title) return
      this.$emit("addTask", this.title);
      this.isCreating = null;
      this.title = '';
    },
  },
};
</script>

<style>
</style>