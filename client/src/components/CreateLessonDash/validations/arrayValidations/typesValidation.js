const typesValidation = (value, errors, name) => {
    const array = value.types;
    if (array.length === 0) return { ...errors, [name]: 'Debe escoger al menos un tipo de ejercicio' };
    return { ...errors, [name]: '' };
};

export default typesValidation;