<template>
    <div class="commentSection">
        <div class="commentBody" v-for="comment in comments" :key="comment.id">
            <div v-if="comment.postId == post.id">
                <img class="userPic" :src="placeholderImg"/>
                <span class="commentTxt">
                    <span class="user">{{comment.user}}</span>
                    {{comment.body}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    
    data: function(){
      return{
        placeholderImg: require('../assets/user.png')
      }
    },
    
    props:{
      post: Object
    },
    
    created(){
      this.getComments();
    },

    methods:{
        ...mapActions([
          'getComments'
        ])
    },

    computed:{
        ...mapGetters([
            'comments'
        ])
    }
}
</script>
<style lang="scss" scoped>
    @import "../scss/comments"
</style>