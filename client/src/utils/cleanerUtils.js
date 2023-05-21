const cleaner = (data) => {
    const cleanedData = data.map((lesson) => {
        const exercises = lesson.exercisesTypes;
        const exercisesTypes = exercises.map((exercise) => exercise.name);
        return {...lesson, exercisesTypes}
    })
    return cleanedData;
};

const individualLessonCleaner = (data) => {
    const cleanedData = {
        ...data,
        exercisesTypes: data.exercisesTypes.map((exercise) => exercise.name)
    }
    return cleanedData;
};

const typesCleaner = (data) => {
    return data.map((type) => type.name);
};
const goalsCleaner = (data) => {
    return data.map((goal) => goal.name);
};

const userCleaner = (data) => {
    return data.user;
};

const monitorsCleaner = (data) => {
    return data.monitor;
};

const branchOfficeCleaner = (data) => {
    return data.branchOffice;
};

export { cleaner, individualLessonCleaner, typesCleaner, userCleaner, monitorsCleaner, goalsCleaner, branchOfficeCleaner}


