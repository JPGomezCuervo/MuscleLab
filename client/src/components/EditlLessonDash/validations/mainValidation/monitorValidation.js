const monitorValidation = (value, errors, name) => {
    if (value === 'Seleccione') return {...errors, [name]: 'El profesor es requerido'};
    if ( value === 0 ) return {...errors, [name]: 'El profesor es requerido'};
    return {...errors, [name]: ''};
}

export default monitorValidation;