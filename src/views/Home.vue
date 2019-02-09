<template>
  <div class="home">
    <h1> Auth de firebase</h1>
    <auth :config="config" />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import firebase from 'firebase'
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
          }
        ],
        callbacksBrowser:{
          exito(res){
            console.log(vm)
            vm.$router.push('autenticado')
          },
          error(err){
            //console.log("Error de componenete FireAuth")
            console.log(err)
          }
        },
          callbacksMobile:{
          exito(result) {
            console.log("Objeto resultado de callback de mobile")
            console.log(result)
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
                
            }
            // The signed-in user info.
            var user = result.user;
            console.log(user)
            if( user && firebase.auth().currentUser){
              alert('Auth correcta !')
                vm.$router.push('autenticado')
            }
            },
          error(err){
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...}
            }
          }
      }
    }
  },
  name: 'home',
  components: {
    //HelloWorld
    Auth
  }
}
</script>

<style>

</style>
