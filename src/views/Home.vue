<template>
  <div class="home">
    <h1> Auth de firebase</h1>
<!--     <p>Usuario</p>
    <input type="text" name="usu" id="">
    <br>
    <p>Contraseña</p>
    <input type="text" name="psw" id="">
    <br>
    <input type="button" value="Login"> -->
    <div class="buttonGroup">
      <a v-for="b in buttons" :key="b.id" class="niceButton" :id="b.name"> <img :src="b.img" class="img"> Ingresar con {{b.name}} </a>
      <!-- <input v-if="showGoogle" class="niceButton" type="button" value="Ingresar con Google " @click="authGoogle">
      <input v-if="showFacebook" class="niceButton" type="button" value="Ingresar con Facebook " @click="authFacebook">
      <input v-if="showTwitter" class="niceButton" type="button" value="Ingresar con Twitter " @click="authTwitter">
      <input v-if="showGithub" class="niceButton" type="button" value="Ingresar con Github " @click="authGithub">
      <input v-if="showEmail" class="niceButton" type="button" value="Ingresar con Email " @click="authEmail"> -->
    </div>
   <!--  <input type="button" value="Auth con Google " @click="authGoogle"> -->
    <auth :config="config" />
    
 <!--    <div id="firebaseui-auth-container"></div>
    <div id="loader" style="display:none">Loading...</div> -->
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import Auth from '@/components/FireAuth.vue'

export default {
  data(){
    var vm = this
    return {

      buttons:[ 
        {id: 0, name: "Google", img: require("@/assets/google.png"), show:true},
        {id: 1, name: "Facebook", img: require("@/assets/facebook.png"), show:true},
        {id: 2, name: "Twitter", img: require("@/assets/twitter.png"), show:true},
        {id: 3, name: "Github", img: require("@/assets/github.png"), show:true},
        {id: 4, name: "Email", img: require("@/assets/email.png"), show:true}
      ],
      showGoogle: true,
      showFacebook: true,
      showTwitter: true,
      showGithub: true,
      showEmail: true,


      config:{
        fb: firebase,
        proveedores:[
          {
            proveedor:'google'
          },
          {
            proveedor:'facebook'
          },
        ],
        callbacks:{
          exito(res){
            console.log(vm)
            vm.$router.push('autenticado')
          },
          error(err){
            //console.log("Error de componenete FireAuth")
            console.log(err)
          }
        }
      }
    }
  },
  name: 'home',
  components: {
    //HelloWorld
    Auth
  },
  methods:{
    /* authGoogle(){
        var provider = new firebase.auth.GoogleAuthProvider()
        var vm = this
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        vm.$router.push('autenticado')
        console.log(user)
        console.log(token)
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log("ERROR")
        console.log(errorCode)
        var errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        var email = error.email;
        console.log(email)
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(credential)
        // ...
      });

    } */

  },
   /* mounted() {
     document.getElementById('loader').style.display = 'visible';
    var uiConfig = {
      signInSuccessUrl: '/autenticado',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID

        ],
        uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
      };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
    }, */
}
</script>

<style>
  .buttonGroup{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 300px;
  }

  .niceButton{
    height: 40px;
    width: 300px;
    border-radius: 5px;
    color: white;
    box-shadow: 2px 2px grey;
  }

  #Email{
    background-color: #dd4b39;
  }

  #Facebook{
    background-color: #3B5998;
  }

  #Twitter{
    background-color: #55ACEE;
  }

  #Github{
    background-color: #24292e;
  }
  #Google{
    color: black;
  }

  .img{
    height: 25px;
    width: 25px;
    margin-top: 5px;
  }
</style>
