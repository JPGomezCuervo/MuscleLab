export const validate = (field, value) => {
  let errors = {};
  if (field === "name") {
    if (!value) {
      errors.name = "El nombre es obligatorio.";
    } else if (/[^a-zA-Z ]/.test(value)) {
      errors.name = "El nombre solo puede contener letras.";
    } else if (value.length < 3) {
      errors.name = "El nombre debe tener al menos 3 caracteres.";
    }
  }
  if (field === "effort") {
    if (!value) {
      errors.effort = "La intensidad es obligatoria";
    } else if (!/^[1-5]$/.test(value)) {
      errors.effort = "La intensidad debe ser un numero entero entre 1 y 5";
    }
  }
  return errors;
};
