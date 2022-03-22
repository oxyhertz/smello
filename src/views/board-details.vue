<template>
    <section v-if="groups" class="board-container">
        <board-group :groups="groups"/>
        <!-- <board-group /> -->
    </section>
</template>

<script>
import boardGroup from '../components/board-group.vue';

export default {
    name: 'board-details',
    components: {
        boardGroup
    },
    async created() {
        await this.$store.dispatch({type: 'setCurrentBoard', boardId: this.$route.params.boardId})
    },
    methods: {
    },
    computed: {
        groups() {
            return this.$store.getters.boardGroups;
        }
    }
}
</script>
