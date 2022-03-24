<template>
    <section class="color-picker">
        <div
            v-for="color in colors"
            :title="color.title"
            :style="{ 'background-color': color.color }"
            :key="color.title"
            @click="updateColor(color.color)"
        ></div>
    </section>
</template>

<script>

export default {
    name: "color-picker",
    data() {
        return {
            colors: [
                { color: '#bdea8a', title: 'Lightgreen' },
                { color: '#fff475', title: 'Lightyellow' },
                { color: '#a7ffeb', title: 'Greenblue' },
                { color: '#f28b82', title: 'Lightorange' },
                { color: '#d7aefb', title: 'Lightpink' },
                { color: '#e8eaed', title: 'lightgreen' },
            ],
        }
    },
    methods: {
        updateColor(color) {
            this.$emit('updateColor', color);
        },
    },

}
</script>