<template>
    <section>
        <ul v-if="task.activities?.length">
            <div>yes</div>
            <li v-for="activity in task.activities" :key="activity._id">
                <avatar size="32" :name="activity.byMember.fullname"></avatar>
                <div>
                    <span>{{ activity.byMember.username }}</span>
                    <span>{{ activity.txt }}</span>
                </div>
                <div>
                    <timeago :datetime="activity.createdAt" />
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