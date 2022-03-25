<template >
  <section v-if="board" class="members-item">
    <input type="text" placeholder="Search members" />
    <h3>Board members</h3>
    <ul>
      <li
        v-for="member in board.members"
        :key="member._id"
        class="member flex align-items"
        @click.stop="addMember(member)"
      >
        <div class="avatar">
          <avatar :size="32" color="white" :name="member.fullname"></avatar>
        </div>
        <span class="name">{{ member.fullname }}</span>
        <span class="username">({{ member.username }})</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ["board"],
  methods: {
    addMember({fullname, username, imgUrl, _id}) {
      const member = {
        type: 'members',
        item:{
          fullname,
          username,
          imgUrl,
          _id,
        }
      }
      this.$emit('addItem',member);
    },
  },
};
</script>

<style>
</style>