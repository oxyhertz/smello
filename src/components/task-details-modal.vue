<template>
    <section class="task-details-modal">
        <div class="header">
            <span class="icon"></span>
            <input type="text" v-model="taskToEdit.title" class="task-details-title">
        </div>
        <section class="task-detail-main">
            <div class="task-content">
                <div class="task-description">
                        <div class="block-title">
                             <span class="icon"></span>
                             <h3>Description</h3>
                        </div>
                        <textarea v-model="taskToEdit.description" spellcheck="false" placeholder="Add a more detailed description" class="description-textarea"></textarea>
                        <div class="save-close-description">
                            <button class="save">Save</button>

                        </div>
                </div>
                <div class="activity-show-details">
                       <div class="block-title">
                            <span class="icon"></span>
                            <h3>Activity</h3>
                        </div>
                    <button>Show Details</button>
                </div>
            </div>
            <div class="actions-btns-container">
                <h3>Suggested</h3>
                <button>Join</button>
                <h3>Add To card</h3>
                <button>Members</button>
                <button>Labels</button>
                <button>Checklist</button>
                <button>Dates</button>
                <button>Attachments</button>
                <button>Location</button>
                <button>cover</button>
                <h3>Actions</h3>
                <button>Copy</button>
                <button>Archive</button>
                <button>Share</button>
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

