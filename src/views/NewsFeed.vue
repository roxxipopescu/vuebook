<template>
  <div class="newsFeed">
    <div class="fb-navbar">
      <img :src="navbar" />
      <span class="username">{{$store.getters.loggedUser}}</span>
      <router-link to="/">
        <span class="signOut" v-on:click="signOut()">
          <font-awesome-icon icon="sign-out-alt" size="lg" />
        </span>
      </router-link>
    </div>
    <div class="feed-container">
      <div class="fb-sidebar-left">
        <img :src="sidebarLeft"/>
        <span class="username">{{$store.getters.loggedUser}}</span>
      </div>
      <div class="fb-wall">
        <FacebookWall></FacebookWall>
      </div>
      <div class="fb-sidebar-right">
        <img :src="sidebarRight"/>
      </div>
    </div>
  </div>
</template>

<script>
import FacebookWall from '@/components/FacebookWall.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'feed',
  components: {
    FacebookWall
  },
  data: function(){
    return{
      navbar: require('../assets/navbar.png'),
      sidebarLeft: require('../assets/sideleft.png'),
      sidebarRight: require('../assets/sideright.png'),
      username: "",
    }
  },

  computed:{
    ...mapGetters([
      'updatedPosts'
      ])
  },

  methods: {
    signOut(){
      this.$store.commit('isAuth', false);
      this.$store.dispatch('getPosts');

      for(const likedPost of this.updatedPosts){ 
        let postId = likedPost.id;
        likedPost.likedByActiveUser = false;
        this.$store.dispatch('updatePost', {postId, likedPost});
      }
    }
  },
  
}
</script>
<style lang="sass" scoped>
   @import "../scss/feed"
</style>