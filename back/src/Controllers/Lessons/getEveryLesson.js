const { Lessons, LessonDetail, ExercisesType, User, BranchOffice } = require("../../db");
const { Op } = require("sequelize");
const {getDetailLesson}= require('./getDetail');

const getEveryLesson =async ()=>{
    const lessonsRaw=await Lessons.findAll({attributtes:['name']});
    const lessonsName= lessonsRaw.map(el=>el.name);
    const everyLesson= [];
    for(let i=0;i<lessonsName.length;i++){
        let some=await getDetailLesson(lessonsName[i]);
        some.map(el=>everyLesson.push(el));
    }
    return everyLesson;
}

module.exports=getEveryLesson;