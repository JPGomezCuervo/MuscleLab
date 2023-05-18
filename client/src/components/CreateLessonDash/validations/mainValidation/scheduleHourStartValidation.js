const scheduleHourStartValidation = (value, errors, name) => {
    if(value === 0 ) return {...errors, [name]: 'La hora de inicio es requerida'};
    return {...errors, [name]: ''};
}

export default scheduleHourStartValidation;