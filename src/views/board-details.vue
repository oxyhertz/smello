<template>
    <section v-if="board" class="board-container" :style="boardStyle" >
        <board-header :board="board" @editTitle="editBoardTitle" @toggleFavorite="toggleFavorite" />
        <section class="group-container-scrollable">
            <board-group
                @removeTask="removeTask"
                @addTask="setTask"
                @editTask="editTask"
                @taskChange="taskChange"
                @columnChange="columnChange"
                @addGroup="addGroup"
                @cleanStore="cleanStore"
                :groups="board.groups"
                :board="board"
            />
        </section>
    </section>
</template>

<script>

import boardGroup from "../components/board-group.vue";
import { utilService } from "../services/utils-service.js";
import { boardService } from "../services/board-service.js";
import boardHeader from "../components/board-header.vue"

export default {
    name: "board-details",
    components: {
        boardGroup,
        boardHeader
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
    },
    methods: {
        removeTask(task) {
            // var activity = boardService.addActivity(
            //   "Task removed ",
            //   this.user, <--from a getter
            //   currTask
            // );
            this.$store.dispatch({
                type: 'removeTask',
                task,
            });
        },
        setTask({ title, groupId }) {
            var task = { title };
            this.$store.dispatch({ type: 'setTask', groupId, task, });
        },
        editTask(editedTask) {
            this.$store.dispatch({ type: 'setTask', task: editedTask });
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
        },
        cleanStore(itemsToClean) {
            itemsToClean.forEach(item => {
                const toCommit = {
                    type: `setCurr${item}`
                }
                toCommit[item.toLowerCase()] = null;
                this.$store.commit(toCommit)
            })
        }
    },
    computed: {
        groups() {
            return this.$store.getters.boardGroups;
        },
        currBoard() {
            return this.$store.getters.currBoard;
        },
        boardStyle(){
            return {"background-color":","};
        }
    }
}
</script>
