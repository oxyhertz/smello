<template>
  <div v-if="isCreating">
    <textarea
      v-focus
      v-model="title"
      type="textarea"
      :style="{ resize: 'none' }"
      placeholder="Please input"
    />
    <div class="add-task-btns">
      <button @click.prevent="addTask">Add card</button>
      <button @click.prevent="isCreating = false">X</button>
    </div>
  </div>
  <div v-else @click="isCreating = true">+ Add a card</div>
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