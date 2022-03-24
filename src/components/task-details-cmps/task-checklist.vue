<template>
    <section class="task-checklist">
        <header>
            <section class="header-logo">
                 <span class="checklist-icon"></span>
                <input type="text" class="checklist-title" v-model="listTitle" />
            </section>

            <section class="header-options">
                <button v-if="isAnyTodoDone" @click="isHideDone = !isHideDone" class="hide-show-btn">{{hideBtnTxt}}</button>
                <button @click="deleteChecklist">Delete</button>
            </section>
        </header>

        <div class="progress-bar">
            <span class="percentage">{{ doneTodosPerecent }}%</span>
            <progress :value="doneTodosPerecent" max="100"></progress>
        </div>

        <div class="todos-container">
            <div v-for="todo in todos" :key="todo._id">
                <div class="todo-container" v-if="isHideDone ? !todo.isDone : true">
                    <input type="checkbox" v-model="todo.isDone" />
                    <textarea :class="{completed: todo.isDone}" v-model="todo.title" rows="1"></textarea>
                </div>
            </div>
        </div>

        <button v-if="!addItemMode" @click="addItemMode = true">Add an item</button>
        <section v-else>
            <textarea v-model="newTodoTitle" cols="30" rows="2"></textarea>
            <section class="actions">
                <button @click="addTodo">Add</button>
                <button @click="addItemMode = false">X</button>
            </section>
        </section>
        
    </section>
</template>

<script>
import { utilService } from '../../services/utils-service';

export default {
    name: 'task-checklist',
    // props: {
    //     checklist: Object
    // },
    data() {
        return {
            addItemMode: false,
            newTodoTitle: '',
            isHideDone: false,
            listTitle: 'hello hello',
            todos: [
                {
                    "id": "212jX",
                    "title": "To Do 1",
                    "isDone": false
                },
                {
                    "id": "212jXx",
                    "title": "To Do 2",
                    "isDone": false
                },
                {
                    "id": "212jXa",
                    "title": "To Do 3",
                    "isDone": false
                }
            ]
        }
    },
    methods: {
        addTodo() {
            const todo = {
                _id: utilService.makeId(),
                title: this.newTodoTitle,
                isDone: false
            }
            this.todos.push(todo);
            this.newTodoTitle = '';
            this.addItemMode = false;
        },
        deleteChecklist() {
            
        }
    },
    computed: {
        doneTodosPerecent() {
            const numOfDoneTodos = this.todos.reduce((acc, todo) => todo.isDone ? acc + 1 : acc, 0);
            return parseInt(numOfDoneTodos / this.todos.length * 100);
        },
        isAnyTodoDone() {
            return this.todos.some(todo => todo.isDone);
        },
        hideBtnTxt() {
            if(!this.isHideDone) return 'Hide checked items';
            const numOfDoneTodos = this.todos.reduce((acc, todo) => todo.isDone ? acc + 1 : acc, 0);
            return `Show checked items (${numOfDoneTodos})`;
        }
    }
}
</script>
