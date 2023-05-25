import nameValidation from './nameValidation';
import descriptionValidation from './descriptionValidation';
import shortDescriptionValidation from './shortDescriptionValidation';
import effortValidation from './effortValidation';
import imageValidation from './imageValidation';
import scheduleHourStartValidation from './scheduleHourStartValidation';
import scheduleHourFinishValidation from './scheduleHourFinishValidation'
import isAvailableValidation from './isAvailableValidation';
import monitorValidation from './monitorValidation';
import branchOfficeValidation from './branchOfficeValidation';

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
            return imageValidation(value, errors, name, lessonAttributes);

        case 'scheduleHourStart':
            return scheduleHourStartValidation(value, errors, name, lessonAttributes);

        case 'scheduleHourFinish':
            return scheduleHourFinishValidation(value, errors, name, lessonAttributes);
        
        case 'isAvailable':
            return isAvailableValidation(value, errors, name);

        case 'monitor':
            return monitorValidation(value, errors, name);

        case 'branchoffice':
            return branchOfficeValidation(value, errors, name);

        default:
            return errors;          
    }
}

export default validations;