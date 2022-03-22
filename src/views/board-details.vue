<template>
    <section v-if="groups" class="board-container">
        <board-group :groups="groups"/>
        <add-group @add="addGroup"/>
        <!-- <board-group /> -->
    </section>
</template>

<script>
import boardGroup from '../components/board-group.vue';
import addGroup from '../components/add-group.vue';

export default {
    name: 'board-details',
    components: {
        boardGroup,
        addGroup
    },
    async created() {
        await this.$store.dispatch({type: 'setCurrentBoard', boardId: this.$route.params.boardId})
    },
    methods: {
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
