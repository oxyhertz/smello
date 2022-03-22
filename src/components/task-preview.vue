<template>
    <Draggable v-if="item">
        <div class="task-preview-container" style=" margin-right:10px;">
            <p>{{item.title}}</p>
        </div>
    </Draggable>
</template>

<script>
import { Draggable } from 'vue3-smooth-dnd'

export default {
    name: "task-preview",
    data() {
        return {
        }
    },
    components: {
        Draggable
    },
    props: {
        item: {
            type: Object,
            required: true
        },
    },
};
</script>