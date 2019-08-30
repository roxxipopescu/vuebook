<template>
  <div class="newsFeed">
    <div class="fb-navbar">
      <img :src="navbar" />
      <span class="username">Roxana</span>
      <router-link to="/" >
        <span class="signOut" >
          <font-awesome-icon icon="sign-out-alt" size="lg" />
        </span>
      </router-link>
    </div>
    <div class="feed-container">
      <div class="fb-sidebar-left">
        <img :src="sidebarLeft"/>
        <span class="username">Roxana</span>
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
// @ is an alias to /src
import FacebookWall from '@/components/FacebookWall.vue'

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
    }
  },
  methods: {
    
  },
}
</script>
<style lang="sass" scoped>
   @import "../scss/feed"
</style>