<template>
  <div class="facebookWall">
    <AddPost :users="users"></AddPost>
    <div class="existingPosts">
      <div class="userpost" v-for="post in updatedPosts" :key="post.id">
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
       <div class="likes" v-if="post.likes > 0">
         <font-awesome-icon :icon="['far','thumbs-up']" />
         <span class="likeNb">{{post.likes}}</span>
       </div>
       <div class="feedback">
        <a class="like btn" v-on:click="incrementLikes(post.id)">
          <font-awesome-icon :icon="['far','thumbs-up']" />
          <span v-if="post.likedByActiveUser">{{likedTxt}}</span>
          <span v-else>{{likeTxt}}</span>
        </a>
        <a class="comment btn" v-on:click="addComments(post.id)">
          <font-awesome-icon :icon="['far','comments']" />
          {{commentTxt}}
        </a>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import AddPost from './AddPost'
import { mapGetters } from 'vuex'

const baseURL = "http://localhost:3000/posts";

export default {
  name: 'FacebookWall',

  components: {
    AddPost
  },

  data: function(){
    return{
      placeholderImg: require('../assets/user.png'),
      likeTxt: "Like",
      likedTxt: "Liked",
      commentTxt: "Comment",
      users: [],
      isLiked: false,
    }
  },

  created(){
    this.$store.dispatch('getPosts');

    for (const post of this.updatedPosts){
      let postId = post.id;
      for(const person of post.liked){
        if(person == this.$store.getters.loggedUser){
          post.likedByActiveUser = true;
          //this.$store.dispatch('updatePost', { postId, post});
        }
      }
    }

    this.$store.commit('getServerPosts', this.updatedPosts);

    axios.get(`http://localhost:3000/users`).then((res) => {
      this.users = res.data;
    })
    .catch((err) => {
      console.log(err);
    }); 
    
  },

  computed:{
    ...mapGetters(['updatedPosts'])
  },

  methods: {
    async incrementLikes(postId){
      let likedPost = this.updatedPosts.find((post) => {
        if(post.id == postId){
          return post;
        }
      });

      for(const person of likedPost.liked){
        if(person == this.$store.getters.loggedUser){
          this.isLiked = true;
        }
      }

      if (this.isLiked){
        for (let i=0; i<likedPost.liked.length; i++){
          if(likedPost.liked[i] == this.$store.getters.loggedUser){
            likedPost.likes--;
            likedPost.liked.splice(i, 1);
            this.isLiked = false;
            //this.likeTxt = 'Like';
          }
        }
      }else{
          likedPost.likes++;
          likedPost.liked.push(this.$store.getters.loggedUser);
          this.isLiked = true;
          //this.likeTxt = 'Liked';
      }
  
      this.$store.dispatch('updatePost', {postId, likedPost});
    },
    
  },
  addComments(postId){

  }

}
</script>

<style scoped lang="scss">
@import "../scss/wall"
</style>
