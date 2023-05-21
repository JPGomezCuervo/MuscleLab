const emailValidation = (value, errors, name) =>{
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return {...errors, [name]: "No es un correo electrónico válido"}
    return {...errors, [name]: ""}
}

export default emailValidation