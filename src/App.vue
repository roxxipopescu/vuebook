<template>
  <div id="app">
    <router-view @authenticated="setAuthenticated"/>
  </div>
</template>
<script>
export default {
  data(){
    return{
      authenticated: false
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
