<template>
    <header class="board-menu">
        <h2>board menu</h2>
        <board-menu-title @editTitle="editTitle" :title="boardTitle" :createdBy="boardCreatorId"/>
        <board-menu-favorite @toggleFavorite="toggleFavorite" :favorite="boardFavoriteStatus"/>
        <members-preview :board="board" />
        <div class="invite-members-container">
            <button @click="isInviteModal = !isInviteModal">Invite</button>
            <invite-members v-if="isInviteModal" />
        </div>
    </header>
</template>

<script>
import boardMenuTitle from './board-menu/board-menu-title.vue';
import boardMenuFavorite from './board-menu/board-menu-favorite.vue';
import membersPreview from './members-preview.vue';
import inviteMembers from './invite-members.vue';
export default {
    name: 'board-menu',
    emits: ['editTitle', 'toggleFavorite'],
    props:{
        board:Object
    },
    data(){
        return{
            isInviteModal: false,
        }
    },
    components: {
        boardMenuTitle,
        boardMenuFavorite,
        membersPreview,
        inviteMembers
    },
    methods: {
        editTitle(title) {
            this.$emit('editTitle', title);
        },
        toggleFavorite(isFavorite) {
            this.$emit('toggleFavorite', isFavorite);
        }
    },
    computed: {
        boardTitle() {
            return this.$store.getters.currBoard?.title
        },
        boardFavoriteStatus() {
            return this.$store.getters.currBoard?.isFavorite
        },
        boardCreatorId() {
            return this.$store.getters.currBoard?.createdBy?._id;
        }
    }
}
</script>