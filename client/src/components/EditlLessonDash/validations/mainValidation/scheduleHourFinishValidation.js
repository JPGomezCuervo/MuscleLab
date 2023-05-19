const scheduleHourFinishValidation = (value, errors, name, lessonAttributes) => {
    if ( value === 0 ) return {...errors, [name]: 'La hora final es requerida'};
    if (value === lessonAttributes.scheduleHourStart ) return {...errors, [name]: 'La hora final no puede ser igual a la hora de inicio'};  
    return {...errors, [name]: ''};
};

export default scheduleHourFinishValidation;