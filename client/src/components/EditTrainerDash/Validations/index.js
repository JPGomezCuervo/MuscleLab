import fullNameValidation from './fullNameValidation';
import emailValidation from './emailValidation';
import phoneValidation from './phoneValidation';

const validations = (value, errors, name) =>{
    switch (name) {
        case 'fullName':
            return fullNameValidation(value, errors, name)
        case 'email':
            return emailValidation(value, errors, name)
        case 'phone':
            return phoneValidation(value, errors, name)
        default:
            return errors; 
    }
}

export default validations