<template>
  <div v-if="isCreating">
    <textarea
      v-model="desc"
      type="textarea"
      :style="{ resize: none }"
      placeholder="Please input"
    />
    <div class="add-task-btns">
      <button @click="addTask">Add card</button>
      <button @click="isCreating = false">X</button>
    </div>
  </div>
  <div v-else @click="isCreating = true">+ Add a card</div>
</template>

<script>
export default {
  data() {
    return {
      isCreating: null,
      desc: "",
    };
  },
  methods: {
    addTask() {
      this.$emit("updateBoard", this.desc);
      this.isCreating = null;
    },
  },
};
</script>

<style>
</style>