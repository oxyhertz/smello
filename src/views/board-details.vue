<template>
    <section v-if="board" class="board-container">
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
        addGroup(groupTitle) {
            this.$store.dispatch({ type: 'addGroup', groupTitle })
        },
        columnChange(boardGroups) {
            this.$store.dispatch({ type: 'setGroups', groups: boardGroups });
        },
        taskChange({ groupIdx, newGroup }) {
            this.$store.dispatch({ type: 'setGroup', groupIdx, newGroup });
        },
        editBoardTitle(newTitle) {
            this.$store.dispatch({ type: 'setBoardPrefs', key: 'title', val: newTitle });
        },
        toggleFavorite(isFavorite) {
            this.$store.dispatch({ type: 'setBoardPrefs', key: 'isFavorite', val: isFavorite });
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
