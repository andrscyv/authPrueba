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

            <v-btn v-if="showEmail" class="niceButton" round dark id="Email" slot="activator"><v-icon class="cool">far fa-envelope</v-icon> <div class="text"> Ingresar con Email </div></v-btn>

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
                            :rules="emailRules"
                            label="E-mail*"
                            required
                        ></v-text-field>

                        <v-text-field
                        v-model="psswrd"
                        :rules="pwdRules"
                        type="password"
                        label="Contraseña*"
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
            valid: false,
            email: '',
            emailRules: [
                v => !!v || 'E-mail requerido',
                v => /.+@.+/.test(v) || 'El correo debe de ser válido'
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
        esMovil(){
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
             check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;

        },
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
            if(this.esMovil())
                firebase.auth().signInWithRedirect(provider);
            else 
                firebase.auth().signInWithPopup(provider).then(this.config.callbacksBrowser.exito)
                .catch(this.config.callbacksBrowser.error);
            
            
        },
        validate () {
            if (this.$refs.form.validate()) {
                this.snackbar = true
            }
        },
        registro () {
            
        }
    },
    mounted(){
        var firebase = this.config.fb
        if(this.esMovil())
            firebase.auth().getRedirectResult()
            .then(this.config.callbacksMobile.exito)
            .catch(this.config.callbacksMobile.error);
    }

}
</script>

<style scoped>
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
