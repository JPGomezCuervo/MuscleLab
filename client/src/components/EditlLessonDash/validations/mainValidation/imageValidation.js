const imageValidation = (value, errors, name) => {
    if (!value) return {...errors, [name]: 'La imagen es requerida'};
    if (!value.match(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/ 
    )) return {...errors, [name]: 'La imagen debe ser una URL'};
    if (value.length > 254) return {...errors, [name]: 'La URL debe ser menor a 254 caracteres'};
    return {...errors, [name]: ''};
};

export default imageValidation;