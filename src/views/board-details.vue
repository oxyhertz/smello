<template>
    <section v-if="groups && board" class="board-container">
        <board-menu :board="board" @editTitle="editBoardTitle" @toggleFavorite="toggleFavorite" />
        <board-group
            @removeTask="removeTask"
            @addTask="setTask"
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
    watch: {
        async '$route.params.boardId'(after, before) {
            await this.$store.dispatch({
                type: "setCurrentBoard",
                boardId: this.$route.params.boardId,
            });
            this.board = this.currBoard;
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
        removeTask(task) {
            // var activity = boardService.addActivity(
            //   "Task removed ",
            //   this.user, <--from a getter
            //   currTask
            // );
            this.$store.dispatch({
                type: "removeTask",
                task,
            });
        },
        setTask({ title, groupId }) {
            var task = {
                title,
                groupId,
            };
            this.$store.dispatch({ type: "setTask", task, });
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
