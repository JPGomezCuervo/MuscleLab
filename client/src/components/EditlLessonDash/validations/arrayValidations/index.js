import scheduleDayValidation from "./scheduleDayValidation";
import typesValidation from "./typesValidation";

const arrayValidations = (values, errors, name, id) => {

    switch (name) {
        case 'scheduleDays':
            return scheduleDayValidation(values, errors, name, id);
        case 'types':
            return typesValidation(values, errors, name, id);
        
        default:
            return errors;
    }

};

export default arrayValidations;