<template>
    <section class="task-details-modal">
        <div class="header">
            <span class="icon title-icon"></span>
            <input type="text" @blur="onTaskEdit" v-model="taskToEdit.title" class="task-details-title">
        </div>
        <p class="boad-title">In list {{board.title}}</p>
        <section class="task-detail-main">
            <div class="task-content">
            <task-combo-list @setLabels="setLabels('labelsItem')" :comboData="comboData" />
                <div class="task-description">
                        <div class="block-title">
                             <span class="icon"></span>
                             <h3>Description</h3>
                        </div>
                        <textarea  @blur="isDisplaySave = false" @focus="isDisplaySave = true" v-model="taskToEdit.description" spellcheck="false" placeholder="Add a more detailed description" class="description-textarea" :class="{'desc-with-content' : taskToEdit.description }"></textarea>
                        <div v-if="isDisplaySave" class="save-close-description" >
                            <button class="save" @click.stop="onTaskEdit">Save</button>
                        </div>
                </div>
                <div v-if="taskToEdit.attachments?.length" class="attachment-container">
                    <div class="block-title">
                        <span class="icon"></span>
                        <h3>Attachments</h3>
                    </div>
                    <div class="attachment-content">
                        <attachment :attachments="taskToEdit.attachments" @updateAttachments="updateItem" />
                    </div>
                </div>
                <task-check-list />
                <div class="activity-show-details">
                       <div class="block-title">
                            <span class="icon"></span>
                            <h3>Activity</h3>
                        </div>
                    <button>Show Details</button>
                </div>
                 <div class="comment-text-container">
                     <avatar  size="32" :name="currUser.fullname"></avatar>
                    <div class="comment-text">
                        <input placeholder="Write a comment..." type="text"/>
                    </div>
                    
                </div>
            </div>
            <!-- <location :card="card" /> -->
            <div class="actions-btns-container">
                <h3>Suggested</h3>
                <button>
                    <span class="icon-member"></span>
                    Join
                </button>
                <h3>Add To card</h3>
                <button>
                    <span class="icon-members"></span>
                    Members
                </button>
                <button  @click="setLabels('labelsItem')">
                    <span class="icon-label"></span>
                    Labels
                    </button>
                <button @click="setChecklist('checklistItem')">
                    <span class="icon-checklist"></span>
                    Checklist
                </button>
                <button>
                    <span class="icon-time"></span>
                    Dates
                </button>
                <button @click="setAttachments('attachmentItem')">
                    <span class="icon-attachment"></span>
                    Attachments
                </button>
                <button>
                    <span class="icon-location"></span>
                    Location
                </button>
                <button>
                    <span class="icon-cover"></span>
                    cover
                </button>
                <h3>Actions</h3>
                <button>
                    <span class="icon-copy"></span>
                    Copy
                </button>
                <button>
                    <span class="icon-share"></span>
                    Share
                </button>
               
                <popup-main :task="task" @closePopup="closePopup" :popupData="popupData" :action="actionType" v-if="actionType" @addItem="addItem" @setItem="setItem" />
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
            popupData: null,
            actionType: null,
            isDisplaySave: false,

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
        setAttachments(action){
            this.actionType = action,
            this.popupData = {name:'Labels',style:{"top": '268px'}}
        },
        setChecklist(action) {
            this.actionType = action,
            this.popupData = {name:'Add checklist', style:{"top": '200px'}}
        },
        closePopup(){
            this.actionType = null,
            this.popupData = null
        },
        setItem(item){

        },
        addItem(item){
            if(item.type === 'attachment'){
                if(!this.taskToEdit.attachments) this.taskToEdit.attachments = []
                console.log(this.taskToEdit.attachments)
                 this.taskToEdit.attachments.push(item.item);
                 this.onTaskEdit()
            } else if(item.type === 'checklist') {
                if(!this.taskToEdit.checklists) this.taskToEdit.checklists = []
                 this.taskToEdit.checklists.push(item.item);
            }
        },
        updateItem({type, val}){
            console.log(type,val)
            this.taskToEdit[type] = val;
            this.onTaskEdit();
        },
        onTaskEdit() {
           this.$store.dispatch({
                 type: "setTask",task: JSON.parse(JSON.stringify(this.taskToEdit))
            })
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
        },
        currUser(){
            return this.$store.getters.user;
        },


    },
    components:{
        popupMain,
        attachment,
        taskComboList,
        taskCheckList
    }
}

</script>

