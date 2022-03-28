<template lang="">
    <section class="workspace-container">
        <h2>Workspace</h2>
        <board-list @toggleFavorite="toggleFavorite" :boards="boards"></board-list>
    </section>
</template>
<script>
import workspaceFilter from '../components/workspace-filter.vue';
import boardList from '../components/board-list.vue';
import { boardService } from '../services/board-service.js';

export default {
	name: 'workspace',
	async created() {
		await this.$store.dispatch({ type: 'loadBoards' })
	},
	methods: {
		async toggleFavorite(id) {
			const board = await boardService.getBoardById(id)
			board.isFavorite = !board.isFavorite
			this.$store.dispatch({ type: 'saveBoard', board })
		}
	},
	computed: {
		boards() {
			return this.$store.getters.boards
		}
	},
	components: {
		workspaceFilter,
		boardList
	}
}
</script>
