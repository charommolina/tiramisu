/**
 * Clase para crear a los distintos usuarios
 */
class Usuario{
    /**
     * 
     * @param {String} usuario Nombre de usuario
     * @param {String} email Correo electrónico del usuario
     * @param {String} password Contraseña del usuario
     * @param {String} cvu Clave virtual uniforme que se le otorga al usuario al crear una cuenta con éxito
     */
    constructor(usuario, email, password, cvu){
        this.nombre = " ";
        this.apellido = " ";
        this.edad;
        this.sueldo;
        this.usuario = usuario;
        this.mail = email;
        this.password = password;
        this.saldo = Number(Math.round(Math.random()*99999));
        this.prestamoSolicitado = false;
        this.tarjetaSolicitada = false;
        this.hayDatosCargados = false;
        this.cvu = cvu;
        this.movimientos = [];
    }
}

// Clase para la gestión de las cuentas de usuario
class GestionUsuarios{
    /** 
     * Array de usuarios 
     * @type {Array}
    */
    static usuarios = [];
    
    /**
     * Variable que contiene el usuario actual 
     * @type {Object}
     */
    static usuarioActual;

    /**
     * Se encarga de cargar la data del localStorage
     */
    static iniciar = () => {
        const datosAlmacenados = localStorage.getItem('Usuarios');
        const datosUsuarioActual = localStorage.getItem('Usuario-Actual');
        if(datosAlmacenados){
            this.usuarios = JSON.parse(datosAlmacenados);
        }
        if(datosUsuarioActual){
            this.usuarioActual = datosUsuarioActual;
        }
    }

    /**
     * Se encarga de encontrar al usuario actual que tiene la sesión iniciada
     * @returns Devuelve el usuario de la sesión actual
     */
    static detectarUsuarioActual = () => this.usuarios.find(usuario => this.usuarioActual == usuario.usuario);
    
    /**
     * Guarda usuario en el localStorage y lo mantiene actualizado
     * @param {Array} usuarios Array de los usuarios almacenados en el localStorage
     */
    static guardarUsuario = usuarios => localStorage.setItem('Usuarios', JSON.stringify(usuarios));

    /**
     * Crea un cvu único para el usuario
     * @returns Devuelve el cvu creado
     */
    static crearCvu = () => {
        const primeraParteCVU = Math.round(Math.random()*99999999999);
        const segundaParteCVU = Math.round(Math.random()*99999999999);
        const cvuCompleto = primeraParteCVU.toString() + segundaParteCVU.toString();
        return cvuCompleto;
    }

    /**
     * 
     * @param {String} nuevoUsuario Nombre de usuario a ser creado
     * @param {String} email Mail del usuario a ser creado
     * @param {String} password Contraseña del usuario a ser creado
     * @param {String} rePassword Confirmación de la contraseña del usuario a ser creado
     * @param {Boolean} checkbox Valor del checkbox del formulario
     */
    static crearNuevoUsuario = (nuevoUsuario, email, password, rePassword, checkbox) => {
        const minCaracteresUsuario = 3;
        const maxCaracteresUsuario = 15;
        const minCaracteresContrasenia = 8;
        const maxCaracteresContrasenia = 25;
        const arrayValidaciones = [];
        const primerValidacion = ValidacionUsuario.verificarLongitud(nuevoUsuario, minCaracteresUsuario, maxCaracteresUsuario, password, minCaracteresContrasenia, maxCaracteresContrasenia);
        const segundaValidacion = ValidacionUsuario.verificarEmail(email);
        const terceraValidacion = ValidacionUsuario.verificarContraseniasCoinciden(password, rePassword);
        const cuartaValidacion = ValidacionUsuario.esEmailUnico(email);
        const quintaValidacion = ValidacionUsuario.esUsuarioUnico(nuevoUsuario);
        const sextaValidacion = ValidacionUsuario.aceptaBasesYCondiciones(checkbox);
        arrayValidaciones.push(primerValidacion, segundaValidacion, terceraValidacion, cuartaValidacion, quintaValidacion, sextaValidacion);
        const RegistroExitoso = arrayValidaciones.every(e => e);
        if (RegistroExitoso){
            const cvu = this.crearCvu(); 
            const usuario = new Usuario(nuevoUsuario, email, password, cvu);
            this.usuarios.push(usuario);
            this.guardarUsuario(this.usuarios);
            Swal.fire({
                title: '¡Congrats!',
                text: `Welcome ${nuevoUsuario}, relax and enjoy the ride.`,
                imageUrl: '../assets/images/shaking-hands.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Two people shaking hands',
                heightAuto: false,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location ="log-in.html"; 
                }
            })
        }
    }
}