const {Op} = require('sequelize');
const {LessonDetail}= require('../../db');

const getDeletedLessons = async () =>{
    const deleted = await LessonDetail.findAll({
        where:{deletedAt: {[Op.not]: null}}
    });
    return deleted;
};
module.exports=getDeletedLessons;