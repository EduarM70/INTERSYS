<template>

    <div id="ModalCrearUsuario">
        <modal-crear-usuario :perfiles="perfiles"></modal-crear-usuario>
    </div>
</template>

<script>

import CrearUsuarios from "./ModalCrearUsuario.vue";

export default {

    components: {
        'modal-crear-usuario': CrearUsuarios
    },
    props: [
        'perfiles'
    ],
    name: 'usuarios',
    mounted() {

        console.log("Usuario");

        console.log(this.perfiles);
    }
}
</script>