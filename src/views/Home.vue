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
        shows:[true, true, false, false, false],
        //shows:[google, facebook, twitter, github, email],
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
  }
}
</script>

<style>

</style>
