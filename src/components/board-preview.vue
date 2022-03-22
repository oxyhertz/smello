<template>
    <li>
        {{board.title}}
    </li>
</template>

<script>
export default{
    name: 'board-preview',
    props:{
        board:Object
    }
}
</script>