<template>
    <section class="add-group">
        <span v-if="!isFocused" @click="isFocused = true">
        <span class="icon"></span>
        Add another list
        </span>
        
        <section v-else>
            <input type="text" v-model="groupTitle" v-focus placeholder="Enter list title..." />
            <button @click="addGroup">Add list</button>
            <button @click="isFocused = false">x</button>
        </section>
    </section>
</template>
<script>
export default {
    name: "add-group",
    data() {
        return {
            isFocused: false,
            groupTitle: ''
        }
    },
    methods: {
        addGroup() {
            if (!this.groupTitle) return
            this.$emit('add', this.groupTitle)
            this.groupTitle = '';
        }
    }
}
</script>