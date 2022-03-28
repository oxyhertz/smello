<template >
  <section v-if="board" class="members-item">
    <input type="text" placeholder="Search members" @input="findMembers" />
    <h3>Board members</h3>
    <ul>
      <li
        v-for="member in board.members"
        :key="member._id"
        class="member flex align-items space-between"
        @click.stop="addMember(member)"
      >
        <div class="member-container flex align-items justify-center">
          <div class="avatar">
            <avatar :size="32" color="white" :name="member.fullname"></avatar>
          </div>
          <span class="name">{{ member.username }}</span>
        </div>
        <!-- <span class="username">({{ member.username }})</span> -->
        <span class="icon-complete" v-if="currTaskMembersIds.includes(member._id)"></span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ['board'],
  data() {
    return {

    }
  },
  methods: {
    addMember({ fullname, username, imgUrl, _id }) {
      const member = {
        type: 'members',
        item: {
          fullname,
          username,
          imgUrl,
          _id,
        }
      }
      this.$emit('addItem', member);
    },
  },
  computed: {
    boardMembers() {
      return this.board.members.map(member => member.fullname)
    },
    currTask() {
      return this.$store.getters.currTask
    },
    currTaskMembersIds() {
      let members = this.currTask.members
      if (members) {
        return members.map(member => member._id)
      } else return []
    }
  }
};
</script>
