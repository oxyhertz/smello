<template>
    <h3>Starred Boards</h3>
    <ul class="board-list">
        <board-preview @toggleFavorite="toggleFavorite" v-for="board in starredBoards" :board="board" :key="board._id" @click="moveToBoard(board._id)" />
    </ul>
    <h3>Other Boards</h3>
    <ul class="board-list">
        <board-preview @toggleFavorite="toggleFavorite" v-for="board in unStarredBoards" :board="board" :key="board._id" @click="moveToBoard(board._id)" />
    </ul>
    
</template>

<script>
import boardPreview from "./board-preview.vue"

export default{
    name: 'board-list',
    emits: ["toggleFavorite"],
    props:{
        boards: Array,
    },
    data(){
        return {
        }
    },
    created(){
    },
    methods:{
        moveToBoard(id){
             this.$router.push(`/board/${id}`)
        },
        toggleFavorite(id){
            this.$emit('toggleFavorite', id);

        }
    },
    computed:{
        starredBoards(){
            return this.boards.filter(board => board.isFavorite)
        },
        unStarredBoards(){
            return this.boards.filter(board => !board.isFavorite)
        },
    },
    components:{
        boardPreview
    }
}
</script>