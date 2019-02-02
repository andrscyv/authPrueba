<template>
    <div class="buttonGroup">
      <input v-if="showGoogle" class="niceButton" type="button" value="Ingresar con Google " @click="autenticar(0)" >
      <input v-if="showFacebook" class="niceButton" type="button" value="Ingresar con Facebook " >
      <input v-if="showTwitter" class="niceButton" type="button" value="Ingresar con Twitter " >
      <input v-if="showGithub" class="niceButton" type="button" value="Ingresar con Github " >
      <input v-if="showEmail" class="niceButton" type="button" value="Ingresar con Email " >
    </div>
</template>

<script>
export default {
    data(){
        return {
            proveedores :[
                "GoogleAuthProvider",
                "FacebookAuthProvider",
                "TwitterAuthProvider",
                "GithubAuthProvider"
            ]
        }
    },
    props:['config'],

    computed:{
        showGoogle(){
            //console.log('show')
           // console.log(this.config)
            return this.tieneProveedor('google',this.config.proveedores)
        },
        showFacebook(){
            return this.tieneProveedor('facebook',this.config.proveedores)
        },
        showTwitter(){
            return this.tieneProveedor('twitter',this.config.proveedores)
        },
        showGithub(){
            return this.tieneProveedor('github',this.config.proveedores)
        },
        showEmail(){
            return this.tieneProveedor('email',this.config.proveedores)
        },
    },
    methods:{
        tieneProveedor(nombre, arr){
            let i = 0
            let encontrado = false;
            let res = true
            while( i < arr.length && !encontrado){
                //console.log(arr[i].proveedor)
                if(arr[i].hasOwnProperty('proveedor'))
                    encontrado = arr[i].proveedor === nombre

                i++
            }

            if( !encontrado )
                res = false

            return res
        },
        autenticar(proveedor){
            var firebase = this.config.fb
            var provider = new firebase.auth[this.proveedores[proveedor]]()
            var vm = this
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth().signInWithPopup(provider).then(this.config.callbacks.exito
                // ...
        ).catch(function(error) {
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

        }
    }

}
</script>

<style>

</style>
