const isMonitorValidation = (value, errors, name) =>{
    if(value === "Seleccione")return {...errors, [name]:"Es necesario seleccionar si es profesor"};
    return {...errors, [name]: ""}
}

export default isMonitorValidation;