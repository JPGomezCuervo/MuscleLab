const scheduleDayValidation = (value, errors, name) => {
    const array = value.scheduleDays;
    if (array.length === 0) return { ...errors, [name]: 'El día de la semana es requerido' };
    return { ...errors, [name]: '' };
};

export default scheduleDayValidation;