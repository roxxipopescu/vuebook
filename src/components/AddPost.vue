<template>
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
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import {mapGetters, mapActions} from 'axios'

export default {
    name: 'AddPost',

    data: function(){
      return{
        placeholderImg: require('../assets/user.png'),
        createPost: "Create a post",
        postImage: "Photo/Video",
        placeholderLive: "Live video",
        postPlaceholder: "What's on your mind?",
        imgUrlLbl: "Add image url:",
        postText: "",
        imgUrl: "",
        imgPost: false,
        newPost: {}
      }
    },

    props:{
      users: Array
    },

    methods:{
      showFields(){
        this.imgPost = !this.imgPost;
        if(this.imgPost){
            this.postPlaceholder = "Image caption";
        }else{
            this.postPlaceholder = "What's on your mind?";
        }
      },

      getUserId(username){
        for (let i = 0; i < this.users.length; i++){
          if (username == this.users[i].name){
            return this.users[i].id;
          }
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
      this.newPost.created_at = new Date().toJSON().slice(0,10).replace(/-/g,'-');
      this.newPost.user_name = this.$store.getters.loggedUser;
      this.newPost.user_id = this.getUserId(this.newPost.user_name);
      this.newPost.likedByActiveUser = false;
      
      return this.newPost;
    },

    async post(){
      this.$store.dispatch('addPost', this.newPostData());

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

  }
}
</script>
<style lang="sass" scoped>
    @import "../scss/addPost"
</style>