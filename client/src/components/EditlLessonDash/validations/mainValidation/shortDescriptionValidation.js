const shortDescriptionValidation = (value, errors, name) => {
    if (!value) return {...errors, [name]: 'La breve descripción es requerida'};
    if (value.length < 3) return {...errors, [name]: 'La breve descripción debe ser mayor a 3 caracteres'};
    if (value.length > 50) return {...errors, [name]: 'La breve descripción debe ser menor a 50 caracteres'};
    return {...errors, [name]: ''};

};

export default shortDescriptionValidation;