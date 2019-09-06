import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const baseURL = "http://localhost:3000/posts";
const usersURL = "http://localhost:3000/users";

export default new Vuex.Store({
  state: {
    loggedUser: '', 
    posts: [],
    users: [],
    auth: false
  },

  mutations: {
    isAuth(state, auth){
      state.auth = auth;
    },
    newLogIn(state, loggedUser){
      state.loggedUser = loggedUser;
    },
    getServerPosts(state, posts){
      state.posts = [...posts]; 
    },
    addNewPost(state, post){
      state.posts.push(post);
    },
    fetchUsers(state, users){
      state.users = [...users];
    }
  },

  getters: {
    authenticated: state => {
      return state.auth
    },

    loggedUser: state => {
      return state.loggedUser
    },

    updatedPosts: state => { 
      return state.posts.map(post => {
        post.liked.map(usernameWhoLiked => {
          if (usernameWhoLiked == state.loggedUser) {
            post.likedByActiveUser = true;
          }
          return usernameWhoLiked;
        })

        return post;
      }).sort((a, b) => b.id - a.id);
    },

    users: state => {
      return state.users
    }
  },

  actions: {
    persistLoggedUser(context, loggedUser){
      context.commit('newLogIn', loggedUser);
    },
    async getUsers(state){
      let res = await axios.get(usersURL);
      state.commit('fetchUsers', res.data);
    },

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
  },
  plugins: [createPersistedState()]
})
