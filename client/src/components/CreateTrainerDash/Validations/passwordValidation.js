const passwordValidation = (value, errors, name) =>{
    if(value.length === 0) return {...errors, [name]:"La contraseña es requerida"}
    return {...errors, [name]: ""}
}

export default passwordValidation;

