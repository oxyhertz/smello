<template>
    <section class="task-details-modal">
        <div class="header">
            <span class="icon"></span>
            <input type="text" @blur="onTaskEdit" v-model="taskToEdit.title" class="task-details-title">
        </div>
        <task-combo-list :comboData="comboData" />
        <task-check-list />
        <section class="task-detail-main">
            <div class="task-content">
                <div class="task-description">
                        <div class="block-title">
                             <span class="icon"></span>
                             <h3>Description</h3>
                        </div>
                        <textarea v-model="taskToEdit.description" spellcheck="false" placeholder="Add a more detailed description" class="description-textarea"></textarea>
                        <div class="save-close-description">
                            <button class="save" @click="onTaskEdit">Save</button>

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
import { Comment } from '@vue/runtime-core';
import taskComboList  from './task-details-cmps/task-combo-list.vue';
import taskCheckList from './task-details-cmps/task-checklist.vue';

export default {
    data(){
        return{
            taskToEdit: null,
            showSaveBtn: false,
            isPopup: false,
            popupData: null,
            actionType: null,

            comboData: {
                labelIds: ['l101', 'l102'],
                members: [
                       {
                    '_id': 'u101',
                    username: 'Tal',
                    fullname: 'Tal Tarablus',
                    imgUrl:
                      'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                       {
                    '_id': 'u102',
                    username: 'Eal',
                    fullname: 'Ral Tarablus',
                    imgUrl:
                      'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                ],
                dueDate: 181562152111,
            }
        }
    },
    created(){
        this.taskToEdit = JSON.parse(JSON.stringify(this.task))
    },
    methods:{
        setLabels(action){
            this.actionType = action,
            this.popupData = {name:'Labels', style:{"top": '147px'}}
            
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
        },
         onTaskEdit() {
            this.$emit('editTask', this.taskToEdit);
        },
        onDetailEdit(key, val) {
            
        }
    },

    computed:{
        board() {
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
        attachment,
        taskComboList,
        taskCheckList
    }
}

</script>

