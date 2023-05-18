const scheduleHourFinishValidation = (value, errors, name) => {
    if( value === 0 ) return {...errors, [name]: 'La hora final es requerida'};
    return {...errors, [name]: ''};
};

export default scheduleHourFinishValidation;