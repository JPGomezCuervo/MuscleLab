import nameValidation from './nameValidation';
import descriptionValidation from './descriptionValidation';
import shortDescriptionValidation from './shortDescriptionValidation';
import effortValidation from './effortValidation';
import imageValidation from './imageValidation';
import scheduleHourStartValidation from './scheduleHourStartValidation';
import scheduleHourFinishValidation from './scheduleHourFinishValidation'
import scheduleDayValidation from '../arrayValidations/scheduleDayValidation';
import typesValidation from '../arrayValidations/typesValidation';
import goalsValidation from '../arrayValidations/goalsValidation';

const validations = (value, name, errors, lessonAttributes) => {
    switch (name) {
        case 'name':
            return nameValidation(value, errors, name);
            
        case 'description':
            return descriptionValidation(value, errors, name);

        case 'shortDescription':
            return shortDescriptionValidation(value, errors, name);

        case 'effort':
            return effortValidation(value, errors, name);

        case 'image':
            return imageValidation(value, errors, name);

        case 'scheduleHourStart':
            return scheduleHourStartValidation(value, errors, name, lessonAttributes);

        case 'scheduleHourFinish':
            return scheduleHourFinishValidation(value, errors, name, lessonAttributes);

        default:
            return errors;          
    }
}

export default validations;