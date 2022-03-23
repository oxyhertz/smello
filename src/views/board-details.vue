<template>
    <section v-if="groups && board" class="board-container">
        <board-menu @editTitle="editBoardTitle" @toggleFavorite="toggleFavorite"/>
        <board-group
            @removeTask="removeTask"
            @addTask="addTask"
            @taskChange="taskChange"
            @columnChange="columnChange"
            @addGroup="addGroup"
            :groups="board.groups"
        />

    </section>
</template>

<script>

import boardGroup from "../components/board-group.vue";
import { utilService } from "../services/utils-service.js";
import { boardService } from "../services/board-service.js";
import boardMenu from "../components/board-menu.vue"

export default {
    name: "board-details",
    components: {
        boardGroup,
        boardMenu
    },
    data() {
        return {
            board: null,
        };
    },
    async created() {
        await this.$store.dispatch({
            type: "setCurrentBoard",
            boardId: this.$route.params.boardId,
        });
        this.board = this.currBoard;
        // this.boardGroups = this.currBoard.groups;
        // console.log(this.boardGroups)
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
        },
        editBoardTitle(newTitle) {
            this.board.title = newTitle;
            this.$store.dispatch({ type: 'saveBoard', board: this.board });
        },
        toggleFavorite(isFavorite) {
            this.board.isFavorite = isFavorite;
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
