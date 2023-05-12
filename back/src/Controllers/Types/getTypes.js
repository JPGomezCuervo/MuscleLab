const {ExercisesType}=require('../../db')

const getTypes=async()=>{
    let types=await ExercisesType.findAll();
    return types;
}

module.exports=getTypes;