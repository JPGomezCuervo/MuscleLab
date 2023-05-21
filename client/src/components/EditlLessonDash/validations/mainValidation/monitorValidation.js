const monitorValidation = (value, errors, name) => {
    console.log(`Estoy en la validacion ${value}`);
    console.log(`Estoy en la validacion ${name}`);
    if (value === 'Seleccione') return {...errors, [name]: 'El profesor es requerido'};
    if ( value === 0 ) return {...errors, [name]: 'El profesor es requerido'};
    return {...errors, [name]: ''};
}

export default monitorValidation;