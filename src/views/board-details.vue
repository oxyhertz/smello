<template>
	<section v-if="board" class="board-container" :style="boardStyle">
		<board-header
			@setBg="setBg"
			:board="board"
			@editTitle="editBoardTitle"
			@addMember="addMember"
			@toggleFavorite="toggleFavorite"
			@setFilter="setFilter"
		/>
		<section class="group-container-scrollable">
			<board-group
				@removeTask="removeTask"
				@addTask="setTask"
				@editTask="editTask"
				@taskChange="taskChange"
				@columnChange="columnChange"
				@addGroup="addGroup"
				@editGroup="editGroup"
				@cleanStore="cleanStore"
				:groups="groupsToDisplay"
				:board="board"
			/>
		</section>
	</section>
</template>

<script>
import { nextTick } from 'vue'
import boardGroup from '../components/board-group.vue';
import { utilService } from '../services/utils-service.js';
import { boardService } from '../services/board-service.js';
import { socketService } from '../services/socket-service.js';
import boardHeader from '../components/board-header.vue'

export default {
	name: 'board-details',
	components: {
		boardGroup,
		boardHeader
	},
	data() {
		return {
			board: null,
			filterBy: {
				title: '',
				labels: [],
				members: [],
				dueDate: null,
			}
		};
	},

	watch: {
		'$route.params.boardId': {
			immediate: true,
			async handler(newId, oldId) {
				await this.$store.dispatch({
					type: 'setCurrentBoard',
					boardId: newId,
				});
				this.board = this.currBoard;
			},
			deep: true
		}
	},
	async created() {
		await this.loadBoard()
		this.board = this.currBoard;
		const { boardId } = this.$route.params;
		socketService.emit('set-user-socket', this.miniUser._id);
		socketService.emit("board topic", boardId);
		// socketService.on('board update', this.loadBoard())
		socketService.on('board update', this.loadBoard)
		socketService.on('tag user', this.tagUser)
	},
	unmounted() {
		this.$store.commit({ type: 'setCurrentBoard', board: null })
	},
	methods: {
		tagUser(activity) {
			this.$toast(activity.txt, {
				duration: 2000,
				styles: {
					top: '90px',
					right: '90px',
					position: 'absolute',
					'background-color': '#0079bf',
				},
				class: 'toast',
				positionX: 'left',
				positionY: 'top',
			});
		},
		async loadBoard() {
			try {
				await this.$store.dispatch({
					type: 'setCurrentBoard',
					boardId: this.$route.params.boardId,
				});
				this.board = null;
				await nextTick();
				this.board = this.currBoard;

				console.log(this.currBoard);
			} catch (err) {
				console.log('err', err)
			}
		},
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
			console.log(editedTask)
			this.$store.dispatch({ type: 'setTask', task: editedTask });
			// this.$store.commit({ type: 'setCurrTask', task: JSON.parse(JSON.stringify(this.taskToEdit)) });
		},
		quickUpdateTask() {
			this.$store.dispatch({ type: 'setTask', task: editedTask });
		},
		addGroup(groupTitle) {
			this.$store.dispatch({ type: 'addGroup', groupTitle })
		},
		editGroup({ groupIdx, newGroup }) {
			// console.log('aaaaaaaa', groupIdx, newGroup);
			console.log('asdjkyhasdkjsaghdkjsahdkjsadhkjsadhk')
			this.$store.dispatch({ type: 'setGroup', groupIdx, newGroup })
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
		},
		async addMember(members) {
			await this.$store.dispatch({ type: 'setBoardPrefs', key: 'members', val: members });
			this.board = this.currBoard
		},
		async setBg(bg) {
			this.board.style[bg.type] = bg.val
			if (bg.type === 'bgColor') this.board.style.bgImg = ''
			await this.$store.dispatch({ type: 'saveBoard', board: this.board })
			await this.$store.dispatch({
				type: 'setCurrentBoard',
				boardId: this.board._id,
			});
		},
		setFilter(filterBy) {
			const copyfilter = JSON.parse(JSON.stringify(filterBy))
			this.filterBy = copyfilter;
			// this.$store.dispatch({ type: 'setFilter', filterBy: copyfilter })
		},
	},
	computed: {
		miniUser() {
			return this.$store.getters.miniUser;
		},
		groups() {
			return this.$store.getters.boardGroups;
		},
		currBoard() {
			return this.$store.getters.currBoard;
		},
		boardStyle() {
			// return { 'background-color': ',' };
		},
		groupsToDisplay() {
			let filteredGroups = [];
			console.log(this.filterBy)
			const regex = new RegExp(this.filterBy.title, 'i')
			filteredGroups = this.board.groups.filter((group) => regex.test(group.title))
			if (this.filterBy.members.length) {
				// filteredGroups.filter()
			}
			return filteredGroups;
		}
	}
}
</script>


<style>
.toast {
	width: 20%;
	height: 70px;
	background-color: #0079bf;
}
</style>