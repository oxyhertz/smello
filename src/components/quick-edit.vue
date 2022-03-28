<template >
    <section class="quick-edit">
        <div class="btn" @click="openTask">
            <span class="icon-board"></span>Open card
        </div>
        <div
            ref="editLabels"
            class="btn"
            @click="setCmp('labelsItem', { name: 'Labels', style: labelsStyle })"
        >
            <span class="icon-label"></span>Edit Labels
        </div>
        <div
            ref="editMembers"
            class="btn"
            @click="setCmp('membersItem', { name: 'Members', style: labelsStyle })"
        >
            <span class="icon-members"></span>Change members
        </div>
        <div class="btn" @click="setCmp('coverItem', { name: 'Members', style: labelsStyle })">
            <span class="icon-cover"></span>Change cover
        </div>
        <div class="btn" @click="setCmp('dateItem', { name: 'Dates', style: labelsStyle })">
            <span class="icon-time"></span>Edit Dates
        </div>
        <div class="btn" @click="$emit('removeTask')">
            <span class="icon-cancel"></span>
            Remove
        </div>
        <popup-main
            :task="task"
            :popupData="popupData"
            :action="actionType"
            v-if="actionType"
            @addItem="addItem"
            @updateLabels="updateLabels"
            @closePopup="actionType = ''"
            @updateCover="updateCover"
        />
    </section>
</template>
<script>
import popupMain from './pop-up-main.vue';
export default {
    name: 'quick-edit',
    props: {
        task: Object,
    },
    data() {
        return {
            actionType: '',
            popupData: null,
            taskToEdit: null
        }
    },
    created() {
        this.taskToEdit = JSON.parse(JSON.stringify(this.task))
    },
    mounted() {
        console.log(this.$refs.editLabels.getBoundingClientRect())
        const rect = this.$refs.editLabels.getBoundingClientRect();
        console.log(rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth))

    },
    methods: {
        openTask() {
            this.$emit('openTask')
        },
        setCmp(type, data) {
            console.log(type)
            console.log(data)
            this.actionType = type;
            this.popupData = data
        },
        updateLabels(updatedLabels, item) {
            console.log(updatedLabels)
            console.log(item)
        },
        updateCover(cover) {
            console.log(cover)
            this.taskToEdit.cover = cover;
            this.$emit('addItem', '_', this.taskToEdit)
        },
        addItem(item) {
            console.log(item)
            if (item.type === 'labels') {
                if (!this.taskToEdit.labelIds) this.taskToEdit.labelIds = [];
                if (this.taskToEdit.labelIds.includes(item.item._id)) {
                    const idx = this.taskToEdit.labelIds.findIndex((label) => label === item.item._id);
                    this.taskToEdit.labelIds.splice(idx, 1);
                } else {
                    this.taskToEdit.labelIds.push(item.item._id);
                }
            }
            if (item.type === 'members') {
                if (!this.taskToEdit.members) this.taskToEdit.members = [];
                if (this.taskToEdit.members.some((member) => member._id === item.item._id)) {
                    const idx = this.taskToEdit.members.findIndex((member) => member._id === item.item._id);
                    this.taskToEdit.members.splice(idx, 1);
                } else {
                    this.taskToEdit.members.push(item.item);
                }
            }
            if (item.type === 'dueDate') {
                if (!this.taskToEdit.dueDate) this.taskToEdit.dueDate = [];
                this.taskToEdit.dueDate = item.item;
            }
            this.$emit('addItem', '_', this.taskToEdit)
        },
        async updateLabels(updatedLabels, item) {
            try {
                await this.$store.dispatch({
                    type: 'setBoardPrefs',
                    key: 'labels',
                    val: updatedLabels,
                });
                this.addItem(item);
                // this.closePopup();
            } catch (err) {
                console.log('err', err);
            }
        },

    },
    computed: {
        labelsStyle() {
            const top = this.$refs.editLabels.getBoundingClientRect().bottom;
            const right = this.$refs.editLabels.getBoundingClientRect().x;
            console.log(top)
            console.log(right)
            return { top: top + 'px', left: right + 'px', position: 'fixed' }
        },
        membersStyle() {
            const top = this.$refs.editMembers.getBoundingClientRect().bottom;
            const right = this.$refs.editMembers.getBoundingClientRect().x;
            console.log(top)
            console.log(right)
            return { top: top + 'px', left: right + 'px', position: 'fixed' }
        }
    },
    components: {
        popupMain
    },
}
</script>
<style lang="">
    
</style>