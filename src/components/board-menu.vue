<template>
    <header class="board-menu">
        <h2>board menu</h2>
        <board-menu-title @editTitle="editTitle" :title="boardTitle" :createdBy="boardCreatorId"/>
        <board-menu-favorite @toggleFavorite="toggleFavorite" :favorite="boardFavoriteStatus"/>
    </header>
</template>

<script>
import boardMenuTitle from './board-menu/board-menu-title.vue';
import boardMenuFavorite from './board-menu/board-menu-favorite.vue';

export default {
    name: 'board-menu',
    emits: ['editTitle', 'toggleFavorite'],
    components: {
        boardMenuTitle,
        boardMenuFavorite
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