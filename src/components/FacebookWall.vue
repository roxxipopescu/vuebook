<template>
  <div class="facebookWall">
    <AddPost :users="users"></AddPost>
    <div class="existingPosts">
      <div class="userpost" v-for="post in updatedPosts" :key="post.id">
        <Post :post="post"></Post>
    </div>
  </div>
  </div>
</template>

<script>
import AddPost from './AddPost'
import Post from './Post'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FacebookWall',

  components: {
    AddPost,
    Post
  },

  data: function(){
    return{
      placeholderImg: require('../assets/user.png'),
      likeTxt: "Like",
      likedTxt: "Liked",
      commentTxt: "Comment",
      youLiked: "You and",
      youLikedThis: "You liked this",
      others: "others",
    }
  },

  created(){
    this.getPosts();
    this.getUsers();
  },

  computed:{
    ...mapGetters([
      'updatedPosts',
      'users',
      'loggedUser'
    ])
  },

  methods: {
    ...mapActions([
      'getPosts',
      'getUsers'
    ]),
    
    
  }

}
</script>

<style scoped lang="scss">
@import "../scss/wall"
</style>
