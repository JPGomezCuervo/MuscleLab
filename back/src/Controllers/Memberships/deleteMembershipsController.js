const { Membership } = require('../../db');

const deleteMemberships = async(id) =>{
    const membershipToDelete = await Membership.findOne({
        where:{
            id: id
        }
    });
    if(!membershipToDelete){
        throw new Error('No se encontró la membresía a borrar')
    }

    await membershipToDelete.update({
        deletedAt: new Date()
    });
    return `Membership ${membershipToDelete.name} se borró con éxito`
}

module.exports = deleteMemberships;
