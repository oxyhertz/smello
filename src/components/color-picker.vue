<template>
    <section class="color-picker">
        <div
            v-for="color in colors"
            :title="color.title"
            :style="{ 'background-color': color.color }"
            :key="color.title"
            @click="updateColor(color.color)"
        >
            <span class="icon-complete" v-if="currColor === color.color"></span>
        </div>
    </section>
</template>


<script>
export default {
    name: 'color-picker',
    props: {
        importedColors: Array,
    },
    data() {
        return {
            currColor: '',
            colors: [
                { color: '#bdea8a', title: 'Lightgreen' },
                { color: '#fff475', title: 'Lightyellow' },
                { color: '#a7ffeb', title: 'Greenblue' },
                { color: '#f28b82', title: 'Lightorange' },
                { color: '#d7aefb', title: 'Lightpink' },
                { color: '#ffb248', title: 'lightgrey' },
                { color: '#16243d', title: 'darkblue' },
                { color: '#69c494', title: 'lightdarkgreen' },
                { color: '#33a9bb', title: 'lightblue' },
                { color: '#f5dd29', title: 'yellowbanana' },
            ],
        }
    },
    methods: {
        updateColor(color) {
            this.selectedColor = true
            this.currColor = color;
            this.$emit('updateColor', color);
        },
    },

}
</script>