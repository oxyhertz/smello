<template>
  <Datepicker v-model="date" inline autoApply></Datepicker>
  <button @click="saveDueDate" class="save">save</button>
</template>


<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref } from 'vue';

export default {
  components: { Datepicker },
  data() {
    return {
      date: ref(Date.now()),
    };
  },

  methods: {
    saveDueDate() {
      const date = {
        type: 'dueDate',
        item: (Date.parse((this.date))),
      }
      this.$emit('addItem', date);
    }
  }
};
</script>