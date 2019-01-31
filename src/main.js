import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false
var config = {
  apiKey: "AIzaSyA11CFv4Ne3XbwrjqF5T3_X304rXCmgU9A",
  authDomain: "auth-prueba-nea.firebaseapp.com",
  databaseURL: "https://auth-prueba-nea.firebaseio.com",
  projectId: "auth-prueba-nea",
  storageBucket: "auth-prueba-nea.appspot.com",
  messagingSenderId: "979632056818"
};
firebase.initializeApp(config);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
