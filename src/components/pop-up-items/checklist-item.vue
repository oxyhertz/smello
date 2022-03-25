<template>
    <section class="checklist-popup flex column">
        <label for="checklist-input">Title</label>
        <input type="text" v-model="checklistTitle" id="checklist-input" placeholder="Checklist" />
        <button class="add-btn">Add</button>
    </section>
</template>


<script>
import { utilService } from '../../services/utils-service';

export default {
    name: "checklist-popup",
    data() {
        return {
            checklistTitle: ''
        }
    },
    methods: {
        addCheckList() {
            if(!checklistTitle) checklistTitle = 'Checklist';
            const checklist = {
                _id: utilService.makeId(),
                title: checklistTitle,
                todos: []
            }
            this.$emit('addItem', {type:'checklists',  checklist});
        }
    }
}
</script>
