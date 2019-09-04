import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseURL = "http://localhost:3000/posts";

export default new Vuex.Store({
  state: {
    loggedUser: '',
    posts: []
  },
  mutations: {
    newLogIn(state, loggedUser){
      state.loggedUser = loggedUser;
    },
    getServerPosts(state, posts){
      state.posts = [...posts]; 
    },
    addNewPost(state, post){
      state.posts.push(post);
    }
  },
  getters: {
    loggedUser: state => state.loggedUser,
    updatedPosts: state => {
      return state.posts
    }
  },
  actions: {
    async getPosts(state){
      let res = await axios.get(baseURL);
      state.commit('getServerPosts', res.data);
    },
    async addPost(state, newPost){
      let data = await axios.post(baseURL, newPost);
      state.commit('addNewPost', data.data); 
    },
    async updatePost(state, payload){ 
      let tbu = baseURL + '/' + payload.postId;
      await axios.put(tbu, payload.likedPost);
    }
  }
})
