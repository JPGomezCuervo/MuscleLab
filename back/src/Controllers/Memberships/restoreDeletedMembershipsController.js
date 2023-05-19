const { Membership } = require('../../db');

const restoreMemberships = async (id) =>{
    const toRestore = await Membership.findOne({
        where:{
            id: id
        }
    });
    if(!toRestore){
        throw new Error('Membresía no encontrada');
    };
    await toRestore.update({
        deletedAt: null
    });
    return `la membresía ${toRestore.name} ha sido restablecida`;
};

module.exports = restoreMemberships;