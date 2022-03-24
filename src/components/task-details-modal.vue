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
                        <textarea  @blur="showSaveBtn = false" @focus="showSaveBtn = true" v-model="taskToEdit.description" spellcheck="false" placeholder="Add a more detailed description" class="description-textarea"></textarea>
                        <div v-if="showSaveBtn" class="save-close-description">
                            <button class="save">Save</button>

                        </div>
                </div>
                <div class="attachment-container">
                    <div class="block-title">
                        <span class="icon"></span>
                        <h3>Attachments</h3>
                    </div>
                    <div class="attachment-content">
                        <attachment @updateAttachments="updateAttachments" />
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
            <!-- <location :card="card" /> -->
            <div class="actions-btns-container">
                <h3>Suggested</h3>
                <button>Join</button>
                <h3>Add To card</h3>
                <button>Members</button>
                <button  @click="setLabels('labelsItem')">Labels</button>
                <button>Checklist</button>
                <button>Dates</button>
                <button>Attachments</button>
                <button>Location</button>
                <button>cover</button>
                <h3>Actions</h3>
                <button>Copy</button>
                <button>Archive</button>
                <button>Share</button>
                <popup-main :task="task" @closePopup="closePopup" :popupData="popupData" :action="actionType" v-if="actionType" @setItem="setItem" />
            </div>
        </section>
    </section>
</template>
<script>
import popupMain from "./pop-up-main.vue";
import attachment from "./attachment-cmp.vue";
export default {
    data(){
        return{
            taskToEdit: null,
            showSaveBtn: false,
            isPopup: false,
            popupData: null,
            actionType: null,

        }
    },
    created(){
        this.taskToEdit = JSON.parse(JSON.stringify(this.task))
    },
    methods:{
        setLabels(action){
            this.actionType = action,
            this.popupData = {name:'Labels',style:{"top": '147px'}}
            
        },
        closePopup(){
            this.actionType = null,
            this.popupData = null
        },
        setItem(item){

        },
        addItem(item){

        },
        updateAttachments(attachments){
            console.log(attachments)
            this.taskToEdit.attachments = attachments;
            this.$store.dispatch({
                type: "setTask",task: JSON.parse(JSON.stringify(this.taskToEdit))
            })
        }
        
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
    },
    components:{
        popupMain,
        attachment
    }
}
</script>

