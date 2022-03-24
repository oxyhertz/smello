<template>
    <section class="task-details-modal">
        <div class="header">
            <input type="text" v-model="taskToEdit.title" class="task-details-title">
        {{taskToEdit}}
        </div>
        <section class="task-detail-main">
            <div class="task-content">
                <div class="task-description">
                        <div>
                            <h3>Description</h3>
                        </div>
                        <textarea v-model="taskToEdit.description" spellcheck="false" placeholder="Add a more detailed description" class="description-textarea"></textarea>
                </div>
                <div class="activity-show-details">
                    <h3>Activity</h3>
                    <span>Show Details</span>
                </div>
            </div>
            <div>

                hasdsa
            </div>
        </section>
    </section>
</template>
<script>
export default {
    data(){
        return{
            taskToEdit: null,
        }
    },
    created(){
        this.taskToEdit = JSON.parse(JSON.stringify(this.task))
    },
    computed:{
        board(){
            return this.$store.getters.currBoard;
        },
        group(){
            return this.$store.getters.currGroup;
        },
        task(){
            return this.$store.getters.currTask;
        }
    }
}
</script>
