<template>
    <section class="board-menu-title">
        <h1 v-if="!isClicked" @click="toggleInput">{{title}}</h1>
        <textarea v-else v-focus v-model="title" @blur="editTitle">{{title}}</textarea>
    </section>
</template>

<script>
export default {
    name: 'board-menu-title',
    props: {
        title: String,
        createdBy: String
    },
    data() {
        return {
            isClicked: false
        }
    },
    methods: {
        editTitle() {
            this.isClicked = false;
            this.$emit('editTitle', this.title);
        },
        toggleInput() {
            if(this.createdBy !== this.userId) return;
            this.isClicked = true
        }
    },
    computed: {
        userId() {
            return this.$store.getters.miniUser._id;
        }
    }
}
</script>
