///window.Vue = require('vue');

// Vue.config.performance = true;

//const axiosApi = require('axios');

//window.baseUrl = document.head.querySelector('meta[name="base-url"]').content;

/*

const axios = axiosApi.create({
    baseURL: window.baseUrl
});

window.axios = axios;

*/

// Login
//import LoginFrm from './components/Login.vue';
import ModuloAdmon_Usuarios from './components/ModuloAdmon/Usuarios/Usuarios.vue';


// Login
//Vue.component('LoginForm', LoginFrm);
Vue.component('Usuarios', ModuloAdmon_Usuarios);

if(document.getElementById('app')) 
{
	window.app = new Vue({
	    el: '#app'
	});	
}

