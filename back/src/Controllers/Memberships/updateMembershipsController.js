const { Membership } = require('../../db');

const updateMemberships = async(    
    name,
    price,
    benefits,
    promo,
    duration,
    id
) => {
    const foundedMembership = await Membership.findOne({
        where:{
            id: id,
        }
    });
    if(!foundedMembership){
        throw new Error('La membresía que quieres modificar no existe!')
    }
        await foundedMembership.update({
            name: name,
            price: price,
            benefits: benefits,
            promo: promo,
            duration: duration 
        });
        return("Membresía actualizada correctamente");
};

module.exports = updateMemberships;