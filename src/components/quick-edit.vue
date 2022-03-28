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
        <div class="btn">
            <span class="icon-members"></span>Change members
        </div>
        <div class="btn">
            <span class="icon-cover"></span>Change cover
        </div>
        <div class="btn">
            <span class="icon-time"></span>Edit Dates
        </div>
        <div class="btn">
            <span class="icon-cancel"></span>Remove
        </div>
        <popup-main
            :task="task"
            @closePopup="closePopup"
            :popupData="popupData"
            @updateCover="updateCover"
            :action="actionType"
            v-if="actionType"
            @addItem="addItem"
            @setItem="setItem"
            @updateLabels="updateLabels"
        />
    </section>
</template>
<script>
import popupMain from './pop-up-main.vue';
export default {
    name: 'quick-edit',
    data() {
        return {
            actionType: '',
            popupData: null
        }
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
        }
    },
    computed: {
        labelsStyle() {
            const top = this.$refs.editLabels.getBoundingClientRect().y;
            const right = this.$refs.editLabels.getBoundingClientRect().right;
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