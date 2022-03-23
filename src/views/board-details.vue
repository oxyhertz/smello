<template>
    <section v-if="groups" class="board-container">
        <board-menu></board-menu>
        <board-group
            @removeTask="removeTask"
            @addTask="addTask"
            @taskChange="taskChange"
            @columnChange="columnChange"
            :groups="board.groups"
        />
        <add-group @add="addGroup" />
        <!-- <board-group /> -->
    </section>
</template>

<script>

import boardGroup from "../components/board-group.vue";
import addGroup from "../components/add-group.vue";
import { utilService } from "../services/utils-service.js";
import { boardService } from "../services/board-service.js";
import boardMenu from "../components/board-menu.vue"

export default {
    name: "board-details",
    components: {
        boardGroup,
        addGroup,
        boardMenu
    },
    data() {
        return {
            board: null,
        };
    },
    watch:{
       async '$route.params.boardId'(after,before){
            await this.$store.dispatch({
                    type: "setCurrentBoard",
                    boardId: this.$route.params.boardId,
                });
                this.board = this.currBoard;
                console.log(this.board._id)
                this.$router.push(`/board/${this.board._id}`)
       }
    },
    async created() {
        await this.$store.dispatch({
            type: "setCurrentBoard",
            boardId: this.$route.params.boardId,
        });
        this.board = this.currBoard;
    },
    methods: {
        removeTask({ taskId, groupIdx }) {
            // var activity = boardService.createActivity()
            var idx = this.board.groups[groupIdx].tasks.findIndex(
                (task) => task._id === taskId
            );
            this.board.groups[groupIdx].tasks.splice(idx, 1);
            this.board.activity;
            this.$store.dispatch({ type: "saveBoard", board: this.board });
        },
        addTask({ title, groupIdx }) {
            var task = {
                "_id": utilService.makeId(),
                title,
            }
            this.board.groups[groupIdx].tasks.push(task)
            this.$store.dispatch({ type: 'saveBoard', board: this.board })

        },
        addGroup(title) {
            const group = boardService.getEmptyGroup(title);
            this.board.groups.push(group)
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
        },
        columnChange(boardGroups) {
            this.board.groups = boardGroups;
            this.$store.dispatch({ type: 'saveBoard', board: this.board });
        },
        taskChange({ groupIdx, newGroup }) {
            this.board.groups.splice(groupIdx, 1, newGroup)
            this.$store.dispatch({ type: 'saveBoard', board: this.board });
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
