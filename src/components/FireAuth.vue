<template>
    <div class="buttonGroup text-xs-center">
      <!-- <a v-for="b in buttons" :key="b.id" v-if="shows[b.id]" class="niceButton" :id="b.name" @click="autenticar(b.id)"> <img :src="b.img" class="img"> Ingresar con {{b.name}} </a> -->
      <!-- <a v-if="showGoogle" class="niceButton" id="Google" @click="autenticar(0)"><img :src="imgs[0].img" class="img"> Ingresar con Google</a>
      <a v-if="showFacebook" class="niceButton" id="Facebook" @click="autenticar(1)"><img :src="imgs[1].img" class="img"> Ingresar con Facebook</a>
      <a v-if="showTwitter" class="niceButton" id="Twitter" @click="autenticar(2)"><img :src="imgs[2].img" class="img"> Ingresar con Twitter</a>
      <a v-if="showGithub" class="niceButton" id="Github" @click="autenticar(3)"><img :src="imgs[3].img" class="img"> Ingresar con Github</a>
      <a v-if="showEmail" class="niceButton" id="Email" @click="autenticar(4)"><img :src="imgs[4].img" class="img"> Ingresar con Email</a>
       -->
<!-- <v-icon>fab fa-facebook-f</v-icon> -->
<!-- https://fontawesome.com/icons/google?style=brands -->

    

        <v-btn v-if="showGoogle" class="niceButton" round light id="Google" @click="autenticar(0)"><img :src="imgs[0].img" class="img">  <div class="text"> Ingresar con Google </div></v-btn>
        <v-btn v-if="showFacebook" class="niceButton" round dark id="Facebook" @click="autenticar(1)"><v-icon class="cool">fab fa-facebook-f</v-icon> <div class="text"> Ingresar con Facebook </div></v-btn>
        <v-btn v-if="showTwitter" class="niceButton" round dark id="Twitter" @click="autenticar(2)"><v-icon class="cool">fab fa-twitter</v-icon> <div class="text"> Ingresar con Twitter </div></v-btn>
        <v-btn v-if="showGithub" class="niceButton" round dark id="Github" @click="autenticar(3)"><v-icon class="cool">fab fa-github</v-icon> <div class="text"> Ingresar con Github </div></v-btn>
        <!-- <v-btn v-if="showEmail" class="niceButton" round dark id="Email" @click="autenticar(4)"><v-icon class="cool">far fa-envelope</v-icon> <div class="text"> Ingresar con Email </div></v-btn> -->

        <v-dialog
            v-model="mailForm"
            width="500">

            <v-btn v-if="showEmail" class="niceButton" round dark id="Email" @click="autenticar(4)" slot="activator"><v-icon class="cool">far fa-envelope</v-icon> <div class="text"> Ingresar con Email </div></v-btn>

            <v-card>
                <v-card-title
                class="headline indigo white--text lighten-1"
                primary-title
                >
                Inicia Sesión o regístrate
                </v-card-title>

                <v-card-text class="text-xs-center">
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation>

                        <v-text-field
                        v-model="email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        required
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                        ></v-text-field>

                        <v-text-field
                        v-model="psswrd"
                        :rules="pwdRules"
                        type="password"
                        label="Contraseña"
                        required
                        ></v-text-field>

                        <v-btn outline round color="warning" @click="registro">Regístrate</v-btn>
                        <v-btn outline round :disabled="!valid" color="success" @click="validate"> Ingresar </v-btn>

                        
                    </v-form>
                </v-card-text>


                
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props:['config'],
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        }
      },
    data(){
        return {
            mailForm:false,
            proveedores :[
                "GoogleAuthProvider",
                "FacebookAuthProvider",
                "TwitterAuthProvider",
                "GithubAuthProvider"
            ],
            imgs:[ 
                {img: require("@/assets/google.png")},
                {img: require("@/assets/facebook.png")},
                {img: require("@/assets/twitter.png")},
                {img: require("@/assets/github.png")},
                {img: require("@/assets/email2.png")}
            ],
            valid: true,
            email: '',
            userRules: [
            v => !!v || 'Usuario requerido'
            ],
            psswrd: '',
            pwdRules: [
            v => !!v || 'Contraseña requerida'
            ]
        }
    },
    

    computed:{
        showGoogle(){
            //console.log('show')
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
            //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth().signInWithPopup(provider).then(this.config.callbacks.exito)
            .catch(this.config.callbacks.error);

        },
        validate () {
            if (this.$refs.form.validate()) {
                this.snackbar = true
            }
        },
        registro () {
            
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
    
  }

  .niceButton{
    width: 300px;
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
    margin-right: 10px;
  }
  
  .cool{
    margin-right:10px;     
    margin-left: 5px;
  }

  .fa-google{
    color: red!important;
  }

  .text{
    width: 200px;
    text-align: left;
    margin-left: 10px;
  }

</style>
