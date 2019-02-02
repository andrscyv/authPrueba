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
