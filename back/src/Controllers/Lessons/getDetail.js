const {Lessons, LessonDetail}=require('../../db');

const getDetailLesson= async (id)=>{
    const lesson= await Lessons.findAll({where:{id:id}});
    const detail= await LessonDetail.findAll({where:{lessonId:id}});
    const final={
        name:lesson[0].name,
        image:lesson[0].image,
        effort:lesson[0].effort,
        goals:detail[0].goals,
        description:detail[0].description,
        scheduleDays:detail[0].scheduleDays,
        scheduleHourStart:detail[0].scheduleHourStart,
        scheduleHourFinish:detail[0].scheduleHourFinish
    }
    return final;
}

module.exports={
    getDetailLesson
}