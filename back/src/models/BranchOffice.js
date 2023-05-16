const {DataTypes}=require('sequelize')

module.exports= (sequelize)=>{
    sequelize.define('branchOffice', {
        id:{
            type:DataTypes.UUID,
            allowNull:false,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                isAlpha:true
            }
        },
        location:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        scheduleDays:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        scheduleHours:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{timestamps:false})
}