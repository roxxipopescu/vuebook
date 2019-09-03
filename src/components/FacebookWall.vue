<template>
  <div class="facebookWall">
    <div class="addPost">
      <form @submit.prevent="post()" class="postSmth">
        <div class="actions">
          <font-awesome-icon icon="pencil-alt" />
          <button class="post btn" type="submit">{{createPost}}</button>
          <font-awesome-icon :icon="['far','image']" />
          <a class="postImg btn" v-on:click="showFields()">{{postImage}}</a>
          <font-awesome-icon icon="video" />
          <a class="placeholderLive btn">{{placeholderLive}}</a>
        </div>
        <div class="visibleFields">
          <validation-provider rules="required|max:250" v-slot="{ errors }">
            <textarea class="postTxt form-control" :placeholder="postPlaceholder" rows="3" v-model="postText"/>
            <span ref="err1">{{ errors[0] }}</span>
          </validation-provider>
          <img :src="placeholderImg" class="placeholder"/>
          <font-awesome-icon class="smiley" size="lg" :icon="['far','smile']" />
        </div>
        <transition name="fade">
          <div class="invisibleFields" v-show="imgPost">
            <label class="imgUrlLbl">{{imgUrlLbl}}</label>
             <validation-provider rules="required" v-slot="{ errors }">
              <input class="form-control imageUrl" type="text" v-model="imgUrl" />
              <span ref="err2">{{ errors[0] }}</span>
             </validation-provider>
          </div>
        </transition>
      </form>
    </div>
    <div class="existingPosts">
      <div class="userpost" v-for="post in posts" :key="post.id">
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
          {{likeTxt}} 
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
import Vue from 'vue'
import { setTimeout } from 'timers';


const baseURL = "http://localhost:3000/posts";

export default {
  name: 'FacebookWall',

  data: function(){
    return{
      placeholderImg: require('../assets/user.png'),
      createPost: "Create a post",
      postImage: "Photo/Video",
      placeholderLive: "Live video",
      postPlaceholder: "What's on your mind?",
      imgUrlLbl: "Add image url:",
      likeTxt: "Like",
      commentTxt: "Comment",
      postText: "",
      imgUrl: "",
      imgPost: false,
      newPost: {},
      posts: [],
      users: [],
      isLiked: false,
    }
  },

  created(){
    axios.get(baseURL).then((res) => {
        this.posts = res.data;
      })
      .catch((err) => {
        console.log(err);
      }); 
      axios.get(`http://localhost:3000/users`).then((res) => {
        this.users = res.data;
      })
      .catch((err) => {
        console.log(err);
      }); 
  },

  methods: {
    getUserId(username){
      for (let i = 0; i < this.users.length; i++){
        if (username == this.users[i].name){
          return this.users[i].id;
        }
      }
    },

    showFields(){
      this.imgPost = !this.imgPost;
      if(this.imgPost){
        this.postPlaceholder = "Image caption";
      }else{
        this.postPlaceholder = "What's on your mind?";
      }
    },

    newPostData(){
      this.newPost.data = {};
      if(this.imgPost){
        this.newPost.type = "img";
        Vue.set(this.newPost.data, 'caption', this.postText);
        Vue.set(this.newPost.data, 'link', this.imgUrl);
      }else{
        this.newPost.type = "txt";
        Vue.set(this.newPost.data, 'content', this.postText);
      }
      this.newPost.location = "Cluj-Napoca";
      this.newPost.likes = 0;
      this.newPost.liked = [];
      this.newPost.created_at = new Date().toJSON().slice(0,10).replace(/-/g,'-');;
      this.newPost.user_name = this.$store.getters.loggedUser;
      this.newPost.user_id = this.getUserId(this.newPost.user_name);
      
      return this.newPost;
    },

    async post(){
      const res = await axios.post(baseURL, this.newPostData());
      this.posts = [...this.posts, res.data];
      this.postText = "";
      this.imgUrl = "";
      this.$refs.err1.innerHTML = "";
      this.$refs.err2.innerHTML = "";
      this.postPlaceholder = "Posted succesfully!";
      this.imgPost = false;
      setTimeout(function(){
        this.postPlaceholder = "What's on your mind?";
      }.bind(this), 2000);
    },

    async incrementLikes(postId){
      let likedPost = this.posts.find((post) => {
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
          }
        }
      }else{
          likedPost.likes++;
          likedPost.liked.push(this.$store.getters.loggedUser);
      }
  
      let tbu = baseURL + '/' + postId;
      const res = await axios.put(tbu, likedPost);
      },

    addComments(postId){

    }
  },

}
</script>

<style scoped lang="scss">
@import "../scss/wall"
</style>
