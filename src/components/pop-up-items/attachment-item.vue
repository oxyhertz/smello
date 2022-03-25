<template >
    <div>
        <h2>AttachmentItem</h2>
        <label v-if="!isLoading">
            <img src="https://clippingpathgreat.com/wp-content/uploads/2021/04/upload-files-1024x707.jpg" alt="">
            <input hidden type="file" @change="onUploadImg"/>
        </label>
        <img v-else src="../../images/Bar-Preloader-1.gif" alt="">
    </div>
</template>
<script>
import { utilService } from '../../services/utils-service'
import {uploadImg} from '../../services/imgUpload.service'
export default {
  name:'attachment-item',
  data(){
      return{
          isLoading: false,
          attachment: {
              createdAt:null,
              fileName:null,
              url:null,
              type:"image",
              id: utilService.makeId()
          }
      }
  },  
  methods:{
     async onUploadImg(ev){
          this.isLoading = true
          const fileName = ev.target.files[0].name;
          const createdAt = ev.target.files[0].lastModified;
          const res = await uploadImg(ev)
          this.attachment.fileName = fileName;
          this.attachment.createdAt = createdAt;
          this.attachment.url = res.url;
          this.isLoading = false;
          const item ={
              type:'attachment',
              item:JSON.parse(JSON.stringify(this.attachment))
          }
          this.$emit('addItem',item)
      }
  }
}
</script>
