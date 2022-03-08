/**
 * Clase para validar los diferentes datos para crear un usuario válido
 */
class ValidacionUsuario{
    /**
     * Se encarga de mostrar el error al cambiar la visibilidad de la clase
     * @param {String} input 
     * @param {String} mensaje Mensaje que informa acerca del error ocurrido
     * @returns 
     */
    static mostrarError = (input, mensaje) => {
        const formControl = input.parentElement;
        formControl.className = "input-group mb-3 error";
        const small = formControl.querySelector('small');
        small.innerText = mensaje;
        return false;
    }

    /**
     * Se encarga de mostrar el error al cambiar la visibilidad de la clase
     * @param {String} input 
     */
    static ocultarError = input => {
        const formControl = input.parentElement;
        formControl.className = "input-group mb-3";
        const small = formControl.querySelector('small');
        small.innerText = "";
    }

    /**
     * Se encarga de buscar en el localStorage si el mail ya se encuentra almacenado
     * @param {String} mail Mail del usuario que está por ser creado
     * @returns {Boolean} Se encarga de devolver false si encuentra coincidencia, o true si es un mail sin registrar
     */
    static esEmailUnico = mail => {
        // const rechazoRegistro = document.querySelector('#modalRegistroRechazado');
        // const rechazoModal = document.querySelector('.modal-rechazo');
        if (GestionUsuarios.usuarios.find(usuario => mail == usuario.mail)){
            Swal.fire({
                title: '¡Lo sentimos!',
                text: "El mail ya se encuentra en uso.",
                icon: 'warning',
                heightAuto: false,
            })
            return false;
        }
        return true;
    }

    /**
     * Se encarga de buscar en el localStorage si el usuario ya se encuentra almacenado
     * @param {String} nuevoUsuario Nombre de usuario del usuario que está por ser creado
     * @returns Devuelve false si encuentra coincidencia, o true si es un nombre de usuario sin registrar
     */
    static esUsuarioUnico = nuevoUsuario => {
        if(GestionUsuarios.usuarios.find(usuario => nuevoUsuario == usuario.usuario)){
            Swal.fire({
                title: '¡Ups!',
                text: "That username already exists.",
                icon: 'warning',
                heightAuto: false,
            })
            return false;
        }
        return true;
    }

    /**
     * Se encarga de verificar que la edad ingresada no sea un espacio vacío o un valor negativo
     * @param {Number} edad Edad ingresada por el usuario
     * @returns Devuelve true en caso de que sea una edad válida, en caso contraria devuelve false
     */
    static esEdadValida = edad => {
        if (edad <= 0 || edad == ``){
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Has ingresado una edad inválida.',
            })
            return false;
        }
        return true;
    }

    /**
     * Se encarga de verifcar que el usuario sea mayor de edad en base a la edad que ingresó
     * @param {Number} edad Edad ingresada por el usuario
     * @returns Devuelve true en caso de que sea mayor de edad, en caso contrario devolverá false
     */
    static esMayorDeEdad = edad => {
        if (edad < 18){
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'No eres mayor de 18 años, no puede solicitar nuestra tarjeta.',
            })
            return false;
        }
        return true;
    };

    /**
     * Se encarga de verificar que se haya ingresado un nombre válido, o sea, nombre y apellidos no vacios
     * @param {String} nombre Nombre ingresado por el usuario
     * @param {String} apellido Apellido ingresado por el usuario
     * @returns Devuelve true en caso de que el nombre completo no sean espacios en blanco, en caso contrario devolverá false
     */
    static esNombreCompleto = (nombre, apellido) => {
        if (nombre == undefined || apellido == undefined){
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debes ingresar tu nombre completo.',
            })
            return false;
        }
        return true;
    }

    /**
     * Verifica que todos los ingresados por el usuario sean válidos
     * @param {String} nombre Nombre ingresado por el usuario
     * @param {String} apellido Apellido ingresado por el usuario
     * @param {Number} edad Edad ingresada por el usuario
     * @param {Number} sueldo Sueldo ingresado por el usuario
     * @returns Devuelve true sólo en caso de que todos los valores ingresados por el usuario sean válidos, de lo contrario devolverá false
     */
    static sonDatosValidos = (nombre, apellido, edad, sueldo) => {
        if (!this.esNombreCompleto(nombre, apellido)){   
            return false;
        }
        if (!this.esEdadValida(edad) || !ValidacionOperacion.esMontoValido(sueldo)){
            return false;
        }
        return true;
    }

    /**
     * Verifica que el usuario cumpla con los requisitos necesarios para el préstamo
     * @param {Number} montoSolicitado Monto que el usuario solicita
     * @param {Number} montoMinimoPrestamo Monto mínimo aceptado en base al sueldo del usuario
     * @param {Number} montoMaximoPrestamo Monto mínimo aceptado en base al sueldo del usuario
     * @returns Devuelve true en caso de que cumpla con los requisitos, de lo contrario devolverá false
     */
    static verificarRequisitosSueldo = (montoSolicitado, montoMinimoPrestamo, montoMaximoPrestamo) => {
        if (montoSolicitado > montoMinimoPrestamo && montoSolicitado < montoMaximoPrestamo){
            return true;
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'No cumples con los requisitos mínimos de sueldo.',
            })
        }
    }

    /**
     * Se encarga de verificar la longitud de los datos ingresados por el usuario
     * @param {String} nuevoUsuario Nombre de usuario del usuario que está por ser creado
     * @param {Number} minUsuario Cantidad mínima de carácteres permitidos al momento de crear el nombre de usuario
     * @param {Number} maxUsuario Cantidad máxima de carácteres permitidos al momento de crear el nombre de usuario
     * @param {String} password Contraseña elegida por el usuario para su nueva cuenta
     * @param {Number} minContrasenia Cantidad mínima de carácteres permitidos al momento de crear la contraseña
     * @param {Number} maxContrasenia Cantidad mádxima de carácteres permitidos al momento de crear la contraseña
     * @returns Devuelve false en caso de que alguno de los datos ingresados no cumpla con el márgen de carácteres permitidos, en caso de que esté todo ok devolverá true
     */
    static verificarLongitud = (nuevoUsuario, minUsuario, maxUsuario, password, minContrasenia, maxContrasenia) => {
        const formulario = document.querySelector("#registerForm");
        const formControlUsuario = formulario.registerUser;
        const formControlPassword = formulario.registerPassword;
        if (nuevoUsuario.length < minUsuario) {
            ValidacionUsuario.mostrarError(formControlUsuario, `Debe tener almenos ${minUsuario} carácteres`);
            return false;
        }
        else if (nuevoUsuario.length > maxUsuario) {
            ValidacionUsuario.mostrarError(formControlUsuario, `Deber tener un máximo de ${maxUsuario} carácteres`);
            return false;
        }
        else{
            ValidacionUsuario.ocultarError(formControlUsuario);
        }
        if (password.length < minContrasenia) {
            ValidacionUsuario.mostrarError(formControlPassword, `Debe tener almenos ${minContrasenia} carácteres`);
            return false;
        } 
        else if (password.length > maxContrasenia) {
            ValidacionUsuario.mostrarError(formControlPassword, `Deber tener un máximo de ${maxContrasenia} carácteres`);
            return false;
        }
        else{
            ValidacionUsuario.ocultarError(formControlPassword);
        }
        return true;
    }

    /**
     * Se encarga de verificar si las contraseñas al momento del registro coinciden
     * @param {String} password Contraseña ingresada por el usuario   
     * @param {String} rePassword Contraseña ingresada por el usuario para verificar
     * @returns Sólo devolverá true en caso de que las contraseñas coincidan, de lo contrario será false
     */
    static verificarContraseniasCoinciden = (password, rePassword) => {
        const mensajeErrorContraseniasNoCoinciden = "Las contraseñas no coinciden";
        const formulario = document.querySelector("#registerForm");
        const formControl = formulario.sameRegisterPassword;
        if (password !== rePassword) {
            ValidacionUsuario.mostrarError(formControl, mensajeErrorContraseniasNoCoinciden);
            return false;
        }
        ValidacionUsuario.ocultarError(formControl);
        return true;
    }

    /**
     * Se encarga de verificar que el mail ingresado sea válido
     * @param {String} email Email ingresado por el usuario al momento de crear la cuenta
     * @returns Devuelve false en caso de que el mail ingresado no posea un formato válido, en caso de que esté todo okay devolverá true
     */
    static verificarEmail = email => {
        const mensajeErrorEmailInvalido = "No es un Email válido";
        const emailValido = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const formulario = document.querySelector("#registerForm");
        const formControl = formulario.mail;
        if (!emailValido.test(email.trim())) {
            ValidacionUsuario.mostrarError(formControl, mensajeErrorEmailInvalido);
            return false;
        }
        ValidacionUsuario.ocultarError(formControl);
        return true;
    }

    /**
     * Se encarga de verificar que el usuario acepte las bases y condiciones al momento de crear la cuenta
     * @param {Boolean} checkbox Valor del checkbox del formulario de registro
     * @returns Devuelve false en caso de que el checkbox no haya sido marcado, en caso de que esté marcado devolverá true
     */
    static aceptaBasesYCondiciones = checkbox => {
        const mensajeErrorNoAceptaBasesYCondiciones = `Debe aceptar las bases y condiciones`;
        const formulario = document.querySelector("#registerForm");
        const formControl = formulario.checkAceptar;
        if (checkbox == null){
            ValidacionUsuario.mostrarError(formControl, mensajeErrorNoAceptaBasesYCondiciones);
            return false;
        }
        ValidacionUsuario.ocultarError(formControl);
        return true;
    }
}