<template>
    <section>
        <ul v-if="task.activities?.length">
            <li v-for="activity in task.activities" :key="activity._id">
                <avatar class="activity-avatar" size="32" :name="activity.byMember.fullname"></avatar>
                <div :class="{ activity: activity.isComment }">
                    <span class="member">{{ activity.byMember.username }}</span>
                    <timeago class="time" :datetime="activity.createdAt" />
                </div>
                <div class="task-activity-txt">
                    <span>{{ activity.txt }}</span>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'activities-list',
    // emits: ["toggleFavorite"],
    props: {
        task: Array,
    },
    created() {
        console.log(this.task);
    },
    methods: {
    },
    computed: {
    }
}
</script>
