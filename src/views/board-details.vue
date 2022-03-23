<template>
  <section v-if="groups" class="board-container">
    <board-group @addTask="addTask" @taskChange="taskChange" @columnChange="columnChange" :groups="board.groups" />
    <add-group @add="addGroup" />
    <!-- <board-group /> -->
  </section>
</template>

<script>
import boardGroup from '../components/board-group.vue';
import addGroup from '../components/add-group.vue';
import { utilService } from '../services/utils-service.js';
import {boardService} from '../services/board-service.js';

export default {
    name: 'board-details',
    components: {
        boardGroup,
        addGroup
    },
    data(){
        return{
            board: null
        }
    },
    async created() {
        await this.$store.dispatch({type: 'setCurrentBoard', boardId: this.$route.params.boardId})
        this.board = this.currBoard;
        // this.boardGroups = this.currBoard.groups;
        // console.log(this.boardGroups)
    },
    methods: {
        addTask({title,groupIdx}){
            var task={
                "_id": utilService.makeId(),
                title,
            }
            this.board.groups[groupIdx].tasks.push(task)
            this.$store.dispatch({type: 'saveBoard', board: this.board})

        },
        addGroup(title) {
            const group = boardService.getEmptyGroup(title);
            this.board.groups.push(group)
            this.$store.dispatch({type: 'saveBoard', board: this.board})
        },
        columnChange(boardGroups) {
            this.board.groups = boardGroups;
            this.$store.dispatch({type: 'saveBoard', board: this.board});
        },
        taskChange({groupIdx, newGroup}) {
            this.board.groups.splice(groupIdx, 1, newGroup)
             this.$store.dispatch({type: 'saveBoard', board: this.board});
        }
    },
    computed: {
        groups() {
            return this.$store.getters.boardGroups;
        },
        currBoard() {
            return this.$store.getters.currBoard;
        }
    }
}
</script>
