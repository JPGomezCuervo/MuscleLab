const effortValidation = (value, errors, name) => {
    if (!value) return {...errors, [name]: 'El esfuerzo es requerido'};
    if (!value.match(/^[0-9]+$/)) return {...errors, [name]: 'El esfuerzo solo puede contener números'};
    if (value.length >= 0) return {...errors, [name]: 'El esfuerzo debe ser mayor a 0'};
    if (value.length <= 9) return {...errors, [name]: 'El esfuerzo debe ser menor a 6'};
    return {...errors, [name]: ''};

};

export default effortValidation;