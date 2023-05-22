const goalsValidation = (value, errors, name, id) => {
    const array = value.goals;
    console.log(array);
    if (array.length === 0) return { ...errors, [name]: 'Debe escoger al menos una meta' };
    return { ...errors, [name]: '' };
};

export default goalsValidation;