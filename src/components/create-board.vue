<template>
    <section class="create-board-modal" v-if="boardToAdd">
        <header>
            <p>Create Board</p>
            <span @click="closeModal"> <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z" fill="currentColor"></path></svg></span>

        </header>
        <div class="create-board-preview" :style="bgColor">
            <img src="../images//board-preview-skeleton.14cda5dc635d1f13bc48.svg" alt="" role="presentation">
        </div>
        <div class="background-picker-container">
            <p>Background</p>
            <color-picker @updateColor="updateBgColor"></color-picker>
        </div>
        <div>
            <label>Board title <span class="red-text">*</span>
                <input type="text" class="board-title-inp" v-model="boardToAdd.title">
            </label>
        </div>
        <button :disabled="!boardToAdd.title" class="create-board-btn" @click="addBoard">Create</button>
    </section>
</template>

<script>
import { boardService } from "../services/board-service.js";
import colorPicker from "./color-picker.vue";
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
            this.closeModal()
            const savedBoard = await this.$store.dispatch({ type: 'saveBoard', board})
            this.$router.push(`/board/${savedBoard._id}`)

        },
        closeModal(){
            this.$emit('closeCreateModal')
        },
        updateBgColor(color){
            this.boardToAdd.style.bgColor = color
            console.log(this.boardToAdd.style.bgColor)
        }
        
    },
    computed:{
        bgColor(){
            return {"background-color":this.boardToAdd.style.bgColor}
        }
    },
    components:{
        colorPicker
    }
}
</script>