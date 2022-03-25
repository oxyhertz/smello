<template >
<section v-if="board" class="members-item">
  <input type="text" placeholder="Search members">
  <h3>Board members</h3>
  <ul>
    <li v-for="member in board.members" :key="member._id" class="member flex align-items">
      <div>
           <avatar :size="31" color="white" :name="member.fullname"></avatar>
      </div>
      <span class="name">{{member.fullname}}</span>
      <span class="username">({{member.username}})</span>
    </li>
  </ul>
  </section>
</template>

<script>
export default {
  props:['board']
};
</script>

<style>
</style>