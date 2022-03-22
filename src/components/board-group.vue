<template>
    <Container
    class="board-group-container"
    group-name="cols"
    tag="div"
    orientation="horizontal"
    drag-class="drop-rotation"
    :drop-placeholder="{
      className:
        `drop-placeholder-color`
    }"
    @drop="onColumnDrop($event)"
  >
    <Draggable class v-for="group in scene.groups" :key="group.id">
      <div class="">
        <!-- TASK TITLE/INPUT HERE -->
        <div class>
          <span>{{group.title}}</span>
        </div>
        <!-- column -->
        <Container
          class
          orientation="vertical"
          group-name="col-items"
          :shouldAcceptDrop="(e, payload) => (e.groupName === 'col-items' && !payload.loading)"
          :get-child-payload="getCardPayload(group.id)"
          :drop-placeholder="{
            className:
              `drop-placeholder-color`
          }"
          drag-class="drop-rotation"
          @drop="(e) => onCardDrop(group.id, e)"
        >
          <!-- Items -->
          <task-preview v-for="item in group.tasks" :key="item.id" :item="item" />
          <task-add/>
        </Container>
      </div>
    </Draggable>
  </Container>
</template>


<script>
import { Container, Draggable } from 'vue3-smooth-dnd';
import taskPreview from './task-preview.vue';
import taskAdd from './task-add.vue';

export default {
    name: 'board-group',
    props: {
        groups: {
            type: Array,
            required: true
        } 
    },
    data() {
        return {
            scene: {groups: this.groups}
        }
    },
    components: {
        Container,
        Draggable,
        taskPreview,
        taskAdd,
    },
    methods: {
        applyDrag(arr, dragResult) {
            const { removedIndex, addedIndex, payload } = dragResult;
            if (removedIndex === null && addedIndex === null) return arr;
            const result = [...arr];
            let itemToAdd = payload;
            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0];
            }
            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd);
            }
            return result;
        },
        onColumnDrop(dropResult) {
            const scene = Object.assign({}, this.scene)
            scene.groups = this.applyDrag(scene.groups, dropResult)
            // this.scene = scene
        },
        onCardDrop(columnId, dropResult) {

            // check if element where ADDED or REMOVED in current collumn
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

                const scene = Object.assign({}, this.scene)
                const column = scene.groups.filter(p => p.id === columnId)[0]
                const itemIndex = scene.groups.indexOf(column)
                const newColumn = Object.assign({}, column)

                // check if element was ADDED in current column
                if ((dropResult.removedIndex == null && dropResult.addedIndex >= 0)) {
                    // your action / api call
                    // dropResult.payload.loading = true
                    // simulate api call
                    // setTimeout(function () { dropResult.payload.loading = false }, (Math.random() * 5000) + 1000);

                }

                newColumn.tasks = this.applyDrag(newColumn.tasks, dropResult)
                // this.$emit('groupChange', {idx: itemIndex, newCol: newColumn})
                this.$store.dispatch({type: 'groupDND', idx: itemIndex, newColumn})
                // scene.groups.splice(itemIndex, 1, newColumn)
                // this.scene = scene
            }
        },
        getCardPayload(columnId) {
            return index => {
                return this.scene.groups.filter(p => p.id === columnId)[0].tasks[index]
            }
        }
    }
}
</script>

<!-- <style>
/** NB: dont remove, 
* When using orientation="horizontal" it auto sets "display: table"
* In this case we need flex and not display table  
*/
.smooth-dnd-container.horizontal {
  display: flex !important;
}
</style> -->