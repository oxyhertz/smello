<template>
  <Datepicker v-model="date" inline autoApply></Datepicker>
  <button @click="log" class="save">save</button>
</template>


<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

export default {
  components: { Datepicker },
  data() {
    return {
      date: ref(Date.now()),
    };
  },
  methods:{
      log(){
      console.log(this.date);
      }
  }
};
</script>