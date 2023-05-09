const {DataTypes}=require('sequelize');

module.exports=(sequelize) => {
    sequelize.define("user", {
        id:{
            type:DataTypes.UUID,
            allowNull:false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        fullName: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isAlpha:true
            }
        },
        password: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                is: ["^(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{6,32}$","i"]
            }
        },
        email: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail:true
            }
        },
        phone:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                isNumeric:true
            }
        },
        isMonitor:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },{timestamps:false}) 
}