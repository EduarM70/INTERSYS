<template>
    <div class="marginar-al-centro-vh">
        <div id="modal"></div>
        <form @submit.prevent="loginForm" id="" class="form-footer" style="overflow: hidden; margin: 0 auto;">
            <div class="header">
                <img :src="logoUrl" style="width: 100%;" alt="">
            </div>
            <div class="form-body animated bounceInRight" style="padding: 30px 0px;">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="username" placeholder="Nombre">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" v-model="password" placeholder="Contraseña">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Iniciar sesión</button>
                </div>
            </div>
            <div class="footer">
                <a :href="recoveryUrl">Olvidé mi contraseña</a>
            </div>

        </form>
    </div>
</template>
<script>
//import Search from './SearchBar.vue';
//<contador @CustomEventInputChanged="doSomenthing"></contador>

export default {
    /*
        components: {
            'contador': Search
        },
    */
    name: 'login-form',
    data() {
        return {
            logoUrl: window.baseUrl + '/images/logo.png',
            recoveryUrl: window.baseUrl + '/recuperar',
            username: '',
            password: ''
        }
    },
    mounted() {
        $("#modal").iziModal({ width: 600, timeout: 500, timeoutProgressbar: true, transitionIn: 'fadeInUp', transitionOut: 'fadeOutDown', bottom: 0, loop: true, pauseOnHover: true});
    },
    methods: {
        loginForm: function (e) {
            axios.post('/api/login', { user: this.username, pass: this.password })
            // Correctamente
            .then(res => {
                $('#modal').iziModal('setTitle', 'Autenticado correctamente');
                $('#modal').iziModal('setHeaderColor', '#00af66');
                $('#modal').iziModal('setIcon', 'icon-check');
                $('#modal').iziModal('setSubtitle', "Por favor espera ..");
                $('#modal').iziModal('open');
                setTimeout(function(){
                    var urlTo = $('[loginTo]').first().attr('loginTo');

                    window.location.href = window.baseUrl + '/' + (urlTo != undefined ? urlTo : '');
                }, 500);
            })
            // No
            .catch(error => {
                $.jGrowl(error.response.data.message, { theme: 'error' });
            })
        }
    },
    /*methods: {
        doSomenthing: function(data) {

            console.log("Recibido emmit");

            this.username = data;
        }
    }*/
}
</script>