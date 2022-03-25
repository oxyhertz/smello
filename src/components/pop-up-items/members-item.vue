<template v-if="members">
  <h3>Board members</h3>
  <ul>
    <li v-for="member in members" :key="member._id">
      <div>
           <avatar :size="28" color="white" :name="member.fullname"></avatar>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props:['members']
};
</script>

<style>
</style>