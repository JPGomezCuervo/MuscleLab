const phoneValidation = (value, errors, name) =>{
    if(!/^\d{10}$/.test(value)) return {...errors, [name]:"No es un número de celular válido"}
    return {...errors, [name]:""} 
}

export default phoneValidation