const branchOfficeValidation = (value, errors, name) => {
    console.log(`Estoy en la validacion ${value}`);
    console.log(`Estoy en la validacion ${name}`);
    if (value === 'Seleccione') return {...errors, [name]: 'La sede es requerida'};
    if ( value === 0 ) return {...errors, [name]: 'La sede es requerida'};
    return {...errors, [name]: ''};
}

export default branchOfficeValidation;