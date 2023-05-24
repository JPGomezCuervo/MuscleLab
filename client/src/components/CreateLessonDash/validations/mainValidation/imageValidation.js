const imageValidation = (value, errors, name, lessonAttributes) => {
    const { image } = lessonAttributes;
    const type = image.name.split('.')[1];
    const validTypes = ['jpg', 'jpeg', 'png'];
   
    if (!value.name) return { ...errors, [name]: 'La imagen es requerida' };
    if (!validTypes.includes(type)) return { ...errors, [name]: 'La imagen debe ser jpg, jpeg o png' };

    return { ...errors, [name]: '' };
};

export default imageValidation;