const scheduleHourStartValidation = (value, errors, name, lessonAttributes) => {

    if (value === 0 ) return {...errors, [name]: 'La hora de inicio es requerida'};
    if (value === lessonAttributes.scheduleHourFinish ) return {...errors, [name]: 'La hora de inicio no puede ser igual a la hora de finalización'};

    return {...errors, [name]: ''};
}

export default scheduleHourStartValidation;