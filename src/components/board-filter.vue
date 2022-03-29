<template >
    <section class="board-filter">
        <header>
            <span class="icon-back" v-if="currSection !== 'Menu'" @click="goBack"></span>
            <h3>Filter</h3>
            <span class="icon-cancel" @click="closeFilter"></span>
        </header>
        <div class="search-inp">
            <h4>Keyword</h4>
            <input
                v-focus
                type="text"
                v-model="filterBy.title"
                placeholder="Enter a keyword..."
                @input="setFilter"
            />
            <p>Search cards, members, labels, and more.</p>
        </div>
    </section>
</template>
<script>
export default {
    name: 'close-filter',
    props: {
        board: Object
    },
    data() {
        return {
            filterBy: {
                title: ''
            }
        }
    },
    methods: {
        closeFilter() {
            this.$emit('closeFilter')
        },
        setFilter() {
            this.$emit('setFilter', { ...this.filterBy })
        },
    },
}
</script>
