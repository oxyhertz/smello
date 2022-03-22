<template>
    <ul class="board-list">
        <board-preview @toggleFavorite="toggleFavorite" v-for="board in boards" :board="board" :key="board._id" @click="moveToBoard(board._id)" />
    </ul>
    
</template>

<script>
import boardPreview from "./board-preview.vue"

export default{
    name: 'board-list',
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
    components:{
        boardPreview
    }
}
</script>