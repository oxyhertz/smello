<template>
    <ul class="board-list">
        <board-preview v-for="board in boards" :board="board" :key="board._id" />
    </ul>
    {{boards}}
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
    components:{
        boardPreview
    }
}
</script>