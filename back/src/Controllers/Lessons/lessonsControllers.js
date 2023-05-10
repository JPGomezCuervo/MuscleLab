const {Lessons, LessonDetail}=require('../db');

const getLessons= async ()=>{
    const lessons= await Lessons.findAll();
    return lessons;
}

const getDetailLesson= async (id)=>{
    console.log('aca');
    const details= await Lessons.findAll({
        include:[{
            model:LessonDetail,
            attributes:["effort, goals, description, scheduleDays, scheduleHours"],
            through:{
                attributes:[]
            }
        }]
    });
    let detail=details.filter(lesson=>Number(lesson.id)===Number(id));
    return detail;
}

module.exports={
    getLessons,
    getDetailLesson
}