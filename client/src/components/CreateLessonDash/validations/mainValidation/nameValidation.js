const nameValidation = (value, errors, name) => {
    if (!value) return {...errors, [name]: 'El nombre es requerido'};
    if (!value.match(/^[a-zA-Z\s]+$/)) return {...errors, [name]: 'El nombre solo puede contener letras'};
    if (value.length < 3) return {...errors, [name]: 'El nombre debe ser mayor a 3 caracteres'};
    if (value.length > 20) return {...errors, [name]: 'El nombre debe ser menor a 20 caracteres'};
    return {...errors, [name]: ''};
}

export default nameValidation;