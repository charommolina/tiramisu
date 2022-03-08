/**
 * Función que se encarga de obtener los datos del formulario de registro
 */
const obtenerDatosFormulario = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const usuario = data.get(`user`);
    const email = data.get('mail');
    const password = data.get('password');
    const rePassword = data.get('repassword');
    const checkbox = data.get(`checkAceptar`);

    GestionUsuarios.crearNuevoUsuario(usuario, email, password, rePassword, checkbox);
}

/**
 * Función que se encarga de cargar los datos almacenados en localStorage
 */
const iniciar = () => {
    localStorage.removeItem('Usuario-Actual');
    GestionUsuarios.iniciar();
    // Evento que se encarga de otener los datos del formulario de registro al presionar el botón Enviar
    $('#registerForm').on('submit', obtenerDatosFormulario); 
}

// Este evento carga la información desde el localStorage
$(() => iniciar());