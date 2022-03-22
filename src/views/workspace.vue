<template lang="">
    <section class="workspace-container">
        <h2>Workspace</h2>
        <board-list :boards="boards"></board-list>
    </section>
</template>
<script>
import workspaceFilter from "../components/workspace-filter.vue"
import boardList from "../components/board-list.vue"
export default {
    name: 'workspace',
    computed:{
        boards(){
            return  this.$store.getters.boards
        }
    },
    components:{
        workspaceFilter,
        boardList
    }
}
</script>
