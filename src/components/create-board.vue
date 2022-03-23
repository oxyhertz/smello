<template>
    <section class="create-modal" v-if="boardToAdd">
        <h3>Create Modal</h3>
        <input type="text" v-model="boardToAdd.title" placeholder="Board title">
        <button @click="addBoard">Create</button>
    </section>
</template>

<script>
import { boardService } from "../services/board-service.js";

export default{
    name: 'create-board',
    data(){
        return {
            boardToAdd: null,
        }
    },
    async created(){
        this.boardToAdd = await boardService.getEmptyBoard()
    },
    methods:{
        async addBoard(){
            const board =  this.boardToAdd
            board.createdBy = this.$store.getters.miniUser
            board.createdAt = Date.now();
            this.$emit('closeCreateModal')
            const savedBoard = await this.$store.dispatch({ type: 'saveBoard', board})
            this.$router.push(`/board/${savedBoard._id}`)


        }
    }
}
</script>