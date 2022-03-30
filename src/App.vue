<template>
	<div class="wrapper" :style="boardStlye">
		<app-header v-if="!isHomePage" />
		<router-view />
	</div>
</template>

<script>
import appHeader from './components/main-header.vue'
import { userService } from './services/user-service.js';


export default {
	name: 'app',
	async created() {
		await this.$store.dispatch({ type: 'loadUsers' })
		if (!this.miniUser) await this.$store.dispatch({ type: 'login', cred: userService.getGuestUser() });
		await this.$store.dispatch({ type: 'loadBoards' })
	},
	computed: {
		miniUser() {
			return this.$store.getters.miniUser;
		},
		currBoardStyle() {
			return this.$store.getters.currBoard?.style?.bgColor
		},
		currBoard() {
			return this.$store.getters.currBoard?.style
		},
		boardStlye() {
			return { 'background-color': this.currBoard?.bgColor, 'background-image': 'url(' + this.currBoard?.bgImg + ')' }
		},
		isHomePage() {
			return this.$store.getters.isHomePage
		}
	},
	components: {
		appHeader,
	},
}

</script>

