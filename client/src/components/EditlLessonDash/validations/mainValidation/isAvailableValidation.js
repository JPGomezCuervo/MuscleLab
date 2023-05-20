const isAvailableValidation = (value, errors, name) => {
    console.log(value);
    if (value === 'Seleccione') return {...errors, [name]: 'La disponibilidad es requerida'};
    if ( value === 0 ) return {...errors, [name]: 'La disponibilidad es requerida'};
    return {...errors, [name]: ''};
}

export default isAvailableValidation;