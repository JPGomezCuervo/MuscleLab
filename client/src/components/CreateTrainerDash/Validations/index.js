import fullNameValidation from './fullNameValidation';
import emailValidation from './emailValidation';
import phoneValidation from './phoneValidation';
import passwordValidation from './passwordValidation'
import isAdminValidation from './isAdminValidation'
import isMonitorValidation from './isMonitorValidation'

const validations = (value, errors, name) =>{
    switch (name) {
        case 'fullName':
            return fullNameValidation(value, errors, name);
        case 'email':
            return emailValidation(value, errors, name);
        case 'password':
            return passwordValidation(value, errors, name);
        case 'phone':
            return phoneValidation(value, errors, name);
        case 'isAdmin':
            return isAdminValidation(value, errors, name);
        case 'isMonitor':
            return isMonitorValidation(value, errors, name)
        default:
            return errors; 
    }
}

export default validations