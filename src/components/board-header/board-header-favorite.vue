<template>
    <section class="board-header-favorite" @click="toggleFavorite">
        <i :class="favoriteIcon"></i>
    </section>
</template>


<script>
export default {
    name: 'board-header-favorite',
    props: {
        favorite: Boolean
    },
    data() {
        return {
            isFavorite: this.favorite,
            isHovered: false
        }
    },
    methods: {
        toggleFavorite() {
            this.isFavorite = !this.isFavorite;
            this.$emit('toggleFavorite', this.isFavorite);
        }
    },
    computed: {
        favoriteIcon() {
            return this.isFavorite ? 'fa-solid fa-star' : 'fa-regular fa-star';
        }
    }
}
</script>

<style>
</style>