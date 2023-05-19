export default function validation(inputs) {
    const errors = {};
    
    const regexName = new RegExp(/^[A-Za-z0-9-() .]+$/); //letras de a a z sin caracteres especiales
    const regexPhone = new RegExp(/^\d{10}$/); // solo numeros, 10 digitos
    const regexEmail = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    //const regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
    
    //validate name
    if (!regexName.test(inputs.fullName)) {
      errors.fullName = "No puede llevar caracteres especiales";
      errors.disabled = true;
      errors.edit = true;
    }
    if (!inputs.fullName) {
      errors.fullName = "Se requiere nombre y apellidos completos!";
      errors.disabled = true;
      
    }
    // if (!regexPassword.test(inputs.password)) {
    //   errors.password = "No ";
    //   errors.disabled = true;
    //   errors.edit = true;
    // }
    
    if (!inputs.email) {
      errors.email = "Se requiere email";
      errors.disabled = true;
    }
    
    if (inputs.uniqueEmail) {
      errors.email = "Este email ya esta registrado";
      errors.disabled = true;
      errors.edit = true;
    }
     if (!regexEmail.test(inputs.email)) {
      errors.email = "No tiene formato de email correcto";
       errors.disabled = true;
       errors.edit = true;
     }   
     
    //validate phone
     if (!regexPhone.test(inputs.phone)) {
      errors.phone = "Telefono solo numeros hasta 10 digitos";
       errors.disabled = true;
       errors.edit = true;
     }
    
    if (!inputs.phone) {
       errors.phone = "Campo requerido!";
       errors.disabled = true;
    }
    return errors;
  }