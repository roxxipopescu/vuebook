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
            <span>{{ errors[0] }}</span>
          </validation-provider>
          <img :src="placeholderImg" class="placeholder"/>
          <font-awesome-icon class="smiley" size="lg" :icon="['far','smile']" />
        </div>
        <transition name="fade">
          <div class="invisibleFields" v-show="imgPost">
            <label class="imgUrlLbl">{{imgUrlLbl}}</label>
             <validation-provider rules="required" v-slot="{ errors }">
              <input class="form-control imageUrl" type="text" v-model="imgUrl" />
              <span>{{ errors[0] }}</span>
             </validation-provider>
          </div>
        </transition>
      </form>
    </div>
    <div class="existingPosts">
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

const baseURL = "http://localhost:3000/posts"

export default {
  name: 'FacebookWall',

  data: function(){
    return{
      placeholderImg: require('../assets/user.png'),
      createPost: "Create a post",
      postImage: "Photo/Video",
      placeholderLive: "Live video",
      postPlaceholder: "What's on your mind?",
      postText: "",
      imgUrl: "",
      imgPost: false,
      imgUrlLbl: "Add image url:",
      newPost: {},
      posts: [],
      users: []
    }
  },

  async created(){
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
      this.newPost.id = this.posts[this.posts.length-1]++;
      if(this.imgPost){
        this.newPost.type = "img";
        this.newPost.data.caption = this.postText;
        this.newPost.data.link = this.imgUrl;
      }else{
        this.newPost.type = "txt";
        this.newPost.data = {};
        Vue.set(this.newPost.data, 'content', this.postText);
        //this.newPost.data['content'] = this.postText;
      }
      this.newPost.location = "Cluj-Napoca";
      this.newPost.likes = 0;
      this.newPost.created_at = new Date();
      this.newPost.user_name = this.$store.getters.loggedUser;
      this.newPost.user_id = this.getUserId(this.newPost.user_name);
      
      return this.newPost;
    },

    async post(){
      const res = await axios.post(baseURL, this.newPostData());
      this.postText = "";
      this.imgUrl = "";
    },
  },

}
</script>

<style scoped lang="scss">
@import "../scss/wall"
</style>
