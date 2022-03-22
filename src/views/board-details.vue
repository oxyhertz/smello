<template>
  <section v-if="groups && board" class="board-container">
    <board-group @addTask="addTask" :groups="groups" />
    <add-group @add="addGroup" />
    <!-- <board-group /> -->
  </section>
</template>

<script>
import boardGroup from '../components/board-group.vue';
import addGroup from '../components/add-group.vue';
import { utilService } from '../services/utils-service';

export default {
    name: 'board-details',
    components: {
        boardGroup,
        addGroup
    },
    data(){
        return{
            board:null
        }
    },
    async created() {
        await this.$store.dispatch({type: 'setCurrentBoard', boardId: this.$route.params.boardId})
        this.board = this.$store.getters.currBoard

    },
    methods: {
        addTask({title,groupIdx}){
            var task={
                "_id": utilService.makeId(),
                title,
            }
            this.board.groups[groupIdx].tasks.push(task)
            this.$store.dispatch({type: 'saveBoard', board:this.board})

        },
        addGroup(groupTitle) {
            this.$store.dispatch({type: 'addGroup', groupTitle})
        }
    },
    computed: {
        groups() {
            return this.$store.getters.boardGroups;
        }
    }
}
</script>
