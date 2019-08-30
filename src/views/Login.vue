<template>
  <div class="login">
    <div class="labels">
        <label class="usr">{{emailLbl}}</label>
        <label class="pass">{{passLbl}}</label>
    </div>
    <div class="navbar">
        <img class="logo" :src="facebookLogo"/>
        <form @submit.prevent="login()" class="credentials">
            <input class="form-control username" type="text" v-model="username" required/>
            <input class="form-control" type="password" v-model="password" required/>
            <button class="login btn" type="submit">{{logIn}}</button>
        </form>    
    </div>
    <div class="forgotAccount">
        <a href="#" class="reset">{{forgotPass}}</a>
    </div>
    <div class="placeholder">
        <img :src="bodyPlaceholder"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'login',
  

  data: function(){
    return{
      facebookLogo: require('../assets/facebook.png'),
      bodyPlaceholder: require('../assets/login-body.png'),
      logIn: "Log in",
      forgotPass: "Forgot account?",
      emailLbl: "Email or Phone",
      passLbl: "Password",
      username: "",
      password: ""
    }
  },

    methods: {
        login(){
            this.$emit("authenticated", true);
            this.$router.replace({ name: "feed" });
        },
    }
}
</script>
<style lang="sass" scoped>
    @import "../scss/login"
</style>