<template>
    <li :style="boardStyle" v-if="board">
        {{ board.title }}
        <section class="star" @click.stop="toggleFavorite(board._id)">
            <i v-if="!board.isFavorite" class="fa-regular fa-star"></i>
            <i v-else class="fa-solid fa-star"></i>
            <div class></div>
        </section>
    </li>
</template>

<script>
export default {
    name: 'board-preview',
    emits: ["toggleFavorite"],
    props: {
        board: Object
    },
    methods: {
        toggleFavorite(id) {
            this.$emit('toggleFavorite', id);
        }
    },
    computed: {
        boardStyle() {
            let style = {
                'background-color': this.board.style.bgColor ? this.board.style.bgColor : '',
                'background-image': this.board.style.bgImg ? `url(${this.board.style.bgImg})` : ''
            }
            return style
        }
    }
}
</script>