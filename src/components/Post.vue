<template>
    <div class="userpost">
        <img class="userPic" :src="placeholderImg">
        <div class="postInfo">
          <span class="usrname">{{post.user_name}}</span>
          <span class="datetime">{{post.created_at}} - </span>
          <span class="location">{{post.location}}</span>
        </div>
        <div class="description" v-if="post.type=='txt'">
          {{post.data.content}}
        </div>
        <div class="description" v-else>
          {{post.data.caption}}
          <img class="postedimg" :src="post.data.link"/>
       </div>
       <div class="feedback">
        <a class="like btn" v-on:click="incrementLikes(post.id)">
          <font-awesome-icon :icon="['far','thumbs-up']" />
          <span v-if="post.likedByActiveUser">{{likedTxt}}</span>
          <span v-else>{{likeTxt}}</span>
        </a>
        <button type="submit" class="comment btn" v-on:click="addComments(post.id)">
          <font-awesome-icon :icon="['far','comments']" />
          {{commentTxt}}
        </button>
        <div class="blueArea">
            <div class="likes" v-if="post.likes > 0">
                <font-awesome-icon :icon="['far','thumbs-up']" />
                <span v-if="post.likedByActiveUser && post.likes > 1" class="likeNb">{{youLiked}} {{post.likes-1}} {{others}}</span>
                <span v-else-if="post.likedByActiveUser" class="likeNb">{{youLikedThis}}</span>
                <span v-else class="likeNb">{{post.likes}}</span>
            </div>
            <div class="addComment">
                <img class="userPic" :src="placeholderImg"/>
                <input type="text" class="comment form-control" :placeholder="addComm" v-model="body" @keyup.enter="addComments(post.id)"/>
            </div>
            <CommentSection :post="post"></CommentSection>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CommentSection from './CommentSection'

export default {
    name: 'Post',

    data: function(){
      return{
        placeholderImg: require('../assets/user.png'),
        likeTxt: "Like",
        likedTxt: "Liked",
        commentTxt: "Comment",
        youLiked: "You and",
        youLikedThis: "You liked this",
        others: "others",
        comment: {},
        addComm: "Write a comment...",
        body: ""
      }
    },

    components:{
        CommentSection
    },

    props:{
      post: Object
    },

    created(){
      this.getPosts();
    },
    
    methods:{
        ...mapActions([
          'getPosts',
          'updatePost'
        ]),

        getThePost(postId){
            return this.updatedPosts.find((post) => {
                if(post.id == postId){
                    return post;
                }
            });
        },

        async incrementLikes(postId){
            let likedPost = this.getThePost(postId);

            if (likedPost.likedByActiveUser){ 
                for (let i=0; i<likedPost.liked.length; i++){
                    if(likedPost.liked[i] == this.$store.getters.loggedUser){
                        likedPost.likes--;
                        likedPost.liked.splice(i, 1);
                        likedPost.likedByActiveUser = false;
                    }
                }
            }else{
                likedPost.likes++;
                likedPost.liked.push(this.$store.getters.loggedUser);
                likedPost.likedByActiveUser = true;
            }
        
            this.$store.dispatch('updatePost', {postId, likedPost});
        },

        createCommentObj(postId){
            this.comment.user = this.$store.getters.loggedUser;
            this.comment.postId = postId;
            this.comment.body = this.body;
            return this.comment;

        },
      
        async addComments(postId){
            this.$store.dispatch('addComment', this.createCommentObj(postId));
            this.body = "";
        }
    },

    computed:{
      ...mapGetters([
        'updatedPosts',
        'loggedUser'
      ])
    },
}
</script>
<style lang="sass" scoped>
    @import "../scss/post"
</style>