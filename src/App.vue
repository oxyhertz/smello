<template>
	<div class="wrapper" :style="boardStlye">
		<app-header />
		<router-view />
	</div>
</template>

<script>
import appHeader from './components/main-header.vue'
import { userManageService } from './services/user-manage-service.js'

export default {
	name: 'app',
	created() {
		this.$store.dispatch({ type: 'loadBoards' })
		this.$store.dispatch({ type: 'loadUsers' })
		userManageService.query()


	},
	computed: {
		currBoardStyle() {

			return this.$store.getters.currBoard?.style?.bgColor
		},
		currBoard() {
			return this.$store.getters.currBoard?.style
		},
		boardStlye() {
			return { 'background-color': this.currBoard?.bgColor, 'background-image': 'url(' + this.currBoard?.bgImg + ')' }
		}
	},
	components: {
		appHeader,
	},
}

</script>

