<template>
  <div class="login">
    <div class="labels">
        <label class="usr">{{emailLbl}}</label>
        <label class="pass">{{passLbl}}</label>
    </div>
    <div class="navbar">
        <img class="logo" :src="facebookLogo"/>
        <form @submit.prevent="login()" class="credentials">
            <validation-provider class="userName" rules="required" v-slot="{ errors }">
              <input class="form-control username" type="text" v-model="email"/>
              <span>{{ errors[0] }}</span>
            </validation-provider>
            <validation-provider class="userName" rules="required" v-slot="{ errors }">
              <input class="form-control" type="password" v-model="password" required/>
              <span>{{ errors[0] }}</span>
            </validation-provider>
            <button class="login btn" type="submit">{{logIn}}</button>
        </form>    
    </div>
    <div class="forgotAccount">
        <a href="#" class="reset">{{forgotPass}}</a>
        <span v-show="tryAgain" class="tryAgain">{{incorrect}}</span>
    </div>
    <div class="placeholder">
        <img :src="bodyPlaceholder"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
      email: "",
      password: "",
      users: [],
      tryAgain: false,
      incorrect: "Wrong email or password"
    }
  },

    async created(){
      axios.get(`http://localhost:3000/users`).then((res) => {
        this.users = res.data;
      })
      .catch((err) => {
        console.log(err);
      }); 
    },

    methods: {
        login(){
          this.users.forEach((user) => {
            if (user.email == this.email && user.password == this.password){
              this.$store.dispatch('persistLoggedUser', user.name);
              this.$store.commit('isAuth', true);
              this.$router.replace({ name: "feed" });
            }
            else {
              this.tryAgain = true;
            }
          });
          
        },
    }
}
</script>
<style lang="sass" scoped>
    @import "../scss/login"
</style>