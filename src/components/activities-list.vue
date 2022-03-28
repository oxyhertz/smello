<template>
    <section>
        <ul v-if="task.activities?.length" class="comment-text">
            <li v-for="comment, idx in task.activities" :key="comment._id">
                <avatar class="activity-avatar" size="32" :name="comment.byMember.fullname"></avatar>
                <div :class="{ activity: comment.isComment }">
                    <span class="member">{{ comment.byMember.username }}</span>
                    <timeago class="time" :datetime="comment.createdAt" />
                </div>
                <div class="task-activity-txt" :class="{ open: comment.isEditing }">
                    <input v-model="comment.txt" type="text" v-click-outside="closeComment" />
                </div>
                <comment-actions
                    :pp="comment._id"
                    :popo="isEditing"
                    v-if="comment.isEditing"
                    :class="{ open: comment.isEditing }"
                    class="comments-main-container flex space-between"
                    @updateItem="updateItem"
                />
                <button
                    v-if="comment.isEditing"
                    class="close-comment-edit"
                    @click="updateItem(comment._id, false)"
                ></button>
                <i class="fa-regular fa-face-smile-plus"></i>
                <a
                    v-if="!comment.isEditing && user._id === comment.byMember._id"
                    @click="(isEditing = true), (updateItem(comment._id, true))"
                >Edit</a>
                <span v-if="!comment.isEditing && user._id === comment.byMember._id">-</span>
                <a
                    v-if="!comment.isEditing && user._id === comment.byMember._id"
                    @click="deleteItem(comment._id)"
                >Delete</a>
            </li>
        </ul>
    </section>
</template>

<script>
import commentActions from './comment-actions.vue'
export default {
    name: 'activities-list',
    props: {
        task: Object,
        user: Object,
    },
    data() {
        return {
            isEditing: false,
            txt: [],
        }
    },
    methods: {
        closeComment() {
            this.isEditing = false
            this.$emit('closeComment')
        },
        deleteItem(id) {
            var comment = {
                _id: id
            }
            this.$emit('updateItem', { type: 'comment', val: JSON.parse(JSON.stringify(comment)) });
        },
        updateItem(id, isEditingCurrTask) {
            var currTask = JSON.parse(JSON.stringify(this.task));
            var comment = currTask.activities.find(comment => comment._id === id);
            comment.isEditing = isEditingCurrTask;
            this.$emit('updateItem', { type: 'comment', val: JSON.parse(JSON.stringify(comment)) });
            this.txt = '';
        }
    },
    components: {
        commentActions,
    }
}
</script>
