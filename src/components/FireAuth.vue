<template>
    <div class="buttonGroup">
      <a v-for="b in buttons" :key="b.id" v-if="shows[b.id]" class="niceButton" :id="b.name" @click="autenticar(b.id)"> <img :src="b.img" class="img"> Ingresar con {{b.name}} </a>
    </div>
</template>

<script>
export default {
    props:['config'],
    data(){
        return {
            proveedores :[
                "GoogleAuthProvider",
                "FacebookAuthProvider",
                "TwitterAuthProvider",
                "GithubAuthProvider"
            ],
            shows: this.config.shows,
            buttons:[ 
                {id: 0, name: "Google", img: require("@/assets/google.png")},
                {id: 1, name: "Facebook", img: require("@/assets/facebook.png")},
                {id: 2, name: "Twitter", img: require("@/assets/twitter.png")},
                {id: 3, name: "Github", img: require("@/assets/github.png")},
                {id: 4, name: "Email", img: require("@/assets/email2.png")}
            ]
        }
    },
    

    computed:{
        showGoogle(){
            console.log('show')
            //console.log(this.config)
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
                console.log(arr[i].proveedor)
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
            //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth().signInWithPopup(provider).then(this.config.callbacks.exito)
            .catch(this.config.callbacks.error);

        }
    }

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
    cursor: pointer;
  }

  #Email{
    background-color: #d31800;
  }

  #Facebook{
    background-color: #3a559f;
  }

  #Twitter{
    background-color: #55ACEE;
  }

  #Github{
    background-color: black;
  }
  #Google{
    color: #24292e;
  }

  .img{
    height: 25px;
    width: 25px;
    margin-top: 5px;
    margin-right: 10px;
    margin-bottom: -2px;
  }

</style>
