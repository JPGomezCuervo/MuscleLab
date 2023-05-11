const {DataTypes}=require('sequelize');

module.exports=(sequelize)=>{
    const ExercisesTypes=sequelize.define('exercisesType', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{timestamps:false});

    (async ()=>{
        let types=[
            'Fuerza',
            'Cardio',
            'Flexibilidad',
            'Equilibrio',
            'Coordinación',
            'Velocidad',
            'Resistencia',
            'Agilidad',
            'Potencia',
            'Movilidad',
            'Estiramiento',
            'Relajación',
        
        ];

        types.forEach(async (t)=>{
            await ExercisesTypes.findOrCreate({where: {name:t}});
        });
    })();

    return ExercisesTypes;
}