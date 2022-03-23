<template>
    <section class="add-group">
        <p v-if="!isFocused" @click="isFocused = true">Add another list</p>
        <section v-else>
            <textarea
                v-model="groupTitle"
                v-focus
                cols="20"
                rows="1"
                placeholder="Enter list title..."
            ></textarea>
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
            this.$emit('add', this.groupTitle)
            this.groupTitle = '';
        }
    }
}
</script>