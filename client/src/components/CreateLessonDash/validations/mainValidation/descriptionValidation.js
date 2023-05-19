const descriptionValidation = ( value ,errors, name) => {
    if (!value) return {...errors, [name]: 'La descripción es requerida'};
    if (value.length < 3) return {...errors, [name]: 'La descripción debe ser mayor a 3 caracteres'};
    if (value.length > 200) return {...errors, [name]: 'La descripción debe ser menor a 200 caracteres'};
    return {...errors, [name]: ''};
};

export default descriptionValidation;