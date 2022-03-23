<template>
    <section class="board-menu-favorite">
        <i @click="toggleFavorite" :class="favoriteIcon"></i>
    </section>
</template>


<script>
export default {
    name: 'board-menu-favorite',
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
            this.isFavorite = !this.isFavorite
            this.$emit('toggleFavorite', this.isFavorite)
        }
    },
    computed: {
        favoriteIcon() {
            return this.isFavorite ? 'fa-solid fa-star' : 'fa-regular fa-star'
        }
    }
}
</script>

<style>

</style>