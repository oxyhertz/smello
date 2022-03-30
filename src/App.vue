<template>
	<div class="wrapper" :style="boardStlye">
		<app-header v-if="!isHomePage" />
		<router-view />
	</div>
</template>

<script>
import appHeader from './components/main-header.vue'
import { socketService } from './services/socket-service';
import { userService } from './services/user-service.js';
import { ElNotification } from 'element-plus'


export default {
	name: 'app',
	async created() {
		socketService.off('notify activity')
		socketService.on('notify activity', this.notifyActivity)
		await this.$store.dispatch({ type: 'loadUsers' })
		if (!this.miniUser) await this.$store.dispatch({ type: 'login', cred: userService.getGuestUser() });
		await this.$store.dispatch({ type: 'loadBoards' })
	},
	methods: {
		notify(isPrivate = null) {
			if (isPrivate) {
				ElNotification({
					title: 'Success',
					message: 'This is a success message',
					type: 'success',
				})
			} else ElNotification({
				title: 'global change',
				message: 'This is an info message',
				type: 'info',
			})
		},
		notifyActivity(activity) {
			if (activity.toMember?._id) {
				if (userService.getLoggedinUser()._id === activity.toMember._id) {
					this.notify(true)
					console.log('hi', userService.getLoggedinUser().fullname)
				}
			} else this.notify()
		},
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

