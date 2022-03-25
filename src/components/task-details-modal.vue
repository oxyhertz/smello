<template>
    <section class="task-details-modal">
        <div class="header">
            <span class="icon title-icon"></span>
            <input
                type="text"
                @blur="onTaskEdit"
                v-model="taskToEdit.title"
                class="task-details-title"
            />
        </div>
        <p class="boad-title">In list {{ board.title }}</p>
        <section class="task-detail-main">
            <div class="task-content">
                <task-combo-list
                    v-if="taskToEdit.members || taskToEdit.labelIds || taskToEdit.dueDate"
                    @setLabels="setLabels('labelsItem')"
                    :comboData="taskToEdit"
                />
                <div class="task-description">
                    <div class="block-title">
                        <span class="icon"></span>
                        <h3>Description</h3>
                    </div>
                    <textarea
                        @blur="isDisplaySave = false"
                        @focus="isDisplaySave = true"
                        v-model="taskToEdit.description"
                        spellcheck="false"
                        placeholder="Add a more detailed description"
                        class="description-textarea"
                        :class="{ 'desc-with-content': taskToEdit.description }"
                    ></textarea>
                    <div v-if="isDisplaySave" class="save-close-description">
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
                <task-check-list
                    v-for="checklist in taskToEdit.checklists"
                    :key="checklist._id"
                    :checklist="checklist"
                    @updateItem="updateItem"
                />
                <div class="activity-show-details">
                    <div class="block-title">
                        <span class="icon"></span>
                        <h3>Activity</h3>
                    </div>
                    <button>Show Details</button>
                </div>
                <div class="comment-text-container">
                    <avatar size="32" :name="currUser.fullname"></avatar>
                    <div class="comment-text">
                        <input placeholder="Write a comment..." type="text" />
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
                <button  @click="setMembers('membersItem')">
                    <span class="icon-members"></span>
                    Members
                </button>
                <button @click="setLabels('labelsItem')">
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
                <popup-main
                    :task="task"
                    @closePopup="closePopup"
                    :popupData="popupData"
                    :action="actionType"
                    v-if="actionType"
                    @addItem="addItem"
                    @setItem="setItem"
                    @updateLabels="updateLabels"
                />
            </div>
        </section>
    </section>
</template>
<script>
import popupMain from "./pop-up-main.vue";
import attachment from "./attachment-cmp.vue";
import { Comment } from "@vue/runtime-core";
import taskComboList from "./task-details-cmps/task-combo-list.vue";
import taskCheckList from "./task-details-cmps/task-checklist.vue";
import { utilService } from "../services/utils-service";
export default {
    data() {
        return {
            taskToEdit: null,
            showSaveBtn: false,
            popupData: null,
            actionType: null,
            isDisplaySave: false,
        };
    },
    created() {
        this.taskToEdit = JSON.parse(JSON.stringify(this.task));
        console.log("this.taskToEdit", this.taskToEdit);
    },
    methods: {
        setMembers(action) {
            (this.actionType = action),
                (this.popupData = { name: "Members", style: { top: "126px" } });
        },
        setLabels(action) {
            (this.actionType = action),
                (this.popupData = { name: "Labels", style: { top: "165px" } });
        },
        setAttachments(action) {
            (this.actionType = action),
                (this.popupData = { name: "Attachments", style: { top: "268px" } });
        },
        setChecklist(action) {
            (this.actionType = action),
                (this.popupData = { name: "Add checklist", style: { top: "200px" } });
        },
        closePopup() {
            (this.actionType = null), (this.popupData = null);
        },
        setItem(item) { },
        addItem(item) {
            if (item.type === "attachment") {
                if (!this.taskToEdit.attachments) this.taskToEdit.attachments = [];
                this.taskToEdit.attachments.push(item.item);
                this.onTaskEdit()
            } else if (item.type === "checklist") {
                if (!this.taskToEdit.checklists) this.taskToEdit.checklists = [];
                this.taskToEdit.checklists.push(item.item);
            } else if (item.type === "labels") {
                if (!this.taskToEdit.labelIds) this.taskToEdit.labelIds = [];
                if (this.taskToEdit.labelIds.includes(item.item._id)) {
                    const idx = this.taskToEdit.labelIds.findIndex(
                        (label) => label === item.item._id
                    );
                    this.taskToEdit.labelIds.splice(idx, 1);
                } else {
                    this.taskToEdit.labelIds.push(item.item._id);
                }
            }
            this.onTaskEdit();
        },
        updateItem({ type, val }) {
            if (type === 'checklists') {
                const checklists = this.taskToEdit.checklists;
                const idx = checklists.findIndex(checklist => checklist._id === val._id);
                if (val.title) checklists.splice(idx, 1, val); // edit
                else checklists.splice(idx, 1); // deletion

            } else this.taskToEdit[type] = val;
            this.onTaskEdit();
        },
        updateItem({type, val}){
            console.log(type,val)
            this.taskToEdit[type] = val;
            this.onTaskEdit();
        },
        onTaskEdit() {
            this.$store.dispatch({
                type: "setTask",
                task: JSON.parse(JSON.stringify(this.taskToEdit)),
            });
        },
        async updateLabels(updatedLabels, item) {
            try {
                await this.$store.dispatch({
                    type: "setBoardPrefs",
                    key: "labels",
                    val: updatedLabels,
                });
                this.addItem(item);
                this.closePopup()
            } catch (err) {
                console.log("err", err);
            }
        },
    },
    computed: {
        board() {
            return this.$store.getters.currBoard;
        },
        group() {
            return this.$store.getters.currGroup;
        },
        task() {
            return this.$store.getters.currTask;
        },
        currUser() {
            return this.$store.getters.user;
        },
    },
    components: {
        popupMain,
        attachment,
        taskComboList,
        taskCheckList,
    },
};
</script>