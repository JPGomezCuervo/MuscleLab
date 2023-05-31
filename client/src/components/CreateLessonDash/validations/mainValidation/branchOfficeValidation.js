const branchOfficeValidation = (value, errors, name) => {
    if (value === 'Seleccione') return {...errors, [name]: 'La sede es requerida'};
    if ( value === 0 ) return {...errors, [name]: 'La sede es requerida'};
    return {...errors, [name]: ''};
}

export default branchOfficeValidation;