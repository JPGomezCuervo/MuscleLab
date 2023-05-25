export const validate = (field, value) => {
  let errors = {};
  switch (field) {
    case "email":
      if (!value) {
        errors.email = "El email es obligatorio";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = "Debe ingresar un correo electrónico válido";
      }
      break;
    case "password":
      if (!value) {
        errors.password = "La contraseña es obligatoria";
      } else if (!/\d/.test(value)) {
        errors.password = "La contraseña debe tener al menos 1 número (0-9)";
      } else if (!/[A-Z]/.test(value)) {
        errors.password = "La contraseña debe tener al menos una mayúscula";
      } else if (!/^.{8,}$/.test(value)) {
        errors.password = "La contraseña debe tener al menos 8 caracteres";
      }
      break;
    default:
      errors[field] = "";
  }
  return errors;
};
