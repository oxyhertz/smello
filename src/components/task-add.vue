<template>
  <section v-if="isCreating" class="task-add">
    <textarea
      v-focus
      v-model="title"
      type="textarea"
      :style="{ resize: 'none' }"
      placeholder="Please input"
    />
    <section class="add-task-btns">
      <button @click="addTask">Add card</button>
      <button @click="isCreating = false">X</button>
    </section>
  </section>
  <section v-else @click="isCreating = true">+ Add a card</section>
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