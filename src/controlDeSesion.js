/**
 * Clase para manejar el inicio y cierre de sesión
 */
class ControlSesion{
    /**
     * Se encarga de simular el inicio de sesión si se encuentra un usuario y contraseña que coincidan con los datos ingresados
     * @param {String} usuario Nombre de usuario
     * @param {String} password Contraseña del usuario
     */
    static iniciarSesion = (usuario, password, checkbox) => {
        const loginExitoso = GestionUsuarios.usuarios.find(Usuario => (Usuario.usuario == usuario)  && (password === Usuario.password));
        const usuarioIngresado = document.querySelector(`#user`).value;
        const passwordIngresado = document.querySelector(`#password`).value;
        if (checkbox == 'on'){
            localStorage.setItem(`Recuerdame`, true);
            localStorage.setItem(`Usuario-Guardado`, usuarioIngresado);
            localStorage.setItem(`Contraseña-Guardada`, passwordIngresado);
        }
        else{
            localStorage.removeItem(`Recuerdame`);
            localStorage.removeItem(`Usuario-Guardado`, usuarioIngresado);
            localStorage.removeItem(`Contraseña-Guardada`, passwordIngresado);
        }
        if(loginExitoso){
            GestionUsuarios.usuarioActual = loginExitoso;
            localStorage.setItem('Usuario-Actual', GestionUsuarios.usuarioActual.usuario);            
            GestionUsuarios.guardarUsuario(GestionUsuarios.usuarios);            
            window.location.href="./home.html";  
        } 
        else{
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Username y/o password not valid, please try again.',
                heightAuto: false,
            })
        }
    }

    /**
     * Se encarga de simular el cierre de sesión
     */
    static cerrarSesion = () => {
        localStorage.removeItem(`Usuario-Actual`);
        window.location.href="./index.html";
    }
}