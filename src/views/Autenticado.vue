<template>
    <div>
        <h1>Autenticación exitosa !</h1>
        <input type="button" value="Cerrar sesion" @click="cerrarSesion">
        <p>
            Usuario: {{ usu }}
            <br>
            Email: {{email}}
            <br>
            <img :src="foto">
        </p>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    data(){
        return{
            usu:"",
            email:"",
            foto:""
        }
    },
    methods:{
        cerrarSesion(){
            let vm = this
            firebase.auth().signOut().then(function(){
                vm.$router.push("/")
            }).catch(function(error){
                console.log("Error")
                console.log(error)
            })
        }
    },
    beforeMount(){
        var user = firebase.auth().currentUser;

        if (user != null) {
        user.providerData.forEach(function (profile) {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
        });
        //console.log(user)
        this.usu = user.displayName;
        this.email = user.email;
        this.foto = user.photoURL;
        }
    }

}
</script>

<style>

</style>
