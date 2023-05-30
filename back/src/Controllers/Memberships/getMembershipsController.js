const { Membership } = require('../../db');

const getMembershipsController = async () =>{
    const memberships = await Membership.findAll({
        where:{
            deletedAt: null
        }
    });

    if(memberships.length === 0){

        const members=[
            {
                name:"Standar",
                price:"1",
                benefits:"Asistir a dos clases",
                promo:false,
                duration:"1 mes",
                },
                {
                name:"Plus",
                price:"3",
                benefits:"Asistir a cuatro clases",
                promo:false,
                duration:"3 mes",
                },
                {
                name:"Premium",
                price:"5",
                benefits:"Asistir a seis clases",
                promo:false,
                duration:"6 mes",
                }
        ]
        for(let i=0;i<members.length;i++){
            const toCreate=members[i];
            Membership.create({
                name:toCreate.name,
                price:toCreate.price,
                benefits:toCreate.benefits,
                promo:toCreate.promo,
                duration:toCreate.duration
            });
        }
        return members;
    }
    return memberships;
};


module.exports = getMembershipsController;
