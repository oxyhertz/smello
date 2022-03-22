<template>
  <div v-if="isCreating">
    <el-input
      v-model="desc"
      :autosize="{ minRows: 2, maxRows: 4 }"
      type="textarea"
      placeholder="Please input"
    />
  </div>
  <div v-else @click="isCreating = !isCreating">+ Add a card</div>
</template>

<script>
import { ref } from "vue";
export default {
  data() {
    return {
      isCreating: null,
      desc: ref(""),
    };
  },
};
</script>

<style>
</style>