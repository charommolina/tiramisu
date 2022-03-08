/**
 * Función que se encarga de obtener los datos del formulario de login
 */
const obtenerDatosFormulario = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const usuario = data.get(`user`);
    const password = data.get('password');
    const checkbox = data.get(`checkRecuerdame`)
    ControlSesion.iniciarSesion(usuario, password, checkbox); 
}

/**
 * Función que se encarga de cargar los datos almacenados en localStorage
 */
const iniciar = () => {
    GestionUsuarios.iniciar();
    localStorage.removeItem(`Usuario-Actual`);
    const recordarUsuario = localStorage.getItem('Recuerdame');
    const inputUsuario = document.querySelector(`#user`);
    const inputPassword = document.querySelector(`#password`);
    if(recordarUsuario){
        const usuarioGuardado = localStorage.getItem(`Usuario-Guardado`);
        const passwordGuardado = localStorage.getItem(`Contraseña-Guardada`);
        inputUsuario.value = usuarioGuardado;
        inputPassword.value = passwordGuardado;
    }
    // Evento que se encarga de otener los datos del formulario de login al presionar el botón Enviar
    $('#loginForm').on('submit', obtenerDatosFormulario); 
}

// Este evento carga la información desde el localStorage
$(() => iniciar());