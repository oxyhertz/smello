<template>
  <div v-if="isOpen" v-click-outside="closeMenu" class="board-menu-modal" :class="{ open: isOpen }">
    <header>
      <span class="icon-back" v-if="currSection !== 'Menu'" @click="goBack"></span>
      <h3 v-if="currSection === 'Menu'">Menu</h3>
      <h3 v-if="currSection === 'changeBg'">Change background</h3>
      <h3 v-if="currSection === 'bgPhotos'">Photos by Unsplash</h3>
      <h3 v-if="currSection === 'colorPicker'">Colors</h3>
      <span class="icon-cancel" @click="closeMenu"></span>
    </header>
    <main v-if="currSection === 'Menu'">
      <section class="about-board">
        <div>
          <span class="icon-trello"></span>
          <p>About this board</p>
        </div>
        <div @click="currSection = 'changeBg'">
          <span :style="boardBgStyle" class="bg-icon"></span>
          <p>Change background</p>
        </div>
      </section>
    </main>
    <change-bg @setBg="setBg" @changeCmp="changeCmp" v-if="currSection === 'changeBg'"></change-bg>
    <bg-photos @setBg="setBg" v-if="currSection === 'bgPhotos'"></bg-photos>
    <color-picker class="wide" @updateColor="setBg" v-if="currSection === 'colorPicker'"></color-picker>
    <section>
      <ul>
        <li v-for="activity in board.activities" :key="activity._id">
          <div></div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>

import changeBg from './board-menu-change-bg.vue'
import bgPhotos from './background-photos.vue'
import colorPicker from './color-picker.vue';
export default {
  props: {
    isOpen: Boolean,
    board: Object
  },
  data() {
    return {
      currSection: 'Menu'
    }
  },
  created() {
  },
  unmounted() {
    this.currSection = 'Menu'
  },
  methods: {
    closeMenu() {
      this.$emit('closeMenu')
      this.currSection = 'Menu'
    },
    changeCmp(cmp) {
      this.currSection = cmp
    },
    setBg(bg, type = 'bgImg') {

      if (type === 'bgColor') this.$emit('setBg', { type, val: bg })
      else this.$emit('setBg', bg)
    },
    goBack() {
      if (this.currSection === 'changeBg') this.currSection = 'Menu'
      if (this.currSection === 'bgPhotos') this.currSection = 'changeBg'
      if (this.currSection === 'colorPicker') this.currSection = 'changeBg'
    },
    setBgColor(color) {
      this.$emit('setBgColor')
    }

  },
  computed: {
    boardBgStyle() {
      return { 'background-color': this.board.style.bgColor, 'background-image': 'url(' + this.board.style.bgImg + ')' }
    }
  },
  components: {
    changeBg,
    bgPhotos,
    colorPicker
  }
};
</script>

<style>
.board-menu-modal h4 {
  margin: 0;
  flex-grow: 1;
  text-align: center;
  color: #5e6c84;
  font-weight: 500;
}
</style>