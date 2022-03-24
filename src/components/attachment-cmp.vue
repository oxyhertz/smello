<template >
    <section class="attachments-container">
        <ul>
            <attachmentPreview @removeAttachment="removeAttachment" v-for="attachment in attachments" :attachment="attachment" :key="attachment.id"/>
        </ul>
    </section>
</template>

<script>
import attachmentPreview from "./attachment-preview.vue"
export default {
    name: 'attachment',
    data(){
        return{
            attachments:[
                 {
                    createdAt: 1641923431774,
                    url: "https://images.unsplash.com/photo-1610972221114-c48c6bb5d2eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    fileName: "Winter",
                    type: "image",
                    suffix: "jpg",
                    id: "0oZ9SFc1"
                },
                {
                    createdAt: 1641223431774,
                    url: "https://images.unsplash.com/photo-1610972221114-c48c6bb5d2eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    fileName: "Homeland",
                    type: "image",
                    suffix: "jpg",
                    id: "0o229SFc1"
                }
            ]
        }
    },
    methods:{
        removeAttachment(attachmentId){
            const idx = this.attachments.findIndex(attachment => attachmentId === attachment.id)
            this.attachments.splice(idx,1);
            this.updateAttachments(JSON.parse(JSON.stringify(this.attachments)))
        },
        updateAttachments(attachments){
            this.$emit("updateAttachments",attachments)
        }
    },
    components:{
       attachmentPreview 
    }
}
</script>
