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
<<<<<<< HEAD
        shows:[true, true, true,true,true],
        //shows:[google, facebook, twitter, github, email],
=======
>>>>>>> ab539d8c836e67a6765358fc1cf959176519b3f7
        proveedores:[
          {
            proveedor:'google'
          },
          {
            proveedor:'facebook'
          }
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
