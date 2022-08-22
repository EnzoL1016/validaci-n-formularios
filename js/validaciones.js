export function validar(input){
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = ["valueMissing","typeMismatch","patternMismatch","customError",];

const mensajesDeError = {
    nombre:{
        valueMissing:"El campo nombre no puede estar vacío",
    },
    email:{
        valueMissing:"El campo email no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password:{
        valueMissing:"El campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener al menos 1 mayuscula, 1 minuscula, 1 numero y y no se permiten caracteres especiales"
    },
    nacimiento:{
        valueMissing:"El campo fecha no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero:{
        valueMissing:"El campo número no puede estar vacío",
        patternMismatch:"El formato requerido es XXXXXXXXXX (10 números)"
    },
    direccion:{
        valueMissing:"El campo dirección completa no puede estar vacío",
        patternMismatch:"Se requiere un mínimo de 10 caracteres y un máximo de 40"
    },
    ciudad:{
        valueMissing:"El campo ciudad no puede estar vacío",
        patternMismatch:"La ciudad ingresada no es válida"
    },
    provincia:{
        valueMissing:"El campo ciudad no puede estar vacío",
        patternMismatch:"La provincia ingresada no es válida"
    }
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje = "";
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if(!mayorDeEdad(fechaCliente)){
        mensaje = 'Debes tener al menos 18 años de edad';
    };
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fechaCliente){
    const fechaActual = new Date();
    const diferencia = new Date(fechaCliente.getUTCFullYear() + 18,
    fechaCliente.getUTCMonth(),
    fechaCliente.getUTCDate());
    return diferencia <= fechaActual;
}