<template >
	<section class="home-container main-layout">
		<h2>Welcome to trello</h2>
		<section class="info-container info-1">
			<section>
				<h1>Smello helps teams move work forward.</h1>
				<p>
					Collaborate, manage projects, and reach new productivity peaks. From
					high rises to the home office, the way your team works is
					unique—accomplish it all with Trello.
				</p>
				<button @click="moveToBoards">Get Started</button>
			</section>

			<img class="hero-img" src="../images/homepage/hero.png" alt />
		</section>
		<section class="info-container info-2">
			<h2>It’s more than work. It’s a way of working together.</h2>
			<p>
				Start with a Trello board, lists, and cards. Customize and expand with
				more features as your teamwork grows. Manage projects, organize tasks,
				and build team spirit—all in one place.
			</p>
		</section>
		<img src="../images/homepage/board.png" alt="board" />
		<section class="info-container info-3">
			<h2>Features to help your team succeed</h2>
			<p>
				Powering a productive team means using a powerful tool (and plenty of
				snacks). From meetings and projects to events and goal setting, Trello’s
				intuitive features give any team the ability to quickly set up and
				customize workflows for just about anything.
			</p>
		</section>
		<section class="info-container info-4">
			<img src="../images/homepage/view.svg" alt="view" />
			<section>
				<h5>CHOOSE A VIEW</h5>
				<h2>The board is just the beginning</h2>
				<p>
					Lists and cards are the building blocks of organizing work on a Trello
					board. Grow from there with task assignments, timelines, productivity
					metrics, calendars, and more.
				</p>
			</section>
		</section>
		<section class="info-container info-5">
			<section>
				<h5>DIVE INTO THE DETAILS</h5>
				<h2>Cards contain everything you need</h2>
				<p>
					Trello cards are your portal to more organized work—where every single
					part of your task can be managed, tracked, and shared with teammates.
					Open any card to uncover an ecosystem of checklists, due dates,
					attachments, conversations, and more.
				</p>
			</section>
			<img src="../images/homepage/card-back.svg" alt="card-back" />
		</section>
	</section>
</template>

<script>
export default {
	name: 'home-page',
	methods: {
		moveToBoards() {
			this.$router.push('/board')
		}
	}
}
</script>
