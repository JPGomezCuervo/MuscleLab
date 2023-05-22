const {Lessons} = require("../../db");
const {getDetailLesson}= require('./getDetail');

const getEveryLesson =async ()=>{
    const lessonsRaw=await Lessons.findAll();
    const lessonsName= lessonsRaw.map(el=>el.name);
    const everyLesson= [];
    for(let i=0;i<lessonsName.length;i++){
        let some=await getDetailLesson(lessonsName[i]);
        some.map(el=>{
            let shortDescription=lessonsRaw.map(el=>{return{shortDescription:el.shortDescription, name:el.name}});
            for(let i=0;i<shortDescription.length;i++){
                if(el.name.includes(shortDescription[i].name)){
                    const objDetail = {
                        id: el.id,
                        name: el.name,
                        image: el.image,
                        effort: el.effort,
                        goals: el.goals,
                        shortDescription: shortDescription[i].shortDescription,
                        description:el.description,
                        scheduleDays: el.scheduleDays,
                        scheduleHourStart: el.scheduleHourStart,
                        scheduleHourFinish: el.scheduleHourFinish,
                        isAvailable:el.isAvailable,
                        types: el.types,
                        monitors: el.monitors,
                        office: el.office
                      }
                    everyLesson.push(objDetail)
                }
            }
        });
    }
    return everyLesson;
}

module.exports=getEveryLesson;