export const validate = (field, value) => {
    let errors = {};
  
    switch (field) {
      case "name":
        if (!value) {
          errors.name = "El nombre es obligatorio.";
        } else if (/[^a-zA-Z ]/.test(value)) {
          errors.name = "El nombre solo puede contener letras.";
        } else if (value.length < 3) {
          errors.name = "El nombre debe tener al menos 3 caracteres.";
        }
        break;
      case "location":
        if (!value) {
          errors.location = "La dirección es obligatoria";
        } else if (!/^[A-Za-z0-9\s]*$/.test(value)) {
          errors.location = "La dirección no debe contener caracteres especiales";
        } else if (value.length < 5) {
          errors.location = "La dirección debe tener al menos 5 caracteres";
        }
        break;
      case "scheduleDays":
        break;
      case "scheduleHours":
        break;
      default:
        errors[field] = "";
    }
    return errors;
  };
  