<template>
  <header class="board-header flex space-between">
    <section class="menu-left-header">
      <button class="btn">
        <span class="board-header-board-icon"></span> Board
        <span class="board-header-open-icon"></span>
      </button>

      <board-header-title
        :style="{ color: 'black' }"
        @editTitle="editTitle"
        :title="boardTitle"
        :createdBy="boardCreatorId"
      />

      <board-header-favorite
        class="board-header-invite btn"
        @toggleFavorite="toggleFavorite"
        :favorite="boardFavoriteStatus"
      />

      <members-preview :board="board" />

      <div class="invite-members-container">
        <button class="btn" @click="isInviteModal = !isInviteModal">
          <span class="board-header-invite-icon"></span> Invite
        </button>

        <invite-members
          :board="board"
          @closeInviteModal="closeModal"
          @addMember="addMember"
          v-if="isInviteModal"
          v-click-outside="closeModal"
        />
      </div>
    </section>

    <section>
      <button class="btn" @click="isFilterModal = !isFilterModal">
        <span class="board-header-filter-icon"></span>Filter
      </button>

      <button class="btn show-menu" @click="toggleBoardMenu">
        <span class="board-header-menu-icon"></span>Show menu
      </button>

      <board-filter
        @setFilter="setFilter"
        v-click-outside="closeFilterModal"
        @closeFilter="closeFilterModal"
        v-if="isFilterModal"
        :board="board"
      />
      <board-menu-modal
        @setBg="setBg"
        :board="board"
        :isOpen="isMenuModal"
        @closeMenu="isMenuModal = false"
      />
    </section>
  </header>
</template>

<script>
import boardHeaderTitle from "./board-header/board-header-title.vue";
import boardHeaderFavorite from "./board-header/board-header-favorite.vue";
import membersPreview from "./members-preview.vue";
import inviteMembers from "./invite-members.vue";
import boardMenuModal from "./board-menu-modal.vue";
import boardFilter from './board-filter.vue'
import BoardFilter from './board-filter.vue';

export default {
  name: "board-header",
  emits: ["editTitle", "toggleFavorite"],
  props: {
    board: Object,
  },
  data() {
    return {
      isInviteModal: false,
      isMenuModal: false,
      isFilterModal: false
    };
  },
  components: {
    boardHeaderTitle,
    boardHeaderFavorite,
    membersPreview,
    inviteMembers,
    boardMenuModal,
    boardFilter,
    BoardFilter
  },
  methods: {
    editTitle(title) {
      this.$emit('editTitle', title);
    },
    toggleFavorite(isFavorite) {
      this.$emit('toggleFavorite', isFavorite);
    },
    closeModal() {
      this.isInviteModal = false;
    },
    closeFilterModal() {
      this.isFilterModal = false
    },
    toggleBoardMenu() {
      this.isMenuModal = !this.isMenuModal;
    },
    addMember(member) {
      console.log(member)
      this.$emit('addMember', member)
    },
    setBg(bg) {
      this.$emit('setBg', bg)
    },
    setFilter(filterBy) {
      this.$emit('setFilter', filterBy)
    }
  },
  computed: {
    boardTitle() {
      return this.$store.getters.currBoard?.title;
    },
    boardFavoriteStatus() {
      return this.$store.getters.currBoard?.isFavorite;
    },
    boardCreatorId() {
      return this.$store.getters.currBoard?.createdBy?._id;
    },
  },
};
</script>
