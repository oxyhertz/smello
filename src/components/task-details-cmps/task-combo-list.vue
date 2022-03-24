<template>
  <section class="task-combo-list flex wrap">
    <section v-if="members" class="members flex column">
      <h3>Members</h3>
      <section class="flex">
        <div v-for="member in members" :key="member._id">
          <avatar
            :size="32"
            color="white"
            :name="member.fullname"
            class="avatar"
          ></avatar>
        </div>
        <span class="combo-add-icon"></span>
      </section>
    </section>
    <section v-if="taskLabels" class="labels flex column">
      <h3>Labels</h3>
      <section class="flex">
        <div v-for="label in taskLabels" :key="label._id">
          <span :style="{ 'background-color': label.color }">{{
            label.title
          }}</span>
        </div>
        <div class="combo-add-icon label"></div>
      </section>
    </section>
    <section v-if="dueDate" class="due-date">
      <h3>Due date</h3>
      <section class="flex">
        <input type="checkbox" />
        <div>{{ date }}</div>
      </section>
    </section>
  </section>
</template>

<script>
import moment from "moment";

export default {
  props: ["comboData"],
  data() {
    return {
      members: null,
      labelIds: null,
      dueDate: null,
    };
  },
  created() {
    this.members = this.comboData.members;
    this.labelIds = this.comboData.labelIds;
    this.dueDate = this.comboData.dueDate;
  },
  methods: {},
  computed: {
    boardLabels() {
      return this.$store.getters.currBoard.labels;
    },
    taskLabels() {
      return this.labelIds.map((lableId) => {
        return this.boardLabels.find(
          (boardLable) => boardLable._id === lableId
        );
      });
    },
    date() {
      return moment(this.dueDate).format("lll");
    },
  },
};
</script>

