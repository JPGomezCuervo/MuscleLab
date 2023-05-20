const fullNameValidation = (value, errors, name) =>{
    if(!value) return {...errors, [name]: "El nombre es requerido"};
    if (!/^[^0-9]+$/.test(value)) return {...errors, [name]: "No se pueden utilizar números"};
    if(value.length > 40) return {...errors, [name]: "el nombre no puede tener más de 40 caracteres"};
    return {...errors, [name]: ""}
}

export default fullNameValidation